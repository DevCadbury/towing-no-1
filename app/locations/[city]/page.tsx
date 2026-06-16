import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceAreaBySlug, serviceAreas, slugifyCity, isServiceAreaSlug } from "@/lib/service-areas";

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

  const canonical = `https://www.towingno1.com/locations/${area.slug}`;

  return {
    title: `Tow Truck ${area.city} | 24/7 Emergency Towing & Roadside Assistance`,
    description: `Need a tow truck in ${area.city}? TowingNo.1 dispatches in under 15 minutes, 24/7. Emergency towing, battery boost, lockout, flat tire & more. Free quote — call (778) 838-0014.`,
    keywords: [
      `tow truck ${area.city.toLowerCase()}`,
      `towing ${area.city.toLowerCase()}`,
      `towing near me ${area.city.toLowerCase()}`,
      `roadside assistance ${area.city.toLowerCase()}`,
      `emergency towing ${area.city.toLowerCase()}`,
      "tow truck near me",
      "24/7 towing",
    ],
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      title: `Tow Truck ${area.city} | 24/7 Emergency Towing & Roadside Assistance`,
      description: `24/7 tow truck and roadside service in ${area.city} with fast dispatch and transparent rates. Call (778) 838-0014.`,
    },
    twitter: {
      card: "summary_large_image",
      title: `Tow Truck ${area.city} | 24/7 Emergency Towing & Roadside Assistance`,
      description: `Fast dispatch in ${area.city} for towing, lockouts, flat tires, and roadside emergencies. Call (778) 838-0014.`,
    },
  };
}

export default async function ServiceAreaPage({ params }: Props) {
  const { city } = await params;
  const area = getServiceAreaBySlug(city);

  if (!area) {
    notFound();
  }

  const canonical = `https://www.towingno1.com/locations/${area.slug}`;

  // Only link to nearby cities that resolve to a real /locations/[slug] route.
  // This guarantees we can never emit a dead nearby-area link, even if the
  // nearbyCities data later references a city without its own location page.
  const nearbyAreaLinks = area.nearbyCities
    .map((nearby) => ({ name: nearby, slug: slugifyCity(nearby) }))
    .filter((entry) => isServiceAreaSlug(entry.slug));

  const localServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonical}#service`,
    name: `24/7 Tow Truck ${area.city}`,
    serviceType: "Emergency towing and roadside assistance",
    provider: { "@id": "https://www.towingno1.com/#localbusiness" },
    areaServed: {
      "@type": "City",
      name: area.city,
      containedInPlace: { "@type": "AdministrativeArea", name: "British Columbia" },
    },
    url: canonical,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: area.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.towingno1.com" },
      { "@type": "ListItem", position: 2, name: "Service Areas", item: "https://www.towingno1.com/locations" },
      { "@type": "ListItem", position: 3, name: area.city, item: canonical },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localServiceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="bg-navy-950 pt-28 pb-16">
        <div className="container-custom">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-slate-400">
              <li><Link href="/" className="hover:text-amber-400 transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/locations" className="hover:text-amber-400 transition-colors">Service Areas</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-amber-400">{area.city}</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-3">Local Coverage</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-5">
            {area.headline}
          </h1>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl mb-8">
            {area.summary}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="tel:+17788380014" className="btn-call-highlight inline-flex items-center justify-center gap-2 rounded-xl py-3.5 px-7 text-sm font-bold w-full sm:w-auto">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              Call Now — Free Quote
            </a>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-3.5 px-7 rounded-xl text-sm border border-white/25 transition-all duration-200 w-full sm:w-auto">
              Request Online
            </Link>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">

              {/* Overview */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Towing &amp; Roadside Help in {area.city}</h2>
                {area.intro.map((para) => (
                  <p key={para} className="text-slate-600 leading-relaxed mb-4 last:mb-0">{para}</p>
                ))}
              </div>

              {/* Why locals call us */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Why Locals Call Us</h2>
                {area.whyChooseUs.map((para) => (
                  <p key={para} className="text-slate-600 leading-relaxed mb-4 last:mb-0">{para}</p>
                ))}
              </div>

              {/* Common scenarios */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Calls We Handle in {area.city}</h2>
                <div className="space-y-4">
                  {area.commonScenarios.map((scenario) => (
                    <div key={scenario.title} className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                      <h3 className="font-bold text-navy-900 mb-2 text-sm">{scenario.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{scenario.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Neighbourhoods */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Areas We Cover in {area.city}</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Neighbourhoods and zones we cover:
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {area.neighborhoods.map((zone) => (
                    <span key={zone} className="text-xs font-semibold uppercase tracking-wide text-slate-600 bg-slate-100 border border-slate-200 rounded-full px-3 py-1.5">
                      {zone}
                    </span>
                  ))}
                </div>
                {area.highways.length > 0 && (
                  <p className="text-slate-600 text-sm leading-relaxed">
                    <strong>Major routes covered:</strong> {area.highways.join(", ")}
                  </p>
                )}
              </div>

              {/* Services */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Roadside Services in {area.city}</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { href: "/services/emergency-towing", label: "24/7 Emergency Towing", desc: "Breakdown & collision towing" },
                    { href: "/services/battery-boost", label: "Battery Boost", desc: "Jump-start with battery test" },
                    { href: "/services/flat-tire-help", label: "Flat Tire Help", desc: "On-site change or shop tow" },
                    { href: "/services/lockout-service", label: "Lockout Service", desc: "Open your vehicle without damage" },
                    { href: "/services/fuel-delivery", label: "Fuel Delivery", desc: "Gas or diesel delivered" },
                    { href: "/services/winching-extraction", label: "Winching & Extraction", desc: "Ditch, mud & snow recovery" },
                  ].map((svc) => (
                    <Link key={svc.href} href={svc.href} className="group flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-amber-400/60 hover:bg-amber-50/30 transition-all duration-200">
                      <span className="w-5 h-5 rounded-full bg-amber-400/20 border border-amber-400 flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
                        <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5"><path d="M2 6l3 3 5-5" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                      <div>
                        <p className="text-sm font-bold text-navy-900 group-hover:text-amber-600 transition-colors">{svc.label}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{svc.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Nearby cities */}
              {nearbyAreaLinks.length > 0 && (
                <div>
                  <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Nearby Areas We Also Cover</h2>
                  <p className="text-sm text-slate-600 mb-4">
                    We also dispatch nearby:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {nearbyAreaLinks.map((nearby) => (
                      <Link
                        key={nearby.slug}
                        href={`/locations/${nearby.slug}`}
                        className="text-xs font-semibold uppercase tracking-wide text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-3 py-1.5 hover:bg-amber-100 transition-colors"
                      >
                        {nearby.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQ */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-6">Frequently Asked Questions — {area.city}</h2>
                <div className="space-y-4">
                  {area.faq.map((item) => (
                    <div key={item.q} className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                      <h3 className="font-bold text-navy-900 mb-2 text-sm">{item.q}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{item.a}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Internal links */}
              <div className="text-sm text-slate-600 flex flex-wrap gap-4 pt-4 border-t border-slate-100">
                <Link href="/locations" className="font-semibold text-amber-600 hover:text-amber-700">
                  View all service areas
                </Link>
                <Link href="/services" className="font-semibold text-amber-600 hover:text-amber-700">
                  See all towing services
                </Link>
                <Link href="/contact" className="font-semibold text-amber-600 hover:text-amber-700">
                  Request service online
                </Link>
                <Link href="/blog" className="font-semibold text-amber-600 hover:text-amber-700">
                  Towing tips & advice
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-navy-950 rounded-2xl p-6 text-white sticky top-24">
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">Available Now</p>
                <h3 className="text-xl font-extrabold mb-1">Need a Tow Truck?</h3>
                <p className="text-slate-300 text-sm mb-5">We&apos;re 15 minutes away. Free quote before dispatch.</p>
                <a href="tel:+17788380014" className="btn-call-highlight flex items-center justify-center gap-2 w-full rounded-xl py-3.5 px-5 text-sm font-bold">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  (778) 838-0014
                </a>
                <Link href="/contact" className="mt-3 flex items-center justify-center gap-2 w-full rounded-xl py-3 px-5 text-sm font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors">
                  Request Online
                </Link>
                <ul className="mt-5 space-y-2 text-xs text-slate-400">
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> Under 15 min response</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> Free upfront quote</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> Licensed &amp; insured</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> 24/7 including holidays</li>
                </ul>
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                <h3 className="font-bold text-navy-900 mb-3 text-sm">Other Service Areas</h3>
                <ul className="space-y-2">
                  {serviceAreas
                    .filter((a) => a.slug !== area.slug)
                    .slice(0, 6)
                    .map((a) => (
                      <li key={a.slug}>
                        <Link href={`/locations/${a.slug}`} className="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 shrink-0" aria-hidden="true"><path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd"/></svg> Tow Truck {a.city}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
