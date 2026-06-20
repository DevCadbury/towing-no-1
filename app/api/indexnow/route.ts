import { NextResponse } from "next/server";
import { blogPosts } from "@/lib/blog-posts";
import { serviceAreas } from "@/lib/service-areas";

// IndexNow allows instant URL submission to Bing, Yandex, and other engines.
// Key: 8a4557d424984be2a7c5c7d0a031a499
// Key file hosted at: https://www.towingno1.com/8a4557d424984be2a7c5c7d0a031a499.txt
// Set INDEXNOW_KEY in Vercel environment variables.

const BASE_URL = "https://www.towingno1.com";

function buildUrlList(): string[] {
  const staticUrls = [
    `${BASE_URL}/`,
    `${BASE_URL}/about`,
    `${BASE_URL}/contact`,
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
    `${BASE_URL}/blog`,
    `${BASE_URL}/privacy`,
    `${BASE_URL}/terms`,
  ];

  const locationUrls = serviceAreas.map((area) => `${BASE_URL}/locations/${area.slug}`);
  const blogUrls = blogPosts.map((post) => `${BASE_URL}/blog/${post.slug}`);

  return [...staticUrls, ...locationUrls, ...blogUrls];
}

export async function POST(request: Request) {
  const key = process.env.INDEXNOW_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "INDEXNOW_KEY not configured. Set it in Vercel environment variables." },
      { status: 500 }
    );
  }

  // Optional shared secret to protect this endpoint from arbitrary POSTs.
  const secret = process.env.INDEXNOW_SECRET;
  if (secret) {
    const body = await request.json().catch(() => ({}));
    if (body.secret !== secret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const urlList = buildUrlList();
  const payload = {
    host: "www.towingno1.com",
    key,
    keyLocation: `${BASE_URL}/${key}.txt`,
    urlList,
  };

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });

    const responseText = await res.text().catch(() => "");

    return NextResponse.json({
      success: res.status === 200 || res.status === 202,
      httpStatus: res.status,
      message:
        res.status === 200
          ? "URLs submitted successfully"
          : res.status === 202
          ? "Accepted — URLs queued for processing"
          : `Submission returned ${res.status}: ${responseText}`,
      urlCount: urlList.length,
      urls: urlList,
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// GET — returns the list of URLs that would be submitted (for verification)
export async function GET() {
  const urlList = buildUrlList();
  return NextResponse.json({
    key: process.env.INDEXNOW_KEY ? "configured" : "NOT SET — add INDEXNOW_KEY to Vercel env",
    keyFileUrl: `${BASE_URL}/8a4557d424984be2a7c5c7d0a031a499.txt`,
    urlCount: urlList.length,
    urls: urlList,
  });
}
