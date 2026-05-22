import { NextResponse } from "next/server";

// IndexNow allows instant URL submission to Bing, Yandex, and other engines.
// Generate a key at https://www.bing.com/indexnow and add it to .env.local as INDEXNOW_KEY
// Also create a file at /public/<key>.txt containing just the key value.

const BASE_URL = "https://www.towingno1.com";

const ALL_URLS = [
  `${BASE_URL}/`,
  `${BASE_URL}/services`,
  `${BASE_URL}/services/emergency-towing`,
  `${BASE_URL}/services/battery-boost`,
  `${BASE_URL}/services/lockout-service`,
  `${BASE_URL}/services/flat-tire-help`,
  `${BASE_URL}/services/fuel-delivery`,
  `${BASE_URL}/services/winching-extraction`,
  `${BASE_URL}/services/vehicle-transport`,
  `${BASE_URL}/services/accident-recovery`,
  `${BASE_URL}/locations`,
  `${BASE_URL}/locations/surrey`,
  `${BASE_URL}/locations/langley`,
  `${BASE_URL}/locations/burnaby`,
  `${BASE_URL}/locations/coquitlam`,
  `${BASE_URL}/locations/richmond`,
  `${BASE_URL}/locations/white-rock`,
  `${BASE_URL}/locations/vancouver`,
  `${BASE_URL}/locations/delta`,
  `${BASE_URL}/locations/maple-ridge`,
  `${BASE_URL}/blog`,
  `${BASE_URL}/blog/what-to-do-car-breaks-down-highway`,
  `${BASE_URL}/blog/prepare-vehicle-winter-bc`,
  `${BASE_URL}/blog/signs-car-battery-dying`,
  `${BASE_URL}/blog/emergency-kit-essentials`,
  `${BASE_URL}/blog/when-call-tow-vs-fix-yourself`,
  `${BASE_URL}/blog/understanding-towing-services`,
  `${BASE_URL}/about`,
  `${BASE_URL}/contact`,
];

export async function POST(request: Request) {
  const key = process.env.INDEXNOW_KEY;
  if (!key) {
    return NextResponse.json({ error: "INDEXNOW_KEY not configured" }, { status: 500 });
  }

  // Verify the request has a valid internal secret to prevent abuse
  const { secret } = await request.json().catch(() => ({ secret: null }));
  if (secret !== process.env.INDEXNOW_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = {
    host: "www.towingno1.com",
    key,
    keyLocation: `${BASE_URL}/${key}.txt`,
    urlList: ALL_URLS,
  };

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });

    return NextResponse.json({
      status: res.status,
      message: res.status === 200 ? "URLs submitted successfully" : "Submission failed",
      urlCount: ALL_URLS.length,
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// GET — returns the list of URLs that will be submitted (for verification)
export async function GET() {
  return NextResponse.json({ urls: ALL_URLS, count: ALL_URLS.length });
}
