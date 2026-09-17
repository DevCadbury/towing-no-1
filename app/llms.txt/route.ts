import { serviceAreas } from "@/lib/service-areas";
import { blogPosts } from "@/lib/blog-posts";
import { contact, geo, social } from "@/lib/business-facts";

/**
 * /llms.txt — an LLM-friendly summary of the site (see https://llmstxt.org).
 *
 * Generated from the same data as the rest of the site (services, service
 * areas, blog posts, business facts) so it stays in sync automatically — the
 * same approach as app/sitemap.ts and app/robots.ts.
 *
 * IMPORTANT: only VERIFIED business facts belong here. Do NOT add unverified
 * claims (response-time figures, founding year, "licensed & insured", fleet
 * size, ratings/review counts) — mirror the anti-drift policy in
 * lib/business-facts.ts / VERIFICATION_REPORT.md.
 */

const baseUrl = "https://www.towingno1.com";

// Canonical service list (name, path, short description) mirroring the 8
// service pages. Kept here so /llms.txt is a single, editable summary.
const services = [
  { name: "Emergency Towing", path: "/services/emergency-towing", desc: "24/7 fast-response tow truck for breakdowns and collisions." },
  { name: "Battery Boost", path: "/services/battery-boost", desc: "Jump-start and battery boost when your battery dies." },
  { name: "Flat Tire Help", path: "/services/flat-tire-help", desc: "On-site tire change or a tow to the nearest shop." },
  { name: "Lockout Service", path: "/services/lockout-service", desc: "Safe vehicle unlocking when keys are locked inside." },
  { name: "Fuel Delivery", path: "/services/fuel-delivery", desc: "Emergency gasoline or diesel delivered to your location." },
  { name: "Winching & Extraction", path: "/services/winching-extraction", desc: "Recovery for vehicles stuck in mud, snow, or a ditch." },
  { name: "Accident Recovery", path: "/services/accident-recovery", desc: "Careful collision-scene towing and damaged-vehicle transport." },
  { name: "Vehicle Transport", path: "/services/vehicle-transport", desc: "Secure vehicle transport across the Lower Mainland." },
];

export const dynamic = "force-static";

export function GET() {
  const lines: string[] = [];

  lines.push("# TowingNo.1 - 24/7 Tow Truck & Roadside Assistance (Surrey & the Lower Mainland, BC)");
  lines.push("");
  lines.push(
    `> TowingNo.1 provides 24/7 emergency towing and roadside assistance across ${geo.region.value}, ${geo.province.value}. ` +
      `Upfront flat-rate pricing with a free quote before dispatch. Call ${contact.phoneDisplay.value}.`,
  );
  lines.push("");
  lines.push(
    `TowingNo.1 is a local towing and roadside assistance company serving ${geo.region.value} in ${geo.province.value}, Canada. ` +
      `Dispatch is available 24 hours a day, 7 days a week, including weekends and holidays. The fastest way to reach us is by ` +
      `phone at ${contact.phoneDisplay.value}; for non-urgent enquiries, email ${contact.email.value}.`,
  );
  lines.push("");

  lines.push("## Services");
  for (const s of services) {
    lines.push(`- [${s.name}](${baseUrl}${s.path}): ${s.desc}`);
  }
  lines.push("");

  lines.push("## Service areas");
  lines.push(
    "Local tow truck and roadside coverage across the following communities (listed by priority):",
  );
  for (const a of serviceAreas) {
    lines.push(`- [Tow truck in ${a.city}](${baseUrl}/locations/${a.slug}): ${a.summary}`);
  }
  lines.push("");

  lines.push("## Guides & articles");
  for (const p of blogPosts) {
    lines.push(`- [${p.title}](${baseUrl}/blog/${p.slug}): ${p.excerpt}`);
  }
  lines.push("");

  lines.push("## Company");
  lines.push(`- [About TowingNo.1](${baseUrl}/about): Who we are and the region we serve.`);
  lines.push(`- [Contact](${baseUrl}/contact): Phone, email, and service-area details.`);
  lines.push(`- [All services](${baseUrl}/services): Full list of towing and roadside services.`);
  lines.push(`- [All service areas](${baseUrl}/locations): Every city and community we cover.`);
  lines.push(`- [Blog](${baseUrl}/blog): Road-safety and towing guides for BC drivers.`);
  lines.push("");

  lines.push("## Contact");
  lines.push(`- Phone: ${contact.phoneDisplay.value}`);
  lines.push(`- Email: ${contact.email.value}`);
  lines.push(`- Area served: ${geo.region.value}, ${geo.province.value}, Canada`);
  lines.push("- Availability: 24/7, including weekends and holidays");
  lines.push(`- Facebook: ${social.facebook.value}`);
  lines.push(`- Instagram: ${social.instagram.value}`);
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
