import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Towing & Roadside Services Surrey BC | Emergency, Lockout, Battery & More",
  description:
    "Full-service towing and roadside assistance in Surrey and the Lower Mainland. Emergency towing, battery boost, flat tire, lockout, fuel delivery, and winching — available 24/7 with upfront pricing.",
  alternates: {
    canonical: "https://www.towingno1.com/services",
  },
  openGraph: {
    type: "website",
    url: "https://www.towingno1.com/services",
    title: "Towing & Roadside Services Surrey BC | Emergency, Lockout, Battery & More",
    description:
      "24/7 towing and roadside assistance in Surrey and the Lower Mainland. Fast dispatch, upfront pricing, licensed & insured.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Towing & Roadside Services Surrey BC | Emergency, Lockout, Battery & More",
    description:
      "24/7 towing and roadside assistance in Surrey and the Lower Mainland. Fast dispatch, upfront pricing, licensed & insured.",
  },
};

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "TowingNo.1 Towing & Roadside Services",
  description: "24/7 towing and roadside assistance services in Surrey and the Lower Mainland, BC",
  url: "https://www.towingno1.com/services",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Service",
        name: "Emergency Towing",
        url: "https://www.towingno1.com/services/emergency-towing",
        description: "24/7 emergency towing for cars, SUVs, and light trucks across the Lower Mainland BC.",
        provider: { "@type": "LocalBusiness", name: "TowingNo.1", "@id": "https://www.towingno1.com/#localbusiness" },
        areaServed: "Lower Mainland, BC",
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Service",
        name: "Battery Boost",
        url: "https://www.towingno1.com/services/battery-boost",
        description: "24/7 battery boost and jump-start service across Surrey and the Lower Mainland.",
        provider: { "@type": "LocalBusiness", name: "TowingNo.1", "@id": "https://www.towingno1.com/#localbusiness" },
        areaServed: "Lower Mainland, BC",
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Service",
        name: "Lockout Service",
        url: "https://www.towingno1.com/services/lockout-service",
        description: "24/7 car lockout service. We open your vehicle safely without damage.",
        provider: { "@type": "LocalBusiness", name: "TowingNo.1", "@id": "https://www.towingno1.com/#localbusiness" },
        areaServed: "Lower Mainland, BC",
      },
    },
    {
      "@type": "ListItem",
      position: 4,
      item: {
        "@type": "Service",
        name: "Flat Tire Help",
        url: "https://www.towingno1.com/services/flat-tire-help",
        description: "On-site tire change or tow to the nearest shop across the Lower Mainland.",
        provider: { "@type": "LocalBusiness", name: "TowingNo.1", "@id": "https://www.towingno1.com/#localbusiness" },
        areaServed: "Lower Mainland, BC",
      },
    },
    {
      "@type": "ListItem",
      position: 5,
      item: {
        "@type": "Service",
        name: "Fuel Delivery",
        url: "https://www.towingno1.com/services/fuel-delivery",
        description: "Emergency fuel delivery — gasoline and diesel delivered to your location.",
        provider: { "@type": "LocalBusiness", name: "TowingNo.1", "@id": "https://www.towingno1.com/#localbusiness" },
        areaServed: "Lower Mainland, BC",
      },
    },
    {
      "@type": "ListItem",
      position: 6,
      item: {
        "@type": "Service",
        name: "Winching & Extraction",
        url: "https://www.towingno1.com/services/winching-extraction",
        description: "Professional winching and extraction for vehicles stuck in mud, snow or ditches in BC.",
        provider: { "@type": "LocalBusiness", name: "TowingNo.1", "@id": "https://www.towingno1.com/#localbusiness" },
        areaServed: "Lower Mainland, BC",
      },
    },
    {
      "@type": "ListItem",
      position: 7,
      item: {
        "@type": "Service",
        name: "Vehicle Transport",
        url: "https://www.towingno1.com/services/vehicle-transport",
        description: "Secure vehicle transport across Surrey and the Lower Mainland.",
        provider: { "@type": "LocalBusiness", name: "TowingNo.1", "@id": "https://www.towingno1.com/#localbusiness" },
        areaServed: "Lower Mainland, BC",
      },
    },
    {
      "@type": "ListItem",
      position: 8,
      item: {
        "@type": "Service",
        name: "Accident Recovery",
        url: "https://www.towingno1.com/services/accident-recovery",
        description: "Professional accident recovery and collision towing across the Lower Mainland.",
        provider: { "@type": "LocalBusiness", name: "TowingNo.1", "@id": "https://www.towingno1.com/#localbusiness" },
        areaServed: "Lower Mainland, BC",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.towingno1.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://www.towingno1.com/services" },
  ],
};

const allServices = [
  {
    id: "emergency-towing",
    href: "/services/emergency-towing",
    img: "/image/Emergency_Towin.png",
    alt: "Emergency towing service Surrey — TowingNo.1 tow truck loading a car",
    title: "Emergency Towing",
    badge: "24/7",
    desc: "Fast dispatch for breakdowns, collisions, and stalled vehicles. Wheel-lift trucks available for all vehicle types including EVs.",
    bullets: ["Under 15 min response", "Wheel-lift trucks", "All vehicle types including EVs", "Tow to any destination"],
  },
  {
    id: "flat-tire",
    href: "/services/flat-tire-help",
    img: "/image/Flat_Tire_Hel.png",
    alt: "Flat tire roadside assistance Surrey — technician changing a tire",
    title: "Flat Tire Help",
    badge: "Fast",
    desc: "On-site spare tire installation or tow to the nearest tire shop. We respond to flat tires on highways and parking lots across the Lower Mainland.",
    bullets: ["On-site tire change", "Tow to tire shop if needed", "Highway & parking lot response", "All vehicle types"],
  },
  {
    id: "battery-boost",
    href: "/services/battery-boost",
    img: "/image/Battery_Boost.png",
    alt: "Battery boost jump-start service Surrey — dead car battery",
    title: "Battery Boost",
    badge: "Quick",
    desc: "Professional jump-start service with free battery and charging system test. We dispatch in under 15 minutes across Surrey and the Lower Mainland.",
    bullets: ["Professional jump-start", "Free battery test included", "Safe boosting procedures", "Available 24/7"],
  },
  {
    id: "accident-recovery",
    href: "/services/accident-recovery",
    img: "/image/Accident_Recover.png",
    alt: "Accident recovery towing Surrey — damaged vehicle being loaded on truck",
    title: "Accident Recovery",
    badge: "Expert",
    desc: "Professional collision scene handling and safe transport of damaged vehicles to any repair shop or storage facility.",
    bullets: ["Professional recovery crew", "Damaged vehicle transport", "Safe securing techniques", "Insurance coordination available"],
  },
  {
    id: "lockout",
    href: "/services/lockout-service",
    img: "/image/Lockout_Servic.png",
    alt: "Car lockout service Surrey — keys locked inside vehicle",
    title: "Lockout Service",
    badge: "No damage",
    desc: "We open your vehicle safely without causing damage to the lock, door, or window. All makes and models, available 24/7.",
    bullets: ["Fast lockout response", "No damage guaranteed", "All makes and models", "Available day or night"],
  },
  {
    id: "vehicle-transport",
    href: "/services/vehicle-transport",
    img: "/image/Vehicle_Transpor.png",
    alt: "Vehicle transport service Lower Mainland — car on truck",
    title: "Vehicle Transport",
    badge: "Secure",
    desc: "Secure, on-time vehicle transport across Surrey and the Lower Mainland. Running and non-running vehicles, wheel-lift available.",
    bullets: ["Wheel-lift trucks", "Running & non-running vehicles", "On-time pickup & delivery", "Licensed & insured"],
  },
  {
    id: "fuel-delivery",
    href: "/services/fuel-delivery",
    img: "/image/Fuel_Deliver.png",
    alt: "Emergency fuel delivery service Surrey — gas delivered to stranded vehicle",
    title: "Fuel Delivery",
    badge: "Emergency",
    desc: "Run out of gas? We deliver gasoline or diesel directly to your location so you can reach the nearest station.",
    bullets: ["Gasoline & diesel available", "Fast dispatch under 15 min", "Highway & roadside delivery", "Available 24/7"],
  },
  {
    id: "winching",
    href: "/services/winching-extraction",
    img: "/image/Winching_Extractio.png",
    alt: "Winching and extraction service BC — vehicle stuck in ditch being pulled out",
    title: "Winching & Extraction",
    badge: "Heavy-duty",
    desc: "Professional winching and extraction for vehicles stuck in ditches, mud, snow, or off-road. We pull your vehicle out safely without causing additional damage.",
    bullets: ["Safe winching techniques", "Ditch, mud & snow recovery", "Professional equipment", "Minimal vehicle damage"],
  },
];

export default function Services() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="relative h-[420px] flex items-center justify-center text-white overflow-hidden">
        <Image src="/service.jpg" alt="TowingNo.1 towing and roadside assistance services in Surrey BC" fill className="object-cover object-center" priority sizes="100vw" />
        <div className="absolute inset-0 bg-black/62" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        <div className="relative z-10 container-custom">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-xs text-slate-400">
              <li><Link href="/" className="hover:text-amber-400 transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-amber-400">Services</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-3">What we offer</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4 [text-shadow:0_2px_24px_rgba(0,0,0,0.7)]">
            Towing &amp; Roadside Assistance Services in Surrey, BC
          </h1>
          <p className="text-white/85 text-lg md:text-xl max-w-xl [text-shadow:0_1px_10px_rgba(0,0,0,0.5)]">
            Comprehensive towing and roadside solutions — available 24/7 across Surrey and the Lower Mainland. Licensed &amp; insured since 2010.
          </p>
        </div>
      </section>

      {/* Pricing teaser */}
      <div className="bg-amber-50 border-b border-amber-200 py-4">
        <div className="container-custom text-center">
          <p className="text-sm font-semibold text-amber-800 leading-relaxed">
            <svg className="w-4 h-4 text-amber-600 inline-block align-middle mr-1.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"/></svg>
            <strong>Flat-rate pricing</strong> — no hidden fees, no meter running. Call{" "}
            <a href="tel:+17788380014" className="underline hover:text-amber-900 whitespace-nowrap">(778) 838-0014</a>{" "}
            for an instant quote before we dispatch.
          </p>
        </div>
      </div>

      {/* Overview / Intro */}
      <section className="pt-16 pb-4 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-500 mb-3">One call, every roadside problem</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-5">
              Complete Towing &amp; Roadside Assistance for the Lower Mainland
            </h2>
            <div className="space-y-4 text-slate-600 text-base leading-relaxed">
              <p>
                TowingNo.1 brings every roadside service under one phone number for drivers across Surrey, Langley, Coquitlam, Burnaby, Richmond, White Rock, Delta, Maple Ridge, Vancouver, and the surrounding communities. Whether your car has died in a parkade, you have a flat on a highway shoulder, or your vehicle has slid into a ditch on a back road, the same local team handles the call from the first ring to the moment you are moving again.
              </p>
              <p>
                Each service listed below runs 24 hours a day, 7 days a week, including statutory holidays and overnight hours when most shops are closed. We dispatch the nearest available driver immediately, give you a firm flat-rate quote before any truck leaves, and stay on the line to confirm your exact location so help is already on the way while we talk. Most calls reach you in well under fifteen minutes across the core of our coverage area.
              </p>
              <p>
                Our fleet runs both wheel-lift and flatbed trucks, which lets us match the right method to your vehicle instead of forcing one approach onto every job. Flatbeds carry all-wheel-drive cars, electric vehicles, and low-clearance models that must never be dragged on their wheels, while wheel-lift trucks handle quick, economical moves. Every operator is licensed and insured in British Columbia and trained to work safely on live highway shoulders, inside tight underground parkades, and on the steep, icy grades that catch drivers out each winter.
              </p>
              <p>
                Wherever possible we aim to fix the problem on the spot — a boost, a tire change, a lockout, or a splash of fuel — so you avoid a tow altogether. When your vehicle genuinely cannot be driven, we transport it carefully to the shop, dealership, or address you choose. Explore the full range of services below, or call <a href="tel:+17788380014" className="font-semibold text-amber-600 hover:text-amber-700">(778) 838-0014</a> and tell us what has gone wrong.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="space-y-14">
            {allServices.map((svc, i) => {
              const isEven = i % 2 === 0;
              return (
                <div
                  key={svc.id}
                  id={svc.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.1)] transition-shadow duration-300"
                >
                  <div className={`grid md:grid-cols-2 ${isEven ? "" : "md:[&>*:first-child]:order-2"}`}>
                    <div className="relative h-72 md:h-auto min-h-[320px] overflow-hidden group bg-slate-100">
                      <Image src={svc.img} alt={svc.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]" />
                      <div className="absolute inset-0 bg-black/20" />
                      <span className="absolute top-4 left-4 inline-block bg-amber-400 text-gray-900 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                        {svc.badge}
                      </span>
                    </div>
                    <div className="p-8 md:p-10 flex flex-col justify-center">
                      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 leading-tight">{svc.title}</h2>
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-5">{svc.desc}</p>
                      <ul className="space-y-2 mb-6">
                        {svc.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-2.5 text-sm text-gray-700">
                            <span className="mt-0.5 w-4 h-4 rounded-full bg-amber-400/20 border border-amber-400 flex items-center justify-center shrink-0" aria-hidden="true">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5">
                                <path d="M2 6l3 3 5-5" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </span>
                            {b}
                          </li>
                        ))}
                      </ul>
                      <Link href={svc.href} className="inline-flex items-center gap-2 text-sm font-bold text-amber-600 hover:text-amber-700 transition-colors">
                        Learn more about {svc.title}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                          <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-900">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-3">Ready when you are</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
              Need Any of These Services?
            </h2>
            <p className="text-white/60 mb-10 text-base">
              We&apos;re dispatching 24/7 — including nights, weekends, and holidays. Free quote before dispatch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+17788380014" className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold py-4 px-10 rounded-xl text-base transition-all duration-200 hover:-translate-y-0.5 shadow-lg hover:shadow-xl">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                  <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                </svg>
                (778) 838-0014
              </a>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-10 rounded-xl text-base border border-white/25 transition-all duration-200 backdrop-blur-sm hover:-translate-y-0.5">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
