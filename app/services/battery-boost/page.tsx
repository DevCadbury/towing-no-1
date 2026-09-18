import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { faqPageSchema, type FaqItem } from "@/lib/faq";
import { serviceAreaCompact } from "@/lib/service-areas";

export const metadata: Metadata = {
  title: {
    absolute: "Battery Boost & Jump Start | 24/7 Help | TowingNo.1",
  },
  description:
    "24/7 battery boost and jump start service in Surrey and the Lower Mainland. Dead battery? TowingNo.1 dispatches a technician immediately — call 778-838-0014.",
  alternates: { canonical: "https://www.towingno1.com/services/battery-boost" },
  keywords: [],
  openGraph: {
    type: "website",
    url: "https://www.towingno1.com/services/battery-boost",
    title: "Battery Boost & Jump Start | 24/7 Help | TowingNo.1",
    description:
      "24/7 battery boost and jump start service in Surrey and the Lower Mainland. Immediate dispatch, upfront pricing. Call 778-838-0014.",
    images: [{ url: "/image/Battery_Boost.png", alt: "Battery boost and jump start service — TowingNo.1 technician" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Battery Boost & Jump Start | 24/7 Help | TowingNo.1",
    description:
      "24/7 battery boost and jump start in Surrey and the Lower Mainland. Upfront pricing, immediate dispatch. Call 778-838-0014.",
    images: ["/image/Battery_Boost.png"],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.towingno1.com/services/battery-boost#service",
  name: "Battery Boost & Jump Start Service",
  serviceType: "Battery Boost",
  description:
    "24/7 battery boost and jump start service for all vehicles across Surrey and the Lower Mainland. Battery and charging system test included.",
  provider: { "@id": "https://www.towingno1.com/#localbusiness" },
  areaServed: serviceAreaCompact,
  offers: {
    "@type": "Offer",
    priceCurrency: "CAD",
    priceSpecification: {
      "@type": "PriceSpecification",
      description: "Flat-rate pricing. Call (778) 838-0014 for an upfront quote before dispatch.",
    },
  },
};

const faq: FaqItem[] = [
  {
    q: "Can you provide a battery boost 24/7?",
    a: "Yes. TowingNo.1 provides battery boost and jump start service 24 hours a day, 7 days a week — including evenings, weekends, and all statutory holidays. Call (778) 838-0014 at any hour and a dispatcher will answer and send a technician.",
  },
  {
    q: "Can you jump-start a car with a completely dead battery?",
    a: "Yes, in most cases. If the battery still has enough residual charge to accept a boost, we can get the engine running. After starting the vehicle, we test the battery and charging system to tell you whether the battery is healthy enough to hold a charge or needs replacement. If the vehicle will not start after a boost, we can arrange a tow to a shop.",
  },
  {
    q: "What should I do while waiting for roadside assistance?",
    a: "Stay with your vehicle in a safe location. If you are on a road or highway shoulder, switch on your hazard lights and — if it is safe to do so — exit on the passenger side away from traffic and wait behind a barrier or guardrail. Share your exact location (nearest intersection, exit number, or address) with the dispatcher so the technician can find you quickly.",
  },
  {
    q: "What if the vehicle still will not start after the boost?",
    a: "If a boost does not get the engine running, or if the vehicle starts but the battery test reveals a serious fault with the battery or charging system, we will tell you plainly what we found. We can arrange a tow to a shop or dealership so the underlying fault can be properly diagnosed and repaired. A boost that doesn't hold usually means the battery, alternator, or another component needs replacement.",
  },
  {
    q: "What areas do you serve for battery boost?",
    a: "We provide battery boost service across Surrey, Langley, Burnaby, Delta, White Rock, Richmond, Coquitlam, Maple Ridge, Vancouver, and the wider Lower Mainland. Call (778) 838-0014 and we will confirm coverage for your specific location.",
  },
];
const faqSchema = faqPageSchema(faq);

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",          item: "https://www.towingno1.com" },
    { "@type": "ListItem", position: 2, name: "Services",      item: "https://www.towingno1.com/services" },
    { "@type": "ListItem", position: 3, name: "Battery Boost", item: "https://www.towingno1.com/services/battery-boost" },
  ],
};

// Shared arrow icon for service sidebar links
function ArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
      <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
    </svg>
  );
}

export default function BatteryBoostPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950 pt-[76px]">
        <Image
          src="/image/Battery_Boost.png"
          alt="Battery boost and jump start service — TowingNo.1 technician helping with a dead battery"
          fill
          className="object-cover opacity-30"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/60 to-navy-950/20" />
        <div className="relative z-10 container-custom py-12 md:py-16">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-xs text-slate-400">
              <li><Link href="/" className="hover:text-amber-400 transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/services" className="hover:text-amber-400 transition-colors">Services</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-amber-400">Battery Boost</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-3">24/7 Service</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            24/7 Battery Boost &amp; Jump Start Service
          </h1>
          <p className="text-white/80 text-lg max-w-xl mb-8">
            Dead battery? TowingNo.1 dispatches a technician to jump start your vehicle on the spot and test
            your battery and charging system. Available 24/7 across Surrey and the Lower Mainland.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:+17788380014"
              className="btn-call-highlight inline-flex items-center justify-center gap-2 rounded-xl py-4 px-8 text-base font-bold w-full sm:w-auto"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call 778-838-0014
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-xl text-base border border-white/25 transition-all duration-200 w-full sm:w-auto"
            >
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

              {/* H2: Need a Battery Boost? */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Need a Battery Boost?</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  A dead or discharged battery is one of the most common roadside problems drivers face —
                  and it usually strikes at the worst possible moment. Common situations that lead to a
                  battery boost call include:
                </p>
                <ul className="space-y-3 mb-4">
                  {[
                    { title: "Vehicle will not start",       body: "You turn the key or press the start button and nothing happens — or the engine turns over slowly and fails to fire." },
                    { title: "Lights were left on",          body: "Interior lights, headlights, or accessories left running while the engine is off drain the battery, sometimes overnight." },
                    { title: "Vehicle has difficulty starting", body: "The engine cranks sluggishly or takes several attempts before starting, particularly in cold or wet weather." },
                    { title: "Battery appears dead",         body: "No dash lights, no response from accessories, no click when turning the key — the battery is fully discharged." },
                    { title: "Vehicle stranded and needs help", body: "You are stuck in a parking lot, driveway, or on the roadside and cannot get the vehicle moving without assistance." },
                  ].map((item) => (
                    <li key={item.title} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-amber-400/20 border border-amber-400 flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
                        <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5"><path d="M2 6l3 3 5-5" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                      <div>
                        <p className="font-bold text-navy-900 text-sm mb-0.5">{item.title}</p>
                        <p className="text-slate-600 text-sm leading-relaxed">{item.body}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="text-slate-600 leading-relaxed">
                  Call <a href="tel:+17788380014" className="font-semibold text-amber-600 hover:text-amber-700">(778) 838-0014</a> and
                  describe your situation. A dispatcher will confirm your location and send the appropriate help.
                </p>
              </div>

              {/* H2: Battery Boost Service */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Battery Boost Service</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Our battery boost service is an on-site jump start using professional equipment —
                  not improvised jumper cables from a passing motorist. A technician connects a
                  professional-grade booster to your battery and starts the vehicle safely, following
                  the correct sequence to protect the vehicle&apos;s electronics.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Getting the engine running is only the first step. Once started, the technician tests
                  the battery voltage and checks the charging output with the engine running. This tells
                  you whether the battery is healthy enough to hold a charge on its own, or whether the
                  alternator is failing to replenish it. If the numbers indicate a problem, we will
                  explain what we found honestly — so you can make an informed decision about next steps
                  rather than being left to guess.
                </p>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {[
                    "Professional jump start",
                    "Battery voltage test",
                    "Charging system check",
                    "Safe boosting procedures",
                    "All vehicle makes and models",
                    "Available 24/7 including holidays",
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

              {/* H2: Signs Your Vehicle May Have a Dead Battery */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Signs Your Vehicle May Have a Dead Battery</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Batteries often give warning signs before failing completely. Recognising them early
                  can help you plan a replacement before you are stranded.
                </p>
                <ul className="space-y-3 mb-4">
                  {[
                    { sign: "Rapid clicking when turning the key",   detail: "Multiple fast clicks usually mean the battery does not have enough power to engage the starter motor." },
                    { sign: "Engine cranks slowly or will not start", detail: "A sluggish crank — the engine turns over laboriously before starting, if it starts at all — is a sign the battery is struggling." },
                    { sign: "Headlights or interior lights are dim",  detail: "A healthy battery maintains consistent voltage. Dim lights, especially when the engine is off, suggest low charge." },
                    { sign: "Battery warning light on the dashboard", detail: "This can indicate a failing battery or a fault with the charging system. Have both tested as soon as possible." },
                    { sign: "Electrical systems behaving abnormally", detail: "Infotainment resetting, windows moving slowly, or intermittent electrical faults can all point to voltage issues." },
                    { sign: "Battery is more than four years old",    detail: "Most batteries have a service life of three to five years in the Lower Mainland climate. Age alone is a reason to have it tested." },
                  ].map((item) => (
                    <li key={item.sign} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-amber-400/20 border border-amber-400 flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
                        <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5"><path d="M2 6l3 3 5-5" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                      <div>
                        <p className="font-bold text-navy-900 text-sm mb-0.5">{item.sign}</p>
                        <p className="text-slate-600 text-sm leading-relaxed">{item.detail}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-slate-500">
                  More detail:{" "}
                  <Link href="/blog/signs-car-battery-dying" className="text-amber-600 hover:underline">
                    5 Signs Your Car Battery Is Dying
                  </Link>
                </p>
              </div>

              {/* H2: Why Batteries Fail in Our Climate */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Why Batteries Fail in BC&apos;s Climate</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Coastal British Columbia is rarely severely cold, but its damp mild winters are
                  harder on batteries than many drivers expect. A lead-acid battery loses a portion of
                  its cranking power as the temperature approaches freezing, and short city trips around
                  Surrey, Langley, or Burnaby rarely give the alternator enough running time to fully
                  recharge it. If accessories are left on overnight, a battery that was only marginally
                  weak in October can refuse to start the engine by January.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Summer heat also shortens battery life — fluid evaporates and internal plates degrade
                  through warm months. The failure that strands you in winter often began the previous
                  summer. Vehicles left at Park-and-Ride lots, airport parking, or ferry terminals for
                  several days are particularly prone to draining below the threshold where a cold
                  morning start is possible.
                </p>
              </div>

              {/* H2: What Happens When You Call */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">What Happens When You Call TowingNo.1</h2>
                <ol className="space-y-4">
                  {[
                    { step: "1", title: "Call (778) 838-0014",           body: "A dispatcher answers 24/7. Tell them the vehicle will not start and describe your location — street address, nearest intersection, or parking facility name." },
                    { step: "2", title: "Location and situation confirmed", body: "We confirm your exact location and ask a few quick questions about the vehicle — make, model, and whether you can hear any response when you try to start it." },
                    { step: "3", title: "Upfront quote provided",         body: "We give you a flat-rate price for the battery boost before a technician is dispatched. You know the cost before anyone is sent." },
                    { step: "4", title: "Technician dispatched",          body: "We send the nearest available technician with appropriate equipment for the job." },
                    { step: "5", title: "Jump start performed on-site",   body: "The technician safely boosts your battery and starts the engine using professional equipment." },
                    { step: "6", title: "Battery and charging system tested", body: "After starting, the technician tests the battery voltage and charging output and tells you honestly whether the battery and alternator are in good condition or whether further action is needed." },
                  ].map((item) => (
                    <li key={item.step} className="flex items-start gap-4">
                      <span className="w-8 h-8 rounded-full bg-amber-400 text-gray-900 font-extrabold text-sm flex items-center justify-center shrink-0 mt-0.5">
                        {item.step}
                      </span>
                      <div>
                        <p className="font-bold text-navy-900 text-sm mb-0.5">{item.title}</p>
                        <p className="text-slate-600 text-sm leading-relaxed">{item.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* H2: When a Battery Boost Isn't Enough */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">When a Battery Boost Isn&apos;t Enough</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  A jump start resolves the immediate problem if the battery has enough residual capacity
                  to accept a charge and hold it. But a boost is not a permanent fix for a battery that
                  has reached the end of its service life, nor for a fault in the charging system. If
                  the battery test after the boost reveals a serious fault — a cell that will not hold
                  charge, an alternator that is not charging, or a parasitic drain that is killing the
                  battery overnight — you will need a repair shop to address the underlying issue.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  If the vehicle still cannot be started after a boost, or if the technician identifies
                  a fault that makes the vehicle unsafe to drive, we can arrange a tow to the shop or
                  dealership of your choice.
                </p>
                <div className="flex flex-wrap gap-3 text-sm">
                  <Link href="/services/emergency-towing" className="font-semibold text-amber-600 hover:text-amber-700">
                    Emergency towing →
                  </Link>
                  <Link href="/services/roadside-assistance" className="font-semibold text-amber-600 hover:text-amber-700">
                    All roadside assistance services →
                  </Link>
                </div>
              </div>

              {/* H2: Service Areas */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Battery Boost Service Areas</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  We provide battery boost and jump start service across{" "}
                  <Link href="/locations/surrey" className="font-semibold text-amber-600 hover:text-amber-700">Surrey</Link>{" "}
                  and the wider Lower Mainland — including{" "}
                  <Link href="/locations/langley" className="font-semibold text-amber-600 hover:text-amber-700">Langley</Link>,{" "}
                  <Link href="/locations/burnaby" className="font-semibold text-amber-600 hover:text-amber-700">Burnaby</Link>,{" "}
                  <Link href="/locations/delta" className="font-semibold text-amber-600 hover:text-amber-700">Delta</Link>,{" "}
                  <Link href="/locations/white-rock" className="font-semibold text-amber-600 hover:text-amber-700">White Rock</Link>,{" "}
                  <Link href="/locations/richmond" className="font-semibold text-amber-600 hover:text-amber-700">Richmond</Link>,{" "}
                  <Link href="/locations/coquitlam" className="font-semibold text-amber-600 hover:text-amber-700">Coquitlam</Link>,{" "}
                  <Link href="/locations/maple-ridge" className="font-semibold text-amber-600 hover:text-amber-700">Maple Ridge</Link>, and{" "}
                  <Link href="/locations/vancouver" className="font-semibold text-amber-600 hover:text-amber-700">Vancouver</Link>.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Whether your battery has died in a Willoughby strata parkade, outside a Surrey City
                  Centre shop, or in a Delta driveway, call us with your location and we will confirm
                  coverage and dispatch accordingly.
                </p>
              </div>

              {/* H2: FAQ */}
              <div id="faq-section">
                <h2 className="text-2xl font-extrabold text-navy-900 mb-6">Battery Boost FAQs</h2>
                <div className="space-y-4">
                  {faq.map((item) => (
                    <div key={item.q} className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                      <h3 className="font-bold text-navy-900 mb-2 text-sm">{item.q}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{item.a}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer links */}
              <div className="text-sm text-slate-600 flex flex-wrap gap-4 pt-4 border-t border-slate-100">
                <Link href="/services" className="font-semibold text-amber-600 hover:text-amber-700">All services</Link>
                <Link href="/services/roadside-assistance" className="font-semibold text-amber-600 hover:text-amber-700">Roadside assistance</Link>
                <Link href="/services/emergency-towing" className="font-semibold text-amber-600 hover:text-amber-700">Emergency towing</Link>
                <Link href="/services/flat-tire-help" className="font-semibold text-amber-600 hover:text-amber-700">Flat tire help</Link>
                <Link href="/services/lockout-service" className="font-semibold text-amber-600 hover:text-amber-700">Lockout service</Link>
                <Link href="/services/fuel-delivery" className="font-semibold text-amber-600 hover:text-amber-700">Fuel delivery</Link>
                <Link href="/services/vehicle-transport" className="font-semibold text-amber-600 hover:text-amber-700">Vehicle transport</Link>
                <Link href="/locations/surrey" className="font-semibold text-amber-600 hover:text-amber-700">Towing Surrey</Link>
                <Link href="/locations/langley" className="font-semibold text-amber-600 hover:text-amber-700">Towing Langley</Link>
                <Link href="/blog/signs-car-battery-dying" className="font-semibold text-amber-600 hover:text-amber-700">Battery warning signs</Link>
                <Link href="/contact" className="font-semibold text-amber-600 hover:text-amber-700">Request online</Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-navy-950 rounded-2xl p-6 text-white sticky top-24">
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">Available Now</p>
                <h3 className="text-xl font-extrabold mb-3">Dead Battery?</h3>
                <p className="text-slate-300 text-sm mb-5">Call for 24/7 battery boost service. Free upfront quote before dispatch.</p>
                <a
                  href="tel:+17788380014"
                  className="btn-call-highlight flex items-center justify-center gap-2 w-full rounded-xl py-3.5 px-5 text-sm font-bold"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  778-838-0014
                </a>
                <Link href="/contact" className="mt-3 flex items-center justify-center gap-2 w-full rounded-xl py-3 px-5 text-sm font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors">
                  Request Online
                </Link>
                <ul className="mt-5 space-y-2 text-xs text-slate-400">
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> Free upfront quote</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> Battery test included</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> All vehicle types</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> 24/7 including holidays</li>
                </ul>
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                <h3 className="font-bold text-navy-900 mb-3 text-sm">Related Services</h3>
                <ul className="space-y-2">
                  {[
                    { href: "/services/roadside-assistance",  label: "Roadside Assistance" },
                    { href: "/services/emergency-towing",     label: "Emergency Towing" },
                    { href: "/services/flat-tire-help",       label: "Flat Tire Help" },
                    { href: "/services/lockout-service",      label: "Lockout Service" },
                    { href: "/services/fuel-delivery",        label: "Fuel Delivery" },
                    { href: "/services/winching-extraction",  label: "Winching & Extraction" },
                    { href: "/services/vehicle-transport",    label: "Vehicle Transport" },
                    { href: "/services/accident-recovery",    label: "Accident Recovery" },
                  ].map((s) => (
                    <li key={s.href}>
                      <Link href={s.href} className="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1">
                        <ArrowIcon /> {s.label}
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
