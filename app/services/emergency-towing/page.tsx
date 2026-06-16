import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Emergency Towing Surrey | 24/7 Tow Truck Near Me",
  description:
    "Need emergency towing in Surrey or the Lower Mainland? TowingNo.1 dispatches in under 15 minutes, 24/7. Flatbed and wheel-lift towing for all vehicles. Free quote — call (778) 838-0014.",
  alternates: {
    canonical: "https://www.towingno1.com/services/emergency-towing",
  },
  openGraph: {
    type: "website",
    url: "https://www.towingno1.com/services/emergency-towing",
    title: "Emergency Towing Surrey | 24/7 Tow Truck Near Me",
    description:
      "24/7 emergency towing in Surrey and the Lower Mainland. Fast dispatch, upfront pricing, licensed & insured.",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.towingno1.com/services/emergency-towing#service",
  name: "Emergency Towing Surrey",
  serviceType: "Emergency Towing",
  description:
    "24/7 emergency towing for cars, SUVs, trucks, and electric vehicles across Surrey and the Lower Mainland. Flatbed and wheel-lift trucks available. Licensed and insured.",
  provider: { "@id": "https://www.towingno1.com/#localbusiness" },
  areaServed: [
    { "@type": "City", name: "Surrey" },
    { "@type": "City", name: "Langley" },
    { "@type": "City", name: "Burnaby" },
    { "@type": "City", name: "Richmond" },
    { "@type": "City", name: "Coquitlam" },
    { "@type": "City", name: "Delta" },
  ],
  offers: {
    "@type": "Offer",
    priceCurrency: "CAD",
    priceSpecification: {
      "@type": "PriceSpecification",
      description: "Flat-rate pricing. Call (778) 838-0014 for an instant quote before dispatch.",
    },
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How fast can you tow my car in Surrey?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our average response time in Surrey is under 15 minutes. We dispatch the nearest available driver immediately when you call (778) 838-0014.",
      },
    },
    {
      "@type": "Question",
      name: "How much does emergency towing cost in Surrey?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every tow is quoted as a single flat figure based on your vehicle and the distance involved, with no metered surprises; ring (778) 838-0014 and you will hear the price before a truck is sent.",
      },
    },
    {
      "@type": "Question",
      name: "Do you tow electric vehicles?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Electric vehicles must be transported on a flatbed — never towed with wheels down. We have flatbed trucks available 24/7 for all EVs including Tesla, Rivian, and other makes.",
      },
    },
    {
      "@type": "Question",
      name: "Do you tow on Highway 99 and King George Boulevard in Surrey?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We respond to breakdowns on Highway 99, King George Boulevard, 152nd Street, Fraser Highway, and all major Surrey corridors 24/7.",
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
    { "@type": "ListItem", position: 3, name: "Emergency Towing", item: "https://www.towingno1.com/services/emergency-towing" },
  ],
};

export default function EmergencyTowingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="relative h-[380px] flex items-center overflow-hidden bg-navy-950">
        <Image src="/image/Emergency_Towin.png" alt="Emergency towing service Surrey — TowingNo.1 tow truck" fill className="object-cover opacity-30" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/60 to-navy-950/20" />
        <div className="relative z-10 container-custom">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-xs text-slate-400">
              <li><Link href="/" className="hover:text-amber-400 transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/services" className="hover:text-amber-400 transition-colors">Services</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-amber-400">Emergency Towing</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-3">24/7 Service</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Emergency Towing Surrey &amp; Lower Mainland
          </h1>
          <p className="text-white/80 text-lg max-w-xl">
            Fast dispatch in under 15 minutes. Flatbed and wheel-lift towing for all vehicles — cars, SUVs, trucks, and EVs. Licensed &amp; insured since 2010.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">24/7 Emergency Towing in Surrey, BC</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  When your vehicle breaks down on Highway 99, King George Boulevard, or anywhere across Surrey and the Lower Mainland, TowingNo.1 dispatches the nearest available driver immediately. Our average response time is <strong>under 15 minutes</strong>.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  We operate flatbed and wheel-lift tow trucks 24 hours a day, 7 days a week — including all statutory holidays. Every tow comes with an upfront flat-rate quote before dispatch. No hidden fees, no meter running.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Our drivers are trained, licensed, and insured in BC. We handle your vehicle with professional care from pickup to drop-off, whether you need a tow to a repair shop, dealership, or your home.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">What We Tow</h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {[
                    "Cars and sedans",
                    "SUVs and crossovers",
                    "Pickup trucks",
                    "Electric vehicles (flatbed only)",
                    "Motorcycles",
                    "Light commercial vehicles",
                    "Accident-damaged vehicles",
                    "Non-running vehicles",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-slate-700">
                      <span className="w-5 h-5 rounded-full bg-amber-400/20 border border-amber-400 flex items-center justify-center shrink-0" aria-hidden="true">
                        <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5"><path d="M2 6l3 3 5-5" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Areas We Serve</h2>
                <p className="text-slate-600 leading-relaxed mb-3">
                  We dispatch emergency towing across all of Surrey including Guildford, Newton, Fleetwood, Cloverdale, and South Surrey. We also cover Langley, Burnaby, Richmond, Coquitlam, White Rock, Delta, Maple Ridge, and Vancouver.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Surrey", "Langley", "Burnaby", "Richmond", "Coquitlam", "White Rock", "Delta", "Maple Ridge", "Vancouver"].map((city) => (
                    <Link key={city} href={`/locations/${city.toLowerCase().replace(" ", "-")}`} className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-3 py-1.5 hover:bg-amber-100 transition-colors">
                      {city}
                    </Link>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Flatbed or Wheel-Lift: What Your Vehicle Needs</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Not every breakdown calls for the same truck. A flatbed lifts the whole vehicle clear of the road, which is the right choice for all-wheel-drive cars, lowered or low-clearance vehicles, electric vehicles that must never roll on their drive wheels, and anything with crash or drivetrain damage. A wheel-lift is quicker to set up and ideal for short repositioning jobs and standard front- or rear-wheel-drive sedans where a full deck is not required.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  When you call, mention the make, the drive type, and whether the vehicle still rolls and steers. That one detail lets dispatch send the correct truck the first time, which keeps your wait short and protects your transmission and bumpers from avoidable harm during loading.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Staying Safe Until the Truck Arrives</h2>
                <p className="text-slate-600 leading-relaxed">
                  If you have rolled to a stop on a shoulder, keep your seatbelt on, leave the hazard lights flashing, and stay inside when traffic is heavy and fast. If the shoulder is wide and clear, step out on the side away from the lane and wait behind the guardrail. Share your exact direction of travel and the nearest exit or kilometre marker so our driver reaches you without circling back, and we will text you when the truck is close.
                </p>
              </div>

              {/* FAQ */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {[
                    { q: "How fast can you tow my car in Surrey?", a: "Our average response time in Surrey is under 15 minutes. We dispatch the nearest available driver immediately when you call (778) 838-0014." },
                    { q: "How much does emergency towing cost in Surrey?", a: "Every tow is quoted as a single flat figure based on your vehicle and the distance involved, with no metered surprises; ring (778) 838-0014 and you will hear the price before a truck is sent." },
                    { q: "Do you tow electric vehicles?", a: "Yes. Electric vehicles must be transported on a flatbed — never towed with wheels down. We have flatbed trucks available 24/7 for all EVs." },
                    { q: "Do you tow on Highway 99 and King George Boulevard?", a: "Yes. We respond to breakdowns on Highway 99, King George Boulevard, 152nd Street, Fraser Highway, and all major Surrey corridors 24/7." },
                  ].map((faq) => (
                    <div key={faq.q} className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                      <h3 className="font-bold text-navy-900 mb-2 text-sm">{faq.q}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar CTA */}
            <div className="space-y-6">
              <div className="bg-navy-950 rounded-2xl p-6 text-white sticky top-24">
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">Available Now</p>
                <h3 className="text-xl font-extrabold mb-3">Need a Tow Right Now?</h3>
                <p className="text-slate-300 text-sm mb-5">We dispatch in under 15 minutes. Free quote before dispatch.</p>
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
                <h3 className="font-bold text-navy-900 mb-3 text-sm">Other Services</h3>
                <ul className="space-y-2">
                  {[
                    { href: "/services/battery-boost", label: "Battery Boost" },
                    { href: "/services/lockout-service", label: "Lockout Service" },
                    { href: "/services/flat-tire-help", label: "Flat Tire Help" },
                    { href: "/services/fuel-delivery", label: "Fuel Delivery" },
                    { href: "/services/winching-extraction", label: "Winching & Extraction" },
                  ].map((s) => (
                    <li key={s.href}>
                      <Link href={s.href} className="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 shrink-0" aria-hidden="true"><path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd"/></svg> {s.label}
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
