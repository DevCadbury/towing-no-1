import { NextRequest, NextResponse } from "next/server";
import { notifyWhatsApp } from "@/lib/whatsapp-notify";
import { rateLimit, ipFromHeaders } from "@/lib/rate-limit";
import { processTawkWebhook } from "@/lib/tawk-webhook";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Supplementary tawk.to webhook receiver (Chat Start event). Verifies the
 * X-Tawk-Signature over the raw body, then (only if TAWK_WEBHOOK_NOTIFY_FALLBACK
 * is enabled) forwards a de-duplicated fallback notification via the VPS.
 */
export async function POST(req: NextRequest) {
  try {
    const raw = await req.text();
    const { httpStatus, body } = await processTawkWebhook({
      raw,
      getHeader: (name) => req.headers.get(name),
      env: process.env,
      deps: {
        rateLimit,
        ipFromHeaders,
        notify: notifyWhatsApp,
        logger: console,
      },
    });
    return NextResponse.json(body, { status: httpStatus });
  } catch {
    return NextResponse.json({ ok: false, error: "internal error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
