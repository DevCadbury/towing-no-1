import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { faqPageSchema, type FaqItem } from "@/lib/faq";
import { serviceAreaCompact } from "@/lib/service-areas";

export const metadata: Metadata = {
  title: {
    absolute: "Fuel Delivery | 24/7 Roadside Assistance | TowingNo.1",
  },
  description:
    "Stranded with an empty tank in Surrey or the Lower Mainland? TowingNo.1 provides 24/7 emergency fuel delivery to your location. Call 778-838-0014.",
  alternates: { canonical: "https://www.towingno1.com/services/fuel-delivery" },
  keywords: [],
  openGraph: {
    type: "website",
    url: "https://www.towingno1.com/services/fuel-delivery",
    title: "Fuel Delivery | 24/7 Roadside Assistance | TowingNo.1",
    description:
      "24/7 emergency fuel delivery in Surrey and the Lower Mainland. Stranded with an empty tank? We bring fuel to your location. Call 778-838-0014.",
    images: [{ url: "/image/Fuel_Deliver.png", alt: "Emergency fuel delivery — fuel delivered to a stranded driver" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fuel Delivery | 24/7 Roadside Assistance | TowingNo.1",
    description:
      "24/7 emergency fuel delivery across Surrey and the Lower Mainland. We bring fuel to you. Call 778-838-0014.",
    images: ["/image/Fuel_Deliver.png"],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.towingno1.com/services/fuel-delivery#service",
  name: "Emergency Fuel Delivery",
  serviceType: "Fuel Delivery",
  description:
    "24/7 emergency fuel delivery across Surrey and the Lower Mainland. Fuel delivered directly to your location so you can reach the nearest station.",
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
    q: "Do you provide emergency fuel delivery 24/7?",
    a: "Yes. TowingNo.1 provides fuel delivery assistance 24 hours a day, 7 days a week — including evenings, weekends, and all statutory holidays. Call (778) 838-0014 at any hour and a dispatcher will answer, confirm your location, and arrange fuel delivery.",
  },
  {
    q: "What should I do if I run out of fuel on the highway?",
    a: "If you feel the engine surge or lose power on a highway, ease onto the shoulder while you still have momentum rather than waiting for a complete stall in a live lane. Switch on your hazard lights, stay in the vehicle if the shoulder is narrow or traffic is heavy, and call (778) 838-0014 with your exact location — nearest exit, kilometre marker, or direction of travel. Do not walk along a busy highway shoulder to reach a distant fuel station.",
  },
  {
    q: "Can you deliver fuel to a stranded vehicle?",
    a: "Yes. We deliver fuel to your location — whether that is on a highway shoulder, in a parking lot, on a residential street, or in another accessible location across Surrey and the Lower Mainland. Tell the dispatcher where you are and confirm the fuel type your vehicle requires.",
  },
  {
    q: "What areas do you serve for fuel delivery?",
    a: "We provide fuel delivery across Surrey, Langley, Burnaby, Delta, White Rock, Richmond, Coquitlam, Maple Ridge, Vancouver, and the wider Lower Mainland. Call (778) 838-0014 and we will confirm coverage for your specific location.",
  },
  {
    q: "What if the vehicle still will not start after receiving fuel?",
    a: "If the vehicle does not start after receiving fuel, there may be a secondary issue — a dead battery, a diesel fuel system that needs priming after running completely dry, or another mechanical fault. Our driver can assess the situation and assist where possible. If a tow is required, we can arrange that as a separate service.",
  },
  {
    q: "When would I need towing instead of fuel delivery?",
    a: "Fuel delivery resolves the problem when the vehicle ran out of fuel and has no other issue preventing it from being driven. If the vehicle still cannot be started after receiving fuel, if there is a mechanical fault unrelated to the fuel level, or if the vehicle is in an unsafe location that cannot be addressed with a fuel delivery, a tow may be the appropriate next step.",
  },
];
const faqSchema = faqPageSchema(faq);

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",          item: "https://www.towingno1.com" },
    { "@type": "ListItem", position: 2, name: "Services",      item: "https://www.towingno1.com/services" },
    { "@type": "ListItem", position: 3, name: "Fuel Delivery", item: "https://www.towingno1.com/services/fuel-delivery" },
  ],
};

function ArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
      <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
    </svg>
  );
}

function Check() {
  return (
    <span className="w-5 h-5 rounded-full bg-amber-400/20 border border-amber-400 flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
      <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5">
        <path d="M2 6l3 3 5-5" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function FuelDeliveryPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950 pt-[76px]">
        <Image
          src="/image/Fuel_Deliver.png"
          alt="Emergency fuel delivery — fuel delivered to a stranded driver at the roadside"
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
              <li className="text-amber-400">Fuel Delivery</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-3">24/7 Service</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            24/7 Emergency Fuel Delivery
          </h1>
          <p className="text-white/80 text-lg max-w-xl mb-8">
            Stranded with an empty tank? TowingNo.1 delivers fuel to your location across Surrey and
            the Lower Mainland around the clock so you can reach the nearest station. Upfront pricing,
            immediate dispatch.
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

              {/* H2: Ran Out of Fuel? */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Ran Out of Fuel?</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Running out of fuel is a more common roadside situation than most drivers expect —
                  and it can happen at the worst possible time and place. A misread fuel gauge, a faulty
                  sender unit, an unexpected detour, or simply misjudging the distance to the next
                  station can leave a vehicle stranded and unable to continue.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Situations that typically require fuel delivery assistance include:
                </p>
                <ul className="space-y-3 mb-4">
                  {[
                    { title: "Vehicle ran out of fuel",              body: "The engine has stalled or is losing power because the tank is empty. The vehicle cannot be driven to a fuel station." },
                    { title: "Unable to safely reach a fuel station", body: "The nearest station is too far to walk safely, especially on a highway, in darkness, or in poor weather." },
                    { title: "Vehicle stranded at the roadside",     body: "The vehicle has coasted to a stop on a shoulder, in a parking lot, or on a residential street and cannot be moved without fuel." },
                    { title: "Fuel-related breakdown",               body: "The engine surged or stalled and the fuel gauge is reading very low or empty, suggesting a fuel starvation issue rather than a mechanical fault." },
                  ].map((item) => (
                    <li key={item.title} className="flex items-start gap-3">
                      <Check />
                      <div>
                        <p className="font-bold text-navy-900 text-sm mb-0.5">{item.title}</p>
                        <p className="text-slate-600 text-sm leading-relaxed">{item.body}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="text-slate-600 leading-relaxed">
                  Call <a href="tel:+17788380014" className="font-semibold text-amber-600 hover:text-amber-700">(778) 838-0014</a> and
                  give the dispatcher your location and the type of fuel your vehicle uses.
                </p>
              </div>

              {/* H2: How Fuel Delivery Assistance Works */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">How Fuel Delivery Assistance Works</h2>
                <p className="text-slate-600 leading-relaxed mb-5">
                  Fuel delivery is a straightforward service: we bring enough fuel to your location to
                  get the vehicle to the nearest station where you can fill the tank properly.
                </p>
                <ol className="space-y-4 mb-5">
                  {[
                    { step: "1", title: "Call (778) 838-0014",                    body: "A dispatcher answers 24/7. Tell them you have run out of fuel and give your location." },
                    { step: "2", title: "Location and fuel type confirmed",        body: "We ask for your exact location and confirm the type of fuel your vehicle requires — gasoline or diesel. Confirming the fuel type is essential: putting the wrong fuel into a vehicle can cause serious engine damage." },
                    { step: "3", title: "Upfront quote provided",                 body: "We give you a flat-rate price before dispatch. You know the cost before any driver is sent." },
                    { step: "4", title: "Fuel delivery arranged",                 body: "We send the nearest available driver to your location with the confirmed fuel type." },
                    { step: "5", title: "Fuel delivered to your vehicle",         body: "The driver delivers fuel at the roadside and confirms the correct quantity has been added. For a diesel that has run completely dry, the fuel line may need priming before the engine will start — the driver can assist with this." },
                    { step: "6", title: "Vehicle continues when safely possible", body: "Once fuel has been added and the engine starts, you are free to drive to the nearest station to fill the tank properly. If the vehicle does not start, we can assess whether additional assistance is needed." },
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
                <ul className="grid sm:grid-cols-2 gap-3">
                  {[
                    "Fuel delivered to your location",
                    "Gasoline and diesel available",
                    "Highway and roadside delivery",
                    "Upfront flat-rate pricing",
                    "Diesel line priming if needed",
                    "Available 24/7 including holidays",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-slate-700">
                      <Check /> {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* H2: Gasoline and Diesel */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Gasoline and Diesel — Why the Fuel Type Matters</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Confirming the correct fuel type before delivery is not a formality — it is essential.
                  Even a small amount of gasoline added to a diesel fuel system can damage the injection
                  pump and require a costly flush and repair. We confirm whether your vehicle takes
                  gasoline or diesel when you call and before any fuel is delivered.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Most passenger cars and SUVs in Canada run on gasoline. Diesel is common in pickup
                  trucks, commercial vans, and some passenger vehicles — usually identified by a green
                  fuel cap or a &quot;Diesel Only&quot; label near the filler neck. If you are
                  uncertain, check the owner&apos;s manual or the label inside the fuel door before
                  calling. Our dispatcher will also help you confirm if needed.
                </p>
              </div>

              {/* H2: What To Do When You Run Out of Fuel */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">What To Do When You Run Out of Fuel</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Running out of fuel on a busy road can be dangerous. These steps will help you reach
                  a safe position and get help:
                </p>
                <ol className="space-y-4 mb-4">
                  {[
                    { step: "1", title: "Move to a safe location when possible",       body: "If you feel the engine losing power, steer toward the shoulder, a lay-by, or a parking area while you still have momentum. Do not brake suddenly in a live lane." },
                    { step: "2", title: "Switch on your hazard lights",                body: "Do this as soon as the vehicle stops moving. Hazard lights warn other drivers that your vehicle is stationary." },
                    { step: "3", title: "Stay with the vehicle on busy roads",         body: "On a highway or any road with fast-moving traffic, it is generally safer to remain inside the vehicle with your seatbelt on than to walk along the shoulder to a distant fuel station." },
                    { step: "4", title: "Provide an accurate location when calling",   body: "The more precise your location, the faster help arrives. Note the nearest exit number, kilometre marker, street name, or business nearby. If you are unsure, your phone's location sharing can help." },
                    { step: "5", title: "Wait in a safe place",                        body: "If you have exited the vehicle, wait on the passenger side away from traffic — behind a barrier or guardrail where one is available. Keep hazard lights running until the driver arrives." },
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
                <p className="text-slate-600 text-sm leading-relaxed">
                  Coasting to empty is also harder on the vehicle than most drivers realise. The fuel
                  pump is cooled by the fuel flowing past it, so running the tank dry repeatedly can
                  shorten its lifespan. Sediment that settles at the bottom of the tank is also more
                  likely to reach the fuel filter when the level gets very low.
                </p>
              </div>

              {/* H2: When Fuel Delivery Is Not Enough */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">When Fuel Delivery Is Not Enough</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Fuel delivery resolves the problem when the vehicle ran out of fuel and has no other
                  issue preventing it from being driven. There are situations where fuel alone cannot
                  get the vehicle moving again:
                </p>
                <ul className="space-y-3 mb-5">
                  {[
                    { title: "Vehicle still will not start",     body: "If the engine does not start after receiving fuel, a secondary issue is present — a dead battery, a mechanical fault, or a diesel fuel system that requires professional priming after running completely dry." },
                    { title: "Mechanical issue present",         body: "A warning light, unusual noise, or other symptom present before the fuel ran out suggests the vehicle has a mechanical problem that needs a workshop rather than just fuel." },
                    { title: "Unsafe roadside location",         body: "If the vehicle is in a position that cannot be safely occupied while waiting for fuel delivery, recovery and towing may be the more appropriate response." },
                    { title: "Vehicle cannot safely continue",   body: "If the vehicle has other damage — a flat tyre, collision damage, or another fault — that was not caused by the empty tank, a tow is needed in addition to or instead of fuel delivery." },
                  ].map((item) => (
                    <li key={item.title} className="flex items-start gap-3">
                      <Check />
                      <div>
                        <p className="font-bold text-navy-900 text-sm mb-0.5">{item.title}</p>
                        <p className="text-slate-600 text-sm leading-relaxed">{item.body}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3 text-sm">
                  <Link href="/services/emergency-towing" className="font-semibold text-amber-600 hover:text-amber-700">Emergency towing →</Link>
                  <Link href="/services/roadside-assistance" className="font-semibold text-amber-600 hover:text-amber-700">All roadside assistance →</Link>
                </div>
              </div>

              {/* H2: Service Areas */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Fuel Delivery in Surrey and Nearby Areas</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  We provide fuel delivery across{" "}
                  <Link href="/locations/surrey" className="font-semibold text-amber-600 hover:text-amber-700">Surrey</Link> and
                  the wider Lower Mainland including{" "}
                  <Link href="/locations/langley" className="font-semibold text-amber-600 hover:text-amber-700">Langley</Link>,{" "}
                  <Link href="/locations/burnaby" className="font-semibold text-amber-600 hover:text-amber-700">Burnaby</Link>,{" "}
                  <Link href="/locations/delta" className="font-semibold text-amber-600 hover:text-amber-700">Delta</Link>,{" "}
                  <Link href="/locations/white-rock" className="font-semibold text-amber-600 hover:text-amber-700">White Rock</Link>,{" "}
                  <Link href="/locations/richmond" className="font-semibold text-amber-600 hover:text-amber-700">Richmond</Link>,{" "}
                  <Link href="/locations/coquitlam" className="font-semibold text-amber-600 hover:text-amber-700">Coquitlam</Link>, and{" "}
                  <Link href="/locations/vancouver" className="font-semibold text-amber-600 hover:text-amber-700">Vancouver</Link>.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  We deliver fuel to highway shoulders, parking lots, residential streets, and other
                  accessible roadside locations. Call (778) 838-0014 and we will confirm coverage for
                  your specific location.
                </p>
              </div>

              {/* H2: What Happens When You Call */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">What Happens When You Call TowingNo.1</h2>
                <p className="text-slate-600 leading-relaxed mb-5">
                  The process from your call to the fuel arriving at your vehicle is straightforward:
                </p>
                <ol className="space-y-4">
                  {[
                    { step: "1", title: "Call (778) 838-0014",                   body: "A dispatcher answers 24/7. Tell them you have run out of fuel." },
                    { step: "2", title: "Location and fuel type confirmed",       body: "We confirm your exact location and the fuel type your vehicle needs before arranging anything." },
                    { step: "3", title: "Upfront quote provided",                 body: "A flat-rate price is confirmed before any driver is dispatched. No surprises on arrival." },
                    { step: "4", title: "Driver dispatched",                      body: "The nearest available driver with the confirmed fuel type is sent to your location." },
                    { step: "5", title: "Fuel delivered",                         body: "The driver delivers fuel, confirms the correct amount has been added, and assists with priming if the engine requires it after running dry." },
                    { step: "6", title: "Further assistance if needed",           body: "If the vehicle does not start after fuelling, or if another issue is discovered, we discuss the options — including towing if required." },
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

              {/* H2: FAQ */}
              <div id="faq-section">
                <h2 className="text-2xl font-extrabold text-navy-900 mb-6">Fuel Delivery FAQs</h2>
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
                <Link href="/services/battery-boost" className="font-semibold text-amber-600 hover:text-amber-700">Battery boost</Link>
                <Link href="/services/flat-tire-help" className="font-semibold text-amber-600 hover:text-amber-700">Flat tire help</Link>
                <Link href="/services/lockout-service" className="font-semibold text-amber-600 hover:text-amber-700">Lockout service</Link>
                <Link href="/services/accident-recovery" className="font-semibold text-amber-600 hover:text-amber-700">Accident recovery</Link>
                <Link href="/services/vehicle-transport" className="font-semibold text-amber-600 hover:text-amber-700">Vehicle transport</Link>
                <Link href="/services/winching-extraction" className="font-semibold text-amber-600 hover:text-amber-700">Winching & extraction</Link>
                <Link href="/locations/surrey" className="font-semibold text-amber-600 hover:text-amber-700">Towing Surrey</Link>
                <Link href="/locations/langley" className="font-semibold text-amber-600 hover:text-amber-700">Towing Langley</Link>
                <Link href="/contact" className="font-semibold text-amber-600 hover:text-amber-700">Request online</Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-navy-950 rounded-2xl p-6 text-white sticky top-24">
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">Available Now</p>
                <h3 className="text-xl font-extrabold mb-3">Out of Fuel?</h3>
                <p className="text-slate-300 text-sm mb-5">
                  24/7 fuel delivery across Surrey and the Lower Mainland. Free upfront quote before dispatch.
                </p>
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
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> Gasoline &amp; diesel available</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> Highway &amp; roadside delivery</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> 24/7 including holidays</li>
                </ul>
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                <h3 className="font-bold text-navy-900 mb-3 text-sm">Related Services</h3>
                <ul className="space-y-2">
                  {[
                    { href: "/services/roadside-assistance",  label: "Roadside Assistance" },
                    { href: "/services/emergency-towing",     label: "Emergency Towing" },
                    { href: "/services/battery-boost",        label: "Battery Boost" },
                    { href: "/services/flat-tire-help",       label: "Flat Tire Help" },
                    { href: "/services/lockout-service",      label: "Lockout Service" },
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
