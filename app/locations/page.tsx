import type { Metadata } from "next";
import Link from "next/link";
import { serviceAreas } from "@/lib/service-areas";

export const metadata: Metadata = {
  title: "Service Areas | Tow Truck Surrey and Lower Mainland",
  description:
    "Explore TowingNo.1 service areas across Surrey and the Lower Mainland. Find 24/7 towing and roadside support near you with fast dispatch.",
  alternates: {
    canonical: "https://towing-no-1.com/locations",
  },
  openGraph: {
    type: "website",
    url: "https://towing-no-1.com/locations",
    title: "Service Areas | Tow Truck Surrey and Lower Mainland",
    description:
      "City-based towing and roadside support pages for Surrey, Langley, Burnaby, Coquitlam, Richmond, White Rock, and Vancouver.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Service Areas | Tow Truck Surrey and Lower Mainland",
    description:
      "Find local 24/7 towing coverage across Surrey and the Lower Mainland with fast dispatch and upfront quotes.",
  },
};

const serviceAreaListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "TowingNo.1 Service Areas",
  itemListElement: serviceAreas.map((area, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `https://towing-no-1.com/locations/${area.slug}`,
    name: `${area.city} Tow Truck Service`,
  })),
};

export default function LocationsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceAreaListSchema) }}
      />

      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-500 mb-3">Service Areas</p>
            <h1 className="text-3xl md:text-5xl font-extrabold text-navy-900 leading-tight mb-5">
              24/7 Tow Truck Coverage Across Surrey and the Lower Mainland
            </h1>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed">
              Looking for towing near you? Choose your city below to see local service coverage, common response zones,
              and direct dispatch support.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {serviceAreas.map((area) => (
              <Link
                key={area.slug}
                href={`/locations/${area.slug}`}
                className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-amber-400/60 hover:shadow-[0_12px_40px_rgba(0,0,0,0.10)] transition-all duration-300"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-amber-500 mb-2">{area.city}</p>
                <h2 className="text-xl font-extrabold text-navy-900 leading-snug mb-3 group-hover:text-amber-600 transition-colors">
                  {area.headline}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{area.summary}</p>
                <p className="text-xs text-slate-500">Popular areas: {area.neighborhoods.slice(0, 3).join(", ")}</p>
              </Link>
            ))}
          </div>

          <div className="mt-12 bg-navy-950 rounded-2xl p-7 text-white flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-2xl font-extrabold mb-1">Need Help Right Now?</h3>
              <p className="text-slate-300">Call dispatch for immediate response and a free quote before dispatch.</p>
            </div>
            <a href="tel:+17788380014" className="btn-call-highlight inline-flex items-center justify-center gap-2 rounded-xl py-3.5 px-7 w-full md:w-auto">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Now - Free Quote
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
