import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Vehicle Transport Surrey | Car Transport Lower Mainland BC",
  description:
    "Need vehicle transport in Surrey or across the Lower Mainland? TowingNo.1 provides secure, on-time vehicle transport for all makes and models. Call (778) 838-0014.",
  alternates: { canonical: "https://www.towingno1.com/services/vehicle-transport" },
  openGraph: {
    type: "website",
    url: "https://www.towingno1.com/services/vehicle-transport",
    title: "Vehicle Transport Surrey | Car Transport Lower Mainland BC",
    description: "Secure vehicle transport across Surrey and the Lower Mainland. On-time pickup and delivery for all vehicle types.",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.towingno1.com/services/vehicle-transport#service",
  name: "Vehicle Transport Surrey",
  serviceType: "Vehicle Transport",
  description: "Secure vehicle transport across Surrey and the Lower Mainland. On-time pickup and delivery for all vehicle types including non-running vehicles.",
  provider: { "@id": "https://www.towingno1.com/#localbusiness" },
  areaServed: [
    { "@type": "City", name: "Surrey" },
    { "@type": "City", name: "Langley" },
    { "@type": "City", name: "Burnaby" },
    { "@type": "City", name: "Vancouver" },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.towingno1.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://www.towingno1.com/services" },
    { "@type": "ListItem", position: 3, name: "Vehicle Transport", item: "https://www.towingno1.com/services/vehicle-transport" },
  ],
};

export default function VehicleTransportPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="relative h-[380px] flex items-center overflow-hidden bg-navy-950">
        <Image src="/image/Vehicle_Transpor.png" alt="Vehicle transport service Lower Mainland — car on flatbed truck" fill className="object-cover opacity-30" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/60 to-navy-950/20" />
        <div className="relative z-10 container-custom">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-xs text-slate-400">
              <li><Link href="/" className="hover:text-amber-400 transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/services" className="hover:text-amber-400 transition-colors">Services</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-amber-400">Vehicle Transport</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-3">Secure Transport</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Vehicle Transport — Surrey &amp; Lower Mainland
          </h1>
          <p className="text-white/80 text-lg max-w-xl">
            Secure, on-time vehicle transport across Surrey and the Lower Mainland. We move all vehicle types — running or non-running — with professional care.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Vehicle Transport in Surrey, BC</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Whether you&apos;re relocating, buying a vehicle from another city, or need to move a non-running car, TowingNo.1 provides secure vehicle transport across Surrey and the Lower Mainland. We use flatbed and wheel-lift trucks to transport your vehicle safely from pickup to delivery.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Our drivers are trained, licensed, and insured in BC. We handle your vehicle with professional care and provide an upfront flat-rate quote before dispatch.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">What We Transport</h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {["Running and non-running vehicles", "Cars, SUVs, and trucks", "Electric vehicles (flatbed)", "Motorcycles", "Classic and collector cars", "Dealership transfers"].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-slate-700">
                      <span className="w-5 h-5 rounded-full bg-amber-400/20 border border-amber-400 flex items-center justify-center shrink-0" aria-hidden="true">
                        <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5"><path d="M2 6l3 3 5-5" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-navy-950 rounded-2xl p-6 text-white sticky top-24">
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">Get a Quote</p>
                <h3 className="text-xl font-extrabold mb-3">Need Vehicle Transport?</h3>
                <p className="text-slate-300 text-sm mb-5">Call for an upfront quote. We dispatch 24/7.</p>
                <a href="tel:+17788380014" className="btn-call-highlight flex items-center justify-center gap-2 w-full rounded-xl py-3.5 px-5 text-sm font-bold">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  (778) 838-0014
                </a>
                <ul className="mt-5 space-y-2 text-xs text-slate-400">
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> Flatbed &amp; wheel-lift trucks</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> Licensed &amp; insured</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> Upfront flat-rate pricing</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> 24/7 availability</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
