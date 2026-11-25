import { serviceAreas } from "@/lib/service-areas";
import { blogPosts } from "@/lib/blog-posts";
import { address, contact, geo, isVerified, payment, serviceArea, social } from "@/lib/business-facts";

/**
 * /llms.txt — an LLM-friendly summary of the site (see https://llmstxt.org).
 *
 * Generated from the same data as the rest of the site (services, service
 * areas, blog posts, business facts) so it stays in sync automatically — the
 * same approach as app/sitemap.ts and app/robots.ts.
 *
 * IMPORTANT: only VERIFIED business facts belong here, read from
 * lib/business-facts.ts behind isVerified() (wave 5, A-228, D-099): business
 * name, the 15 owner-confirmed places (F-06), email (F-03), social profiles
 * (F-12), payment methods (F-13, F-19) and 24/7 incl. statutory holidays
 * (F-23). Never add response-time figures, "licensed & insured", flatbed or
 * fleet claims, prices, ratings/review counts or a street address.
 */

const baseUrl = "https://www.towingno1.com";

// Canonical service list (name, path, short description) mirroring all 11
// service pages. Kept here so /llms.txt is a single, editable summary.
const services = [
  { name: "Emergency Towing", path: "/services/emergency-towing", desc: "24/7 light-duty tow truck for breakdowns and collisions." },
  { name: "Roadside Assistance", path: "/services/roadside-assistance", desc: "Battery boost, flat tire, lockout, and fuel delivery, all in one call." },
  { name: "Battery Boost", path: "/services/battery-boost", desc: "Jump start and battery boost when your battery dies." },
  { name: "Flat Tire Help", path: "/services/flat-tire-help", desc: "Spare-tire installation on site or a tow to a tire shop." },
  { name: "Lockout Service", path: "/services/lockout-service", desc: "Vehicle unlocking when keys are locked inside, with a damage-free lockout guarantee." },
  { name: "Fuel Delivery", path: "/services/fuel-delivery", desc: "Emergency gasoline or diesel delivered to your location." },
  { name: "Winching & Extraction", path: "/services/winching-extraction", desc: "Recovery for vehicles stuck in mud, snow, or a ditch." },
  { name: "Accident Recovery", path: "/services/accident-recovery", desc: "Towing from collision scenes and transport for damaged vehicles." },
  { name: "Vehicle Transport", path: "/services/vehicle-transport", desc: "Vehicle transport between locations, including long-distance towing within BC." },
  { name: "Cross Border Towing", path: "/services/cross-border-towing", desc: "Towing and vehicle transportation between Canada and the United States." },
  { name: "Underground Parking Towing", path: "/services/underground-parking-towing", desc: "Towing out of underground parkades and parking garages with a low-clearance tow truck." },
];

export const dynamic = "force-static";

export function GET() {
  const lines: string[] = [];
  const places = serviceArea.filter(isVerified).map((p) => p.value);
  const placeList = `${places.slice(0, -1).join(", ")} and ${places[places.length - 1]}`;

  lines.push("# TowingNo.1: 24/7 Tow Truck & Roadside Assistance (Surrey, BC)");
  lines.push("");
  lines.push(
    `> TowingNo.1 provides 24/7 emergency towing and roadside assistance from ${address.city.value}, ${geo.province.value}. ` +
      `Call ${contact.phoneDisplay.value}.`,
  );
  lines.push("");
  lines.push(
    `TowingNo.1 is a towing and roadside assistance company in ${address.city.value}, ${geo.province.value}, Canada. ` +
      `Dispatch is available 24 hours a day, 7 days a week, including statutory holidays. The fastest way to reach us is by ` +
      `phone at ${contact.phoneDisplay.value}.`,
  );
  lines.push("");

  lines.push("## Services");
  for (const s of services) {
    lines.push(`- [${s.name}](${baseUrl}${s.path}): ${s.desc}`);
  }
  lines.push("");

  lines.push("## Service areas");
  lines.push(`We serve ${placeList}, BC.`);
  lines.push("");
  lines.push("Location pages (listed by priority):");
  for (const a of serviceAreas) {
    lines.push(`- [Tow truck in ${a.city}](${baseUrl}/locations/${a.slug})`);
  }
  lines.push("");

  lines.push("## Guides & articles");
  for (const p of blogPosts) {
    lines.push(`- [${p.title}](${baseUrl}/blog/${p.slug}): ${p.excerpt}`);
  }
  lines.push("");

  lines.push("## Company");
  lines.push(`- [About TowingNo.1](${baseUrl}/about): Who we are and how we take your call.`);
  lines.push(`- [Contact](${baseUrl}/contact): Phone, email, and service area details.`);
  lines.push(`- [All services](${baseUrl}/services): Full list of towing and roadside services.`);
  lines.push(`- [All service areas](${baseUrl}/locations): Every city and community we cover.`);
  lines.push(`- [Blog](${baseUrl}/blog): Road safety and towing guides for BC drivers.`);
  lines.push("");

  lines.push("## Contact");
  if (isVerified(contact.name)) {
    lines.push(`- Business name: ${contact.name.value} (brand ${contact.alternateName.value})`);
  }
  lines.push(`- Phone: ${contact.phoneDisplay.value}`);
  if (isVerified(contact.email)) lines.push(`- Email: ${contact.email.value}`);
  lines.push(`- Location: ${address.city.value}, ${address.region.value}, Canada`);
  lines.push("- Availability: 24/7, including statutory holidays");
  if (isVerified(payment.methods)) {
    lines.push(`- Payment: ${payment.methods.value}, paid to the driver directly`);
  }
  if (isVerified(social.facebook)) lines.push(`- Facebook: ${social.facebook.value}`);
  if (isVerified(social.instagram)) lines.push(`- Instagram: ${social.instagram.value}`);
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
