import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getSanityWriteClient } from "@/lib/sanity/writeClient";

export const runtime = "nodejs";

const MAX_FILES = 6;
const MAX_BYTES_PER_FILE = 12 * 1024 * 1024;
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
  const address = String(formData.get("address") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const files = formData.getAll("files").filter((v): v is File => v instanceof File && v.size > 0);

  // Fayl limitlərinin yoxlanması
  if (files.length > MAX_FILES) {
    return NextResponse.json({ ok: false, error: `Maximum ${MAX_FILES} files.` }, { status: 400 });
  }

  for (const f of files) {
    if (f.size > MAX_BYTES_PER_FILE) {
      return NextResponse.json({ ok: false, error: "Fayl 12 MB-dan çox ola bilməz.", code: "FILE_TOO_LARGE" }, { status: 400 });
    }
  }

  const fileParts = await Promise.all(
    files.map(async (file) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      return {
        filename: file.name || "attachment",
        content: buffer,
        contentType: file.type || "application/octet-stream",
      };
    })
  );

  // 1. Sanity Arxivləmə
  const write = getSanityWriteClient();
  const attachmentBlocks: any[] = [];

  if (write) {
    for (const part of fileParts) {
      try {
        const asset = await write.assets.upload(part.contentType.startsWith("video/") ? "file" : "image", part.content, {
          filename: part.filename,
          contentType: part.contentType,
        });

        attachmentBlocks.push({
          _type: part.contentType.startsWith("video/") ? "file" : "image",
          _key: crypto.randomUUID(),
          asset: { _type: "reference", _ref: asset._id },
        });
      } catch (err) {
        console.error("Sanity upload error:", err);
      }
    }
  }

  // 2. Zone.ee SMTP vasitəsilə Email göndərilməsi
  let emailSent = false;
  const smtpUser = process.env.MAIL_USER; // info@torudeabi24.ee
  const smtpPass = process.env.MAIL_PASS; // Zone-də təyin etdiyin şifrə
  const recipients = parseRecipients(process.env.CONTACT_EMAIL_TO);

  if (smtpUser && smtpPass && recipients.length > 0) {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.zone.eu",
        port: 465,
        secure: true, // SSL üçün
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const html = `
        <h2>Uus päring — TorudeAbi24</h2>
        <p><strong>Nimi:</strong> ${escapeHtml(name)}</p>
        <p><strong>Telefon:</strong> ${escapeHtml(phone)}</p>
        <p><strong>E-post:</strong> ${escapeHtml(email || "—")}</p>
        <p><strong>Aadress:</strong> ${escapeHtml(address || "—")}</p>
        <p><strong>Sõnum:</strong></p>
        <pre style="white-space:pre-wrap;font-family:sans-serif">${escapeHtml(message || "—")}</pre>
      `;

      await transporter.sendMail({
        from: `"TorudeAbi24 Vorm" <${smtpUser}>`,
        to: recipients.join(", "),
        replyTo: email ? `"${name || email}" <${email}>` : undefined,
        subject: `[Kontakt] ${name || phone}`,
        html: html,
        attachments: fileParts.map(p => ({
          filename: p.filename,
          content: p.content
        }))
      });

      emailSent = true;
    } catch (error) {
      console.error("SMTP error:", error);
    }
  }

  // 3. Sanity-də sənəd yarat
  let savedToSanity = false;
  if (write) {
    try {
      await write.create({
        _type: "contactSubmission",
        name: name || undefined,
        email: email || undefined,
        phone: phone || undefined,
        address: address || undefined,
        message: message || "",
        attachments: attachmentBlocks.length ? attachmentBlocks : undefined,
        createdAt: new Date().toISOString(),
        emailSent,
      });
      savedToSanity = true;
    } catch (err) {
      console.error("Sanity document creation error:", err);
    }
  }

  if (!savedToSanity && !emailSent) {
    return NextResponse.json({ ok: false, error: "Saatmine ebaõnnestus. Kontrollige SMTP seadeid." }, { status: 503 });
  }

  return NextResponse.json({ ok: true, emailSent, savedToSanity });
}

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}