import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { faqPageSchema, type FaqItem } from "@/lib/faq";
import { serviceAreaCompact } from "@/lib/service-areas";

export const metadata: Metadata = {
  title: {
    absolute: "Roadside Assistance | 24/7 Help | TowingNo.1",
  },
  description:
    "24/7 roadside assistance in Surrey and the Lower Mainland. Battery boost, flat tire help, lockout service, fuel delivery and breakdown assistance. Call 778-838-0014.",
  alternates: {
    canonical: "https://www.towingno1.com/services/roadside-assistance",
  },
  keywords: [],
  openGraph: {
    type: "website",
    url: "https://www.towingno1.com/services/roadside-assistance",
    title: "Roadside Assistance | 24/7 Help | TowingNo.1",
    description:
      "24/7 roadside assistance in Surrey and the Lower Mainland. Battery boost, flat tire, lockout service, fuel delivery and breakdown help. Call 778-838-0014.",
    images: [{ url: "/image/Battery_Boost.png", alt: "Roadside assistance service — TowingNo.1 technician helping a stranded driver" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Roadside Assistance | 24/7 Help | TowingNo.1",
    description:
      "24/7 roadside assistance across Surrey and the Lower Mainland. Battery boost, flat tire, lockout, fuel delivery. Call 778-838-0014.",
    images: ["/image/Battery_Boost.png"],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.towingno1.com/services/roadside-assistance#service",
  name: "Roadside Assistance",
  serviceType: "Roadside Assistance",
  description:
    "24/7 on-site roadside assistance across Surrey and the Lower Mainland. Battery boost, flat tire help, lockout service, fuel delivery, and breakdown support.",
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
    q: "Do you provide 24/7 roadside assistance?",
    a: "Yes. TowingNo.1 provides roadside assistance 24 hours a day, 7 days a week — including evenings, weekends, and all statutory holidays. Call (778) 838-0014 at any hour and a dispatcher will answer, confirm your situation, and send the appropriate help.",
  },
  {
    q: "Can you help with a dead battery?",
    a: "Yes. A battery boost and jump-start is one of our most common roadside calls. We dispatch a technician to your location, safely jump-start the vehicle, and then test the battery and charging system to let you know whether a replacement is needed. If the vehicle still cannot be driven after a boost, we can arrange a tow.",
  },
  {
    q: "Can you help if I lock my keys in my car?",
    a: "Yes. Our lockout technicians open your vehicle using professional tools without damaging the door, lock, or window. We cover all makes and models, including modern keyless-entry vehicles, across Surrey and the Lower Mainland.",
  },
  {
    q: "Do you provide flat tire assistance?",
    a: "Yes. If you have a usable spare, we fit it on-site. If you have no spare, or the tire damage is beyond a roadside fix, we tow you to the nearest open tire shop. We cover highway shoulders and parking lots across the Lower Mainland.",
  },
  {
    q: "Can you bring fuel if my vehicle runs out?",
    a: "Yes. We deliver enough gasoline or diesel to get you to the nearest station. Tell the dispatcher which type of fuel your vehicle uses and your exact location, and we'll deliver directly to you.",
  },
  {
    q: "What areas do you serve for roadside assistance?",
    a: "We provide roadside assistance across Surrey, Langley, Burnaby, Richmond, Delta, White Rock, Coquitlam, Maple Ridge, Vancouver, and the wider Lower Mainland. Call (778) 838-0014 and we'll confirm coverage for your location.",
  },
  {
    q: "When will I need a tow instead of roadside assistance?",
    a: "If the problem cannot be resolved on the spot — for example, the vehicle has serious mechanical damage, won't start after a boost, has a non-repairable tire, or is unsafe to drive — we arrange a tow to a repair shop or other destination. Towing is only suggested when genuinely necessary; we always try to resolve the issue on-site first.",
  },
];
const faqSchema = faqPageSchema(faq);

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",                item: "https://www.towingno1.com" },
    { "@type": "ListItem", position: 2, name: "Services",            item: "https://www.towingno1.com/services" },
    { "@type": "ListItem", position: 3, name: "Roadside Assistance", item: "https://www.towingno1.com/services/roadside-assistance" },
  ],
};

export default function RoadsideAssistancePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950 pt-[76px]">
        <Image
          src="/image/Battery_Boost.png"
          alt="Roadside assistance service — technician helping a stranded driver in the Lower Mainland"
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
              <li className="text-amber-400">Roadside Assistance</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-3">24/7 On-Site Help</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            24/7 Roadside Assistance Service
          </h1>
          <p className="text-white/80 text-lg max-w-xl mb-8">
            Battery boost, flat tire help, car lockout, fuel delivery, and breakdown support across Surrey
            and the Lower Mainland. We fix the problem on the spot whenever possible — a tow is arranged
            only when genuinely needed.
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

              {/* H2: When You Need Roadside Help */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Roadside Assistance When Your Vehicle Is Disabled</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Roadside assistance is on-site help for a vehicle that cannot be driven right now but
                  may not need to be towed. A dead battery, a flat tire with a usable spare, a lockout,
                  or an empty fuel tank are all situations where the right technician and the right
                  equipment can get you moving again without a tow truck.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  The distinction from emergency towing matters practically. When you call TowingNo.1,
                  the dispatcher asks a few quick questions about what has happened, confirms your location,
                  and sends the most appropriate help — a technician with a boost pack, a tire technician,
                  or a lockout specialist. A tow is arranged when on-site repair genuinely cannot resolve
                  the issue.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  We provide roadside assistance 24 hours a day across Surrey and the Lower Mainland,
                  including evenings, weekends, and all statutory holidays. Call{" "}
                  <a href="tel:+17788380014" className="font-semibold text-amber-600 hover:text-amber-700">(778) 838-0014</a>{" "}
                  and we will tell you exactly what we can do for your situation before we send anyone.
                </p>
              </div>

              {/* H2: Roadside Assistance Services */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Roadside Assistance Services</h2>
                <p className="text-slate-600 leading-relaxed mb-5">
                  Every service below is available on-site — our aim is always to resolve the problem
                  where you are. Towing is only arranged when on-site assistance cannot get you safely
                  back on the road.
                </p>
                <div className="space-y-4">
                  {[
                    {
                      href: "/services/battery-boost",
                      title: "Battery Boost & Jump-Start",
                      body: "A dead battery is one of the most common roadside calls we handle. We jump-start your vehicle using professional equipment and then test the battery and charging system. If the battery is failing, we tell you plainly so you can plan a replacement on your own schedule. If the vehicle still won't start after a boost, we arrange a tow.",
                    },
                    {
                      href: "/services/flat-tire-help",
                      title: "Flat Tire Assistance",
                      body: "If you have a usable spare, we fit it on-site — correctly torqued, safely positioned, and ready to drive. If there is no spare or the tire damage goes beyond what a roadside change can fix, we tow you to the nearest open tire shop rather than leaving you stranded.",
                    },
                    {
                      href: "/services/lockout-service",
                      title: "Vehicle Lockout Service",
                      body: "We open locked vehicles without causing damage to the door, lock, glass, or weatherstripping using professional lockout tools. This covers all makes and models, including modern push-button and keyless-entry vehicles where the fob battery has died.",
                    },
                    {
                      href: "/services/fuel-delivery",
                      title: "Fuel Delivery",
                      body: "If you have run out of fuel, we deliver enough gasoline or diesel to get you to the nearest station to fill up properly. Tell us your fuel type and exact location and we will come to you — no need to walk to a station or leave the vehicle unattended.",
                    },
                    {
                      href: "/services/winching-extraction",
                      title: "Winching & Extraction",
                      body: "A vehicle stuck in a ditch, soft shoulder, mud, or snow bank needs proper winching equipment. We use controlled tension from rated anchor points to bring the vehicle back onto firm ground without causing further damage. Once recovered, we check whether it can be driven or needs a tow.",
                    },
                    {
                      href: "/services/emergency-towing",
                      title: "Towing When On-Site Help Is Not Enough",
                      body: "Sometimes a roadside visit reveals that the vehicle cannot safely be driven — mechanical damage, a fault that cannot be fixed on a shoulder, or a situation that needs a repair shop. In those cases we arrange a tow to the destination of your choice, with the same upfront flat-rate pricing.",
                    },
                  ].map((item) => (
                    <div key={item.href} className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                      <h3 className="font-bold text-navy-900 text-sm mb-2">
                        <Link href={item.href} className="hover:text-amber-600 transition-colors">
                          {item.title}
                        </Link>
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* H2: Service area */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Roadside Assistance in Surrey and Nearby Areas</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Our roadside assistance covers{" "}
                  <Link href="/locations/surrey" className="font-semibold text-amber-600 hover:text-amber-700">Surrey</Link>{" "}
                  and the wider Lower Mainland as a whole. We respond to calls in{" "}
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
                  Whether you are in a strata parkade in Willoughby, on a Highway 1 shoulder near the
                  200th Street interchange, on King George Boulevard through Surrey City Centre, or parked
                  outside a shop in Fort Langley — call us with your location and we will confirm coverage
                  and dispatch accordingly.
                </p>
              </div>

              {/* H2: Common situations */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Common Situations We Help With</h2>
                <ul className="space-y-4">
                  {[
                    {
                      title: "Dead or weak battery",
                      body: "The most frequent single-service call we handle. Symptoms include a slow or clicking engine, dim lights, or a vehicle that simply will not respond. A professional boost and system test can usually resolve this on the spot.",
                    },
                    {
                      title: "Flat tire",
                      body: "Whether from a nail, a curb impact, or sudden air loss, a flat tire that leaves the vehicle sitting on the rim needs immediate attention. We fit your spare on-site or, if there is no spare, tow you to a shop rather than leaving you exposed on a shoulder.",
                    },
                    {
                      title: "Locked keys inside the vehicle",
                      body: "A lockout can happen in any parking lot, at any hour. We open the vehicle without damaging it — no coat hangers, no broken weatherstripping, no scratched paint.",
                    },
                    {
                      title: "Empty fuel tank",
                      body: "Running out of fuel happens. We bring enough to get you to the nearest station — no need to abandon the vehicle or walk along a busy road.",
                    },
                    {
                      title: "Vehicle breakdown",
                      body: "If the vehicle has stopped working for a reason you cannot identify, or if warning lights are on, we can attend and assess. If a roadside fix is possible, we carry it out. If it is not, we arrange transport to a qualified mechanic.",
                    },
                    {
                      title: "Vehicle that cannot safely continue",
                      body: "Strange noises, steering problems, overheating, or a mechanical issue that makes driving the vehicle risky — these call for a proper assessment before continuing. We attend, assess honestly, and advise whether a tow is the right next step.",
                    },
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
              </div>

              {/* H2: What Happens When You Call */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">What Happens When You Call TowingNo.1</h2>
                <p className="text-slate-600 leading-relaxed mb-5">
                  The process from your call to the moment the problem is resolved is straightforward.
                </p>
                <ol className="space-y-4">
                  {[
                    { step: "1", title: "Call (778) 838-0014", body: "A dispatcher answers 24/7. No automated menus — a person takes your call and listens to what has happened." },
                    { step: "2", title: "Location and situation confirmed", body: "We ask where you are — the nearest intersection, parking lot, or highway exit — and what has happened with the vehicle. This determines what we send." },
                    { step: "3", title: "Upfront quote provided", body: "We give you a flat-rate price for the service before anyone is dispatched. You know exactly what the visit will cost before we send a truck." },
                    { step: "4", title: "Appropriate help is dispatched", body: "We send the right technician and equipment for your specific situation — a battery technician, tire specialist, lockout operative, fuel delivery driver, or tow truck depending on what you need." },
                    { step: "5", title: "On-site assistance is provided", body: "The technician arrives, handles the service, and keeps you informed throughout. If the on-site fix is successful, you are back on the road. If additional help is required, we discuss the options with you directly." },
                    { step: "6", title: "Towing arranged if needed", body: "If the vehicle cannot be made safe to drive at the roadside — after an honest assessment, not a guess — we arrange a tow to the repair shop, dealership, or location of your choice." },
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
                <h2 className="text-2xl font-extrabold text-navy-900 mb-6">Roadside Assistance FAQs</h2>
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
                <Link href="/services/emergency-towing" className="font-semibold text-amber-600 hover:text-amber-700">Emergency towing</Link>
                <Link href="/services/battery-boost" className="font-semibold text-amber-600 hover:text-amber-700">Battery boost</Link>
                <Link href="/services/flat-tire-help" className="font-semibold text-amber-600 hover:text-amber-700">Flat tire help</Link>
                <Link href="/services/lockout-service" className="font-semibold text-amber-600 hover:text-amber-700">Lockout service</Link>
                <Link href="/services/fuel-delivery" className="font-semibold text-amber-600 hover:text-amber-700">Fuel delivery</Link>
                <Link href="/services/accident-recovery" className="font-semibold text-amber-600 hover:text-amber-700">Accident recovery</Link>
                <Link href="/services/vehicle-transport" className="font-semibold text-amber-600 hover:text-amber-700">Vehicle transport</Link>
                <Link href="/locations/surrey" className="font-semibold text-amber-600 hover:text-amber-700">Towing Surrey</Link>
                <Link href="/locations/langley" className="font-semibold text-amber-600 hover:text-amber-700">Towing Langley</Link>
                <Link href="/contact" className="font-semibold text-amber-600 hover:text-amber-700">Request online</Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-navy-950 rounded-2xl p-6 text-white sticky top-24">
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">Available Now</p>
                <h3 className="text-xl font-extrabold mb-3">Need Roadside Help?</h3>
                <p className="text-slate-300 text-sm mb-5">
                  24/7 roadside assistance across Surrey and the Lower Mainland. Free upfront quote before dispatch.
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
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> Flat-rate — no hidden fees</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> Licensed &amp; insured in BC</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> 24/7 including holidays</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> On-site fix whenever possible</li>
                </ul>
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                <h3 className="font-bold text-navy-900 mb-3 text-sm">Related Services</h3>
                <ul className="space-y-2">
                  {[
                    { href: "/services/battery-boost",      label: "Battery Boost" },
                    { href: "/services/flat-tire-help",     label: "Flat Tire Help" },
                    { href: "/services/lockout-service",    label: "Lockout Service" },
                    { href: "/services/fuel-delivery",      label: "Fuel Delivery" },
                    { href: "/services/winching-extraction",label: "Winching & Extraction" },
                    { href: "/services/emergency-towing",   label: "Emergency Towing" },
                    { href: "/services/accident-recovery",  label: "Accident Recovery" },
                    { href: "/services/vehicle-transport",  label: "Vehicle Transport" },
                  ].map((s) => (
                    <li key={s.href}>
                      <Link href={s.href} className="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
                          <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                        </svg>
                        {s.label}
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
