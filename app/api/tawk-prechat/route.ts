import { NextRequest, NextResponse } from "next/server";
import { notifyWhatsApp } from "@/lib/whatsapp-notify";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { rateLimit, ipFromHeaders } from "@/lib/rate-limit";
import { processPrechat } from "@/lib/prechat";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Receives the tawk.to pre-chat form submission from the browser
 * (Tawk_API.onPrechatSubmit) and triggers a best-effort WhatsApp notification
 * via the authenticated VPS backend. The browser never sees the VPS URL/token.
 */
export async function POST(req: NextRequest) {
  try {
    const raw = await req.text();
    const { httpStatus, body } = await processPrechat({
      raw,
      getHeader: (name) => req.headers.get(name),
      env: process.env,
      deps: {
        verifyRecaptcha,
        rateLimit,
        ipFromHeaders,
        notify: notifyWhatsApp,
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
