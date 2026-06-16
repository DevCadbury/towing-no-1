import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Fuel Delivery Surrey | Emergency Gas Delivery Near Me 24/7",
  description:
    "Run out of fuel in Surrey or the Lower Mainland? TowingNo.1 delivers gasoline or diesel to your location 24/7. Fast dispatch, upfront pricing. Call (778) 838-0014.",
  alternates: { canonical: "https://www.towingno1.com/services/fuel-delivery" },
  openGraph: {
    type: "website",
    url: "https://www.towingno1.com/services/fuel-delivery",
    title: "Fuel Delivery Surrey | Emergency Gas Delivery Near Me 24/7",
    description: "24/7 emergency fuel delivery in Surrey and the Lower Mainland. Gasoline and diesel delivered to your location.",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.towingno1.com/services/fuel-delivery#service",
  name: "Emergency Fuel Delivery Surrey",
  serviceType: "Fuel Delivery",
  description: "24/7 emergency fuel delivery across Surrey and the Lower Mainland. Gasoline and diesel delivered directly to your location.",
  provider: { "@id": "https://www.towingno1.com/#localbusiness" },
  areaServed: [
    { "@type": "City", name: "Surrey" },
    { "@type": "City", name: "Langley" },
    { "@type": "City", name: "Burnaby" },
    { "@type": "City", name: "Richmond" },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.towingno1.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://www.towingno1.com/services" },
    { "@type": "ListItem", position: 3, name: "Fuel Delivery", item: "https://www.towingno1.com/services/fuel-delivery" },
  ],
};

export default function FuelDeliveryPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="relative h-[380px] flex items-center overflow-hidden bg-navy-950">
        <Image src="/image/Fuel_Deliver.png" alt="Emergency fuel delivery service Surrey — gas delivered to stranded vehicle" fill className="object-cover opacity-30" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/60 to-navy-950/20" />
        <div className="relative z-10 container-custom">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-xs text-slate-400">
              <li><Link href="/" className="hover:text-amber-400 transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/services" className="hover:text-amber-400 transition-colors">Services</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-amber-400">Fuel Delivery</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-3">Emergency Service</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Emergency Fuel Delivery — Surrey &amp; Lower Mainland
          </h1>
          <p className="text-white/80 text-lg max-w-xl">
            Run out of gas? We deliver gasoline or diesel directly to your location so you can reach the nearest station. Available 24/7 with fast dispatch.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">24/7 Fuel Delivery in Surrey, BC</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Running out of fuel is a frustrating situation — especially on a busy highway or late at night. TowingNo.1 delivers enough gasoline or diesel to get you to the nearest station, reaching most locations region-wide in well under <strong>15 minutes</strong>.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  We deliver fuel directly to your location — whether you&apos;re on Highway 99, King George Boulevard, or in a parking lot. You get an upfront flat-rate quote before we dispatch, so there are no surprises.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Whether you misjudged the gauge on a long commute or a faulty sender left you guessing, we bring fuel to highways, bridges, industrial parks, and quiet residential streets alike.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">What We Offer</h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {["Gasoline delivery", "Diesel delivery", "Fast dispatch under 15 min", "Highway and roadside delivery", "Upfront flat-rate pricing", "Available 24/7 including holidays"].map((item) => (
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
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Gasoline and Diesel — Why the Difference Matters</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Putting the wrong fuel in a tank is an expensive mistake, so we confirm what your vehicle takes before a drop is poured. For gas engines we bring fresh regular-grade gasoline, which suits the vast majority of cars and SUVs on the road here. Diesel owners — pickups, vans, and many commercial trucks — get clean diesel rather than gas, because even a small amount of gasoline in a diesel system can damage the injection pump and require a costly flush.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  We deliver enough to get you rolling to a station to fill up properly, not a full tank, which keeps the visit quick and the price predictable. If your engine has been run completely dry, a diesel in particular may need a moment to prime, and our driver can help bleed the line so you are not left cranking a stubborn starter.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Running on Empty: What Actually Happens</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Coasting to empty is harder on your car than most drivers realise. The fuel pump relies on gasoline or diesel flowing past it to stay cool, so repeatedly running the tank dry can shorten its life, and sediment from the bottom of the tank is more likely to reach the filter. If you feel the engine surge or stutter, ease off the highway onto the shoulder while you still have control rather than waiting for a complete stall in a live lane.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Once you are stopped safely, switch on your hazards and call us with your location and the type of fuel you need. Staying with the vehicle is usually wiser than walking along a busy shoulder to a distant station, especially after dark or in poor weather.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {[
                    { q: "How much fuel do you bring?", a: "Enough to reach the nearest open station and fill up properly — typically a few litres. We focus on getting you mobile again quickly rather than topping the tank at roadside." },
                    { q: "Can you bring diesel as well as gasoline?", a: "Yes. Tell the dispatcher whether your vehicle runs on gasoline or diesel and we bring the correct fuel. Using the wrong type can damage the engine, so we always confirm first." },
                    { q: "My car stalled completely — will it restart after fuel?", a: "Usually yes. Gas engines often start right up; a diesel that ran fully dry may need a moment to prime the line, and our driver can help with that on site." },
                  ].map((faq) => (
                    <div key={faq.q} className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                      <h3 className="font-bold text-navy-900 mb-2 text-sm">{faq.q}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-navy-950 rounded-2xl p-6 text-white sticky top-24">
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">Available Now</p>
                <h3 className="text-xl font-extrabold mb-3">Out of Fuel?</h3>
                <p className="text-slate-300 text-sm mb-5">We dispatch in under 15 minutes. Free quote before dispatch.</p>
                <a href="tel:+17788380014" className="btn-call-highlight flex items-center justify-center gap-2 w-full rounded-xl py-3.5 px-5 text-sm font-bold">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  (778) 838-0014
                </a>
                <ul className="mt-5 space-y-2 text-xs text-slate-400">
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> Under 15 min response</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> Gas &amp; diesel available</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> Upfront flat-rate price</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> 24/7 including holidays</li>
                </ul>
              </div>
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                <h3 className="font-bold text-navy-900 mb-3 text-sm">Other Services</h3>
                <ul className="space-y-2">
                  {[
                    { href: "/services/emergency-towing", label: "Emergency Towing" },
                    { href: "/services/battery-boost", label: "Battery Boost" },
                    { href: "/services/lockout-service", label: "Lockout Service" },
                    { href: "/services/flat-tire-help", label: "Flat Tire Help" },
                    { href: "/services/winching-extraction", label: "Winching & Extraction" },
                  ].map((s) => (
                    <li key={s.href}><Link href={s.href} className="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 shrink-0" aria-hidden="true"><path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd"/></svg> {s.label}</Link></li>
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
