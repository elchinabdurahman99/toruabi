import { NextResponse } from "next/server";
import { getSanityWriteClient } from "@/lib/sanity/writeClient";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const write = getSanityWriteClient();
  if (!write) {
    return NextResponse.json(
      { ok: false, error: "Reviews are not configured (missing SANITY_API_WRITE_TOKEN)." },
      { status: 503 }
    );
  }

  let body: { name?: string; text?: string; rating?: number };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const text = String(body.text ?? "").trim();
  const rating = Number(body.rating);

  if (!name || !text) {
    return NextResponse.json({ ok: false, error: "Name and review text are required." }, { status: 400 });
  }
  if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ ok: false, error: "Rating must be between 1 and 5." }, { status: 400 });
  }

  await write.create({
    _type: "testimonial",
    name,
    text: { et: text, en: text, ru: text },
    rating: Math.round(rating),
    approved: true,
    order: 999,
  });

  return NextResponse.json({ ok: true });
}
