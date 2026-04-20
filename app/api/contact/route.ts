/**
 * Contact form delivery (configure in `.env.local`):
 * - Email: `RESEND_API_KEY` + `RESEND_FROM_EMAIL` + comma-separated `CONTACT_EMAIL_TO` (inbox addresses).
 * - Sanity archive: `SANITY_API_WRITE_TOKEN` creates a `contactSubmission` document with uploaded files.
 * At least one of email or Sanity must succeed or the API returns 503.
 */
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSanityWriteClient } from "@/lib/sanity/writeClient";

export const runtime = "nodejs";

const MAX_FILES = 6;
const MAX_BYTES_PER_FILE = 12 * 1024 * 1024;
/** Above this size, client shows fallback to email info@torudeabi24.ee if upload/email fails */
const LARGE_ATTACHMENT_HINT_BYTES = 2 * 1024 * 1024;

function parseRecipients(raw: string | undefined): string[] {
  if (!raw?.trim()) return [];
  return raw.split(",").map((s) => s.trim()).filter(Boolean);
}

export async function POST(req: Request) {
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid form data" }, { status: 400 });
  }

  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const files = formData.getAll("files").filter((v): v is File => v instanceof File && v.size > 0);

  if (!name || !phone) {
    return NextResponse.json({ ok: false, error: "Name and phone are required." }, { status: 400 });
  }

  if (files.length > MAX_FILES) {
    return NextResponse.json({ ok: false, error: `Maximum ${MAX_FILES} files.` }, { status: 400 });
  }

  for (const f of files) {
    if (f.size > MAX_BYTES_PER_FILE) {
      return NextResponse.json(
        {
          ok: false,
          error: "Each file must be under 12 MB.",
          code: "FILE_TOO_LARGE",
        },
        { status: 400 }
      );
    }
  }

  const fileParts = await Promise.all(
    files.map(async (file) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      const mime = file.type || "application/octet-stream";
      return {
        filename: file.name || "attachment",
        buffer,
        mime,
      };
    })
  );

  const write = getSanityWriteClient();
  const attachmentBlocks: Array<{
    _type: "image" | "file";
    _key: string;
    asset: { _type: "reference"; _ref: string };
  }> = [];

  if (write) {
    for (const part of fileParts) {
      try {
        const isVideo = part.mime.startsWith("video/");
        const asset = isVideo
          ? await write.assets.upload("file", part.buffer, {
              filename: part.filename,
              contentType: part.mime,
            })
          : await write.assets.upload("image", part.buffer, {
              filename: part.filename,
              contentType: part.mime || "image/jpeg",
            });

        attachmentBlocks.push({
          _type: isVideo ? "file" : "image",
          _key: crypto.randomUUID(),
          asset: { _type: "reference", _ref: asset._id },
        });
      } catch {
        return NextResponse.json(
          {
            ok: false,
            error: "File upload failed. Please try again or send files by email.",
            suggestEmailFallback: part.buffer.length > LARGE_ATTACHMENT_HINT_BYTES,
          },
          { status: 500 }
        );
      }
    }
  }

  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL?.trim();
  const recipients = parseRecipients(process.env.CONTACT_EMAIL_TO);

  let emailSent = false;
  if (resendKey && from && recipients.length > 0) {
    const resend = new Resend(resendKey);
    const html = `
      <h2>New contact — TorudeAbi24</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email || "—")}</p>
      <p><strong>Message:</strong></p>
      <pre style="white-space:pre-wrap;font-family:sans-serif">${escapeHtml(message || "—")}</pre>
    `;

    const attachments = fileParts.length
      ? fileParts.map((p) => ({ filename: p.filename, content: p.buffer }))
      : undefined;

    const { error } = await resend.emails.send({
      from,
      to: recipients,
      subject: `[TorudeAbi24 contact] ${name}`,
      html,
      attachments,
    });
    emailSent = !error;
  }

  let savedToSanity = false;
  if (write) {
    await write.create({
      _type: "contactSubmission",
      name,
      email: email || undefined,
      phone,
      message: message || "",
      attachments: attachmentBlocks.length ? attachmentBlocks : undefined,
      createdAt: new Date().toISOString(),
      emailSent,
    });
    savedToSanity = true;
  }

  if (!savedToSanity && !emailSent) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Contact delivery is not configured. Set RESEND_API_KEY, RESEND_FROM_EMAIL, CONTACT_EMAIL_TO and/or SANITY_API_WRITE_TOKEN.",
      },
      { status: 503 }
    );
  }

  return NextResponse.json({ ok: true, emailSent, savedToSanity });
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
