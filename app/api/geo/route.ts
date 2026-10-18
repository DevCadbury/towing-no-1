import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Returns the visitor's 2-letter country (lowercase) for the phone field's
 * default flag/dial-code. Uses the geolocation header Vercel sets automatically
 * (`x-vercel-ip-country`) — no third-party API, no API key, no PII stored.
 * Empty when it can't be determined (e.g. local dev); the client falls back.
 */
export async function GET(req: NextRequest) {
  const country = (
    req.headers.get("x-vercel-ip-country") ||
    req.headers.get("cf-ipcountry") ||
    ""
  )
    .trim()
    .toLowerCase();
  return NextResponse.json(
    { country },
    { headers: { "cache-control": "no-store" } }
  );
}
