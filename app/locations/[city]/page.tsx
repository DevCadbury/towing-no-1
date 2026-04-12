import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceAreaBySlug, serviceAreas } from "@/lib/service-areas";

interface Props {
  params: Promise<{ city: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceAreas.map((area) => ({ city: area.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const area = getServiceAreaBySlug(city);

  if (!area) {
    return { title: "Service Area Not Found" };
  }

  const canonical = `https://towing-no-1.com/locations/${area.slug}`;

  return {
    title: `Tow Truck ${area.city} | 24/7 Towing Near Me`,
    description: `Need towing near you in ${area.city}? Get 24/7 tow truck dispatch, roadside help, and free upfront quotes from TowingNo.1.`,
    keywords: [
      `tow truck ${area.city.toLowerCase()}`,
      `towing ${area.city.toLowerCase()}`,
      `towing near me ${area.city.toLowerCase()}`,
      `roadside assistance ${area.city.toLowerCase()}`,
      "tow truck near me",
      "24/7 towing",
    ],
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      url: canonical,
      title: `Tow Truck ${area.city} | 24/7 Towing Near Me`,
      description: `24/7 tow truck and roadside service in ${area.city} with fast dispatch and transparent rates.`,
    },
    twitter: {
      card: "summary_large_image",
      title: `Tow Truck ${area.city} | 24/7 Towing Near Me`,
      description: `Fast dispatch in ${area.city} for towing, lockouts, flat tires, and roadside emergencies.`,
    },
  };
}

export default async function ServiceAreaPage({ params }: Props) {
  const { city } = await params;
  const area = getServiceAreaBySlug(city);

  if (!area) {
    notFound();
  }

  const canonical = `https://towing-no-1.com/locations/${area.slug}`;

  const localServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonical}#service`,
    name: `24/7 Tow Truck ${area.city}`,
    serviceType: "Emergency towing and roadside assistance",
    provider: {
      "@id": "https://towing-no-1.com/#localbusiness",
    },
    areaServed: {
      "@type": "City",
      name: area.city,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "British Columbia",
      },
    },
    url: canonical,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://towing-no-1.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Service Areas",
        item: "https://towing-no-1.com/locations",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: area.city,
        item: canonical,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-500 mb-3">Local Coverage</p>
            <h1 className="text-3xl md:text-5xl font-extrabold text-navy-900 leading-tight mb-5">
              Tow Truck {area.city} - 24/7 Emergency Towing Near You
            </h1>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-6">
              {area.summary} Our dispatch team serves {area.city} day and night with quick ETAs and upfront quotes.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {area.neighborhoods.map((zone) => (
                <span key={zone} className="text-xs font-semibold uppercase tracking-wide text-slate-600 bg-slate-100 border border-slate-200 rounded-full px-3 py-1.5">
                  {zone}
                </span>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Roadside Services in {area.city}</h2>
              <ul className="space-y-3 text-slate-700 text-sm">
                <li>24/7 emergency towing for cars, SUVs, and light trucks</li>
                <li>Battery boosts and jump-start support</li>
                <li>Flat tire change and roadside wheel help</li>
                <li>Vehicle lockout and key retrieval assistance</li>
                <li>Fuel delivery and winching recovery</li>
              </ul>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Nearby Areas We Also Cover</h2>
              <p className="text-sm text-slate-600 mb-4">
                If you are near {area.city}, we also dispatch to surrounding communities with the same 24/7 support.
              </p>
              <div className="flex flex-wrap gap-2">
                {area.nearbyCities.map((nearby) => (
                  <span key={nearby} className="text-xs font-semibold uppercase tracking-wide text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-3 py-1.5">
                    {nearby}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 bg-navy-950 rounded-2xl p-7 text-white flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold mb-1">Need a Tow Truck in {area.city} Now?</h2>
              <p className="text-slate-300">Call dispatch for instant help and a free quote before we send a driver.</p>
            </div>
            <a href="tel:+17788380014" className="btn-call-highlight inline-flex items-center justify-center gap-2 rounded-xl py-3.5 px-7 w-full md:w-auto">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Now - Free Quote
            </a>
          </div>

          <div className="mt-8 text-sm text-slate-600 flex flex-wrap gap-4">
            <Link href="/locations" className="font-semibold text-amber-600 hover:text-amber-700">
              View all service areas
            </Link>
            <Link href="/services" className="font-semibold text-amber-600 hover:text-amber-700">
              See all towing services
            </Link>
            <Link href="/contact" className="font-semibold text-amber-600 hover:text-amber-700">
              Request service online
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
