import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { faqPageSchema, type FaqItem } from "@/lib/faq";

export const metadata: Metadata = {
  title: {
    absolute: "Emergency Towing | 24/7 Tow Truck | TowingNo.1",
  },
  description:
    "24/7 emergency towing in Surrey, BC. TowingNo.1 dispatches tow trucks for breakdowns, accidents, and disabled vehicles. Call 778-838-0014.",
  alternates: {
    canonical: "https://www.towingno1.com/services/emergency-towing",
  },
  openGraph: {
    type: "website",
    url: "https://www.towingno1.com/services/emergency-towing",
    title: "Emergency Towing | 24/7 Tow Truck | TowingNo.1",
    description:
      "24/7 emergency towing in Surrey, BC for breakdowns, accidents, and disabled vehicles. Call 778-838-0014.",
    locale: "en_CA",
    images: [{ url: "/image/Emergency_Towin.png", alt: "Emergency towing service: TowingNo.1 tow truck" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Emergency Towing | 24/7 Tow Truck | TowingNo.1",
    description: "24/7 emergency towing in Surrey, BC. Call TowingNo.1 at 778-838-0014 any time, day or night.",
    images: ["/image/Emergency_Towin.png"],
  },
};

// Service JSON-LD node removed: register F-07 UNVERIFIED, areaServed F-06
// UNVERIFIED (D-013, D-016; ACTION-PLAN A-004, A-005).

const faq: FaqItem[] = [
  {
    q: "Do you provide emergency towing 24/7?",
    a: "Yes. TowingNo.1 operates 24 hours a day, 7 days a week, including evenings and weekends. Call (778) 838-0014 at any hour and a dispatcher will answer, confirm your location, and send the nearest available driver.",
  },
  {
    q: "Can you tow a vehicle after an accident?",
    a: "Yes. We handle accident and collision recovery. Our drivers use proper securing techniques to protect your vehicle during transport. We can deliver it to the repair shop or address you choose.",
  },
  {
    q: "Can you tow a vehicle that will not start?",
    a: "Yes. A vehicle that won't run or steer can be winched onto the truck, so it does not need to move under its own power. Let the dispatcher know the vehicle cannot start or steer so the right kind of tow is arranged.",
  },
  {
    q: "Do you provide towing on highways?",
    a: "Yes. We respond to breakdowns on Highway 1 (Trans-Canada), Highway 99, the Fraser Highway, and other major highway corridors. When you call, share your direction of travel and the nearest exit number or kilometre marker. That information helps us route the nearest available driver directly to you.",
  },
  {
    q: "What areas do you serve?",
    a: "We are based in Surrey, BC. See our service areas page for the communities listed on this site, and call (778) 838-0014 to confirm coverage for your location.",
  },
  {
    q: "How do I request an emergency tow?",
    a: "Call (778) 838-0014. A dispatcher will confirm your location and vehicle situation and send the nearest available driver. You can also submit a request through our online contact form if the situation is not urgent.",
  },
];
const faqSchema = faqPageSchema(faq);

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",             item: "https://www.towingno1.com" },
    { "@type": "ListItem", position: 2, name: "Services",         item: "https://www.towingno1.com/services" },
    { "@type": "ListItem", position: 3, name: "Emergency Towing", item: "https://www.towingno1.com/services/emergency-towing" },
  ],
};

export default function EmergencyTowingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950 pt-[76px]">
        <Image
          src="/image/Emergency_Towin.png"
          alt="Emergency towing service: TowingNo.1 tow truck on a Lower Mainland road"
          fill
          className="object-cover opacity-30"
          loading="eager"
          fetchPriority="high"
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
              <li className="text-amber-400">Emergency Towing</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-3">24/7 Service</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            24/7 Emergency Towing Service
          </h1>
          <p className="text-white/80 text-lg max-w-xl mb-8">
            TowingNo.1 dispatches tow trucks across Surrey and the Lower Mainland around the clock.
            Flatbed and wheel-lift towing for cars, SUVs, trucks, and EVs. We send the nearest available driver, with a free quote wherever possible before dispatch.
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

              {/* H2: Emergency Towing When You Need Help */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Emergency Towing When You Need Help</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  An emergency tow is needed when your vehicle cannot be safely driven, whether because of a
                  breakdown, a collision, a flat tire on a live highway, a dead battery in a remote location,
                  or mechanical damage that makes continuing dangerous. The goal is always to get you and your
                  vehicle safely off the road and to a location where the problem can be properly addressed.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  TowingNo.1 handles emergency towing calls across Surrey and the Lower Mainland 24 hours a
                  day. We provide flatbed and wheel-lift towing, so the method can match your vehicle and
                  situation. When you call (778) 838-0014, a dispatcher confirms your location, asks about your
                  vehicle's condition, and sends the nearest available driver. Wherever possible we give you a
                  flat rate quote before we dispatch, based on the location, vehicle, and service you describe.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  If you are on a busy road or highway, stay in your vehicle with hazard lights on until help
                  arrives, or exit on the safe side and wait behind a barrier. Share your exact direction of
                  travel and the nearest exit or kilometre marker when you call.
                </p>
              </div>

              {/* H2: Emergency Towing Services We Provide */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Emergency Towing Services We Provide</h2>
                <p className="text-slate-600 leading-relaxed mb-5">
                  Our emergency towing covers a wide range of situations. Every job follows the same process:
                  a quote wherever possible before dispatch, the nearest available driver, and careful handling.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    {
                      title: "Breakdown Towing",
                      body: "Mechanical failure, overheating, or any situation that leaves the vehicle unable to be driven safely. We tow to the repair shop or destination of your choice.",
                    },
                    {
                      title: "Accident & Collision Towing",
                      body: "Recovery and transport of damaged vehicles from collision scenes. We secure the vehicle correctly for transport and coordinate with your insurer on where the vehicle goes.",
                    },
                    {
                      title: "Disabled Vehicle Towing",
                      body: "Vehicles that won't run or steer are winched onto a flatbed, so the car never needs to move under its own power.",
                    },
                    {
                      title: "Highway & Roadside Recovery",
                      body: "Response to breakdowns on Highway 1, Highway 99, the Fraser Highway, and other major Lower Mainland corridors. The driver positions the truck to work safely around traffic.",
                    },
                    {
                      title: "Electric Vehicle Towing",
                      body: "EVs should be transported on a flatbed and not towed with their wheels rolling. Tell the dispatcher your EV's make and model when you call.",
                    },
                    {
                      title: "Vehicle Transport",
                      body: "Transport of vehicles, whether or not they run, to a repair shop, dealership, or address across the Lower Mainland.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                      <h3 className="font-bold text-navy-900 text-sm mb-2">{item.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{item.body}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-3 text-sm">
                  <Link href="/services/accident-recovery" className="font-semibold text-amber-600 hover:text-amber-700">Accident recovery →</Link>
                  <Link href="/services/vehicle-transport" className="font-semibold text-amber-600 hover:text-amber-700">Vehicle transport →</Link>
                  <Link href="/services/winching-extraction" className="font-semibold text-amber-600 hover:text-amber-700">Winching & extraction →</Link>
                </div>
              </div>

              {/* H2: Flatbed or Wheel-Lift */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Flatbed or Wheel Lift: What Your Vehicle Needs</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Choosing the right towing method protects your vehicle and avoids damage during transport.
                  A <strong>flatbed</strong> lifts the entire vehicle completely off the road, which is the correct choice
                  for all wheel drive cars, electric vehicles, low clearance or lowered vehicles, and anything
                  with crash or drivetrain damage. A <strong>wheel lift</strong> cradles the drive wheels and lifts
                  the front or rear of the vehicle, which is efficient for short distance moves on standard
                  front wheel drive or rear wheel drive sedans.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  When you call, tell the dispatcher your vehicle's make, drive type, and whether it still
                  rolls and steers. That one detail means the correct truck arrives the first time, avoiding
                  a second callout.
                </p>
                <p className="mt-4 text-sm text-slate-500">
                  See: <Link href="/blog/understanding-towing-services" className="text-amber-600 hover:underline">Understanding the different types of towing services</Link>
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  See also: <Link href="/blog/highway-breakdown-guide-bc" className="text-amber-600 hover:underline">Highway 1 and Highway 99 breakdown guide for Lower Mainland drivers</Link>
                </p>
              </div>

              {/* H2: Service areas */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">24/7 Emergency Towing in Surrey and Nearby Areas</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Our primary towing coverage centres on <Link href="/locations/surrey" className="text-amber-600 hover:text-amber-700 font-semibold">Surrey</Link> and
                  extends across the Lower Mainland. We respond to emergency towing calls in{" "}
                  <Link href="/locations/langley" className="text-amber-600 hover:text-amber-700 font-semibold">Langley</Link>,{" "}
                  <Link href="/locations/burnaby" className="text-amber-600 hover:text-amber-700 font-semibold">Burnaby</Link>,{" "}
                  <Link href="/locations/delta" className="text-amber-600 hover:text-amber-700 font-semibold">Delta</Link>,{" "}
                  <Link href="/locations/white-rock" className="text-amber-600 hover:text-amber-700 font-semibold">White Rock</Link>,{" "}
                  <Link href="/locations/richmond" className="text-amber-600 hover:text-amber-700 font-semibold">Richmond</Link>,{" "}
                  <Link href="/locations/coquitlam" className="text-amber-600 hover:text-amber-700 font-semibold">Coquitlam</Link>,{" "}
                  <Link href="/locations/maple-ridge" className="text-amber-600 hover:text-amber-700 font-semibold">Maple Ridge</Link>, and{" "}
                  <Link href="/locations/vancouver" className="text-amber-600 hover:text-amber-700 font-semibold">Vancouver</Link>.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  We cover major highway corridors including Highway 1 (Trans-Canada), Highway 99, the Fraser
                  Highway, King George Boulevard, and the 200th Street corridor through Langley. If you are
                  unsure whether we cover your location, call (778) 838-0014 and we will confirm.
                </p>
              </div>

              {/* H2: When to call */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">When Should You Call an Emergency Tow Truck?</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  As a general rule: if driving the vehicle risks further damage, creates a safety hazard for
                  you or other road users, or is simply not possible, call for a tow. Common situations include:
                </p>
                <ul className="space-y-3">
                  {[
                    { title: "Vehicle will not start", body: "A dead battery, failed starter, or fuel issue that leaves you unable to drive. We can attempt a roadside fix first, such as a battery boost or fuel delivery, and tow only if the problem cannot be resolved on the spot." },
                    { title: "Collision or accident", body: "After any collision, even if the vehicle appears driveable, have it inspected before driving. Structural or mechanical damage is not always visible, and driving a compromised vehicle can be unsafe." },
                    { title: "Unsafe roadside breakdown", body: "If you have broken down in a location where staying with the vehicle is dangerous (a highway shoulder with heavy traffic, a dark rural road, or inside a tunnel), getting the vehicle moved quickly is the priority." },
                    { title: "Flat tire you cannot change safely", body: "A flat on a live highway shoulder, a vehicle without a spare, or a run flat tire that has exceeded its safe limit all warrant a tow rather than an improvised roadside change." },
                    { title: "Vehicle stuck or off road", body: "A vehicle in a ditch, on a soft shoulder, or embedded in mud or snow needs proper winching equipment rather than a tow strap and another vehicle. Attempting extraction without the right tools often causes more damage." },
                    { title: "Mechanical issue preventing safe driving", body: "Grinding brakes, steering problems, overheating, a seized transmission, or a check engine light can all point to a serious fault. If you are uncertain whether the vehicle is safe to drive, it is better to tow than to risk a breakdown in a worse location." },
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
                  The process is straightforward from the moment you call to the moment your vehicle is delivered.
                </p>
                <ol className="space-y-4">
                  {[
                    { step: "1", title: "You call (778) 838-0014", body: "A dispatcher answers 24/7." },
                    { step: "2", title: "Location and situation are confirmed", body: "We ask for your exact location (nearest intersection, exit number, or kilometre marker), vehicle make and model, drive type, and a brief description of what has happened." },
                    { step: "3", title: "You receive a quote, wherever possible", body: "Wherever possible we give you a flat rate quote before we dispatch, based on the location, vehicle, and service you describe. If conditions on site differ materially, the driver explains any change before going ahead." },
                    { step: "4", title: "The right truck is dispatched", body: "We send the nearest available driver with the appropriate equipment: a flatbed for EVs, AWD, and damaged vehicles, or a wheel lift for straightforward moves." },
                    { step: "5", title: "Driver arrives and assists", body: "The driver confirms your identity, loads the vehicle safely using the correct method and tie down points, and keeps you informed throughout." },
                    { step: "6", title: "Vehicle is delivered", body: "Your vehicle is transported to the repair shop, dealership, or address you specified. If your plans change en route, let the driver know." },
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

              {/* H2: Related Roadside Services */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Not Every Call Needs a Tow</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  If your vehicle can be fixed where it is (a dead battery, a flat tire with a usable spare,
                  a lockout, or an empty fuel tank), we handle those on the spot so you avoid the cost and delay
                  of a full tow. We try to fix the most common roadside problems on the spot before
                  recommending a tow.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { href: "/services/battery-boost",      label: "Battery Boost & Jump Start", desc: "Dead battery? We jump start and test on the spot." },
                    { href: "/services/flat-tire-help",      label: "Flat Tire Help",              desc: "Spare fitted on site or a tow to the nearest shop." },
                    { href: "/services/lockout-service",     label: "Car Lockout Service",         desc: "Keys locked in? We use careful entry techniques." },
                    { href: "/services/fuel-delivery",       label: "Fuel Delivery",               desc: "Gas or diesel delivered to your location." },
                    { href: "/services/winching-extraction", label: "Winching & Extraction",       desc: "Stuck in a ditch, mud, or snow? We pull you out." },
                    { href: "/services/accident-recovery",   label: "Accident Recovery",           desc: "Collision scene handling and safe transport." },
                  ].map((svc) => (
                    <Link
                      key={svc.href}
                      href={svc.href}
                      className="group flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-amber-400/60 hover:bg-amber-50/30 transition-all duration-200"
                    >
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

              {/* H2: FAQ */}
              <div id="faq-section">
                <h2 className="text-2xl font-extrabold text-navy-900 mb-6">Emergency Towing FAQs</h2>
                <div className="space-y-4">
                  {faq.map((item) => (
                    <div key={item.q} className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                      <h3 className="font-bold text-navy-900 mb-2 text-sm">{item.q}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{item.a}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Internal links footer */}
              <div className="text-sm text-slate-600 flex flex-wrap gap-4 pt-4 border-t border-slate-100">
                <Link href="/services" className="font-semibold text-amber-600 hover:text-amber-700">All towing services</Link>
                <Link href="/locations/surrey" className="font-semibold text-amber-600 hover:text-amber-700">Towing Surrey</Link>
                <Link href="/locations/langley" className="font-semibold text-amber-600 hover:text-amber-700">Towing Langley</Link>
                <Link href="/services/accident-recovery" className="font-semibold text-amber-600 hover:text-amber-700">Accident recovery</Link>
                <Link href="/services/vehicle-transport" className="font-semibold text-amber-600 hover:text-amber-700">Vehicle transport</Link>
                <Link href="/contact" className="font-semibold text-amber-600 hover:text-amber-700">Request online</Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-navy-950 rounded-2xl p-6 text-white sticky top-24">
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">Available Now</p>
                <h3 className="text-xl font-extrabold mb-3">Need a Tow Right Now?</h3>
                <p className="text-slate-300 text-sm mb-5">Call for 24/7 emergency towing. Free quote wherever possible, before dispatch.</p>
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
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> Free quote wherever possible</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> Card, debit &amp; cash at the job</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> Nearest available driver</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> 24/7 dispatch</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> Flatbed &amp; wheel-lift towing</li>
                </ul>
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                <h3 className="font-bold text-navy-900 mb-3 text-sm">Related Services</h3>
                <ul className="space-y-2">
                  {[
                    { href: "/services/accident-recovery",   label: "Accident Recovery" },
                    { href: "/services/winching-extraction", label: "Winching & Extraction" },
                    { href: "/services/vehicle-transport",   label: "Vehicle Transport" },
                    { href: "/services/battery-boost",       label: "Battery Boost" },
                    { href: "/services/lockout-service",     label: "Lockout Service" },
                    { href: "/services/flat-tire-help",      label: "Flat Tire Help" },
                    { href: "/services/fuel-delivery",       label: "Fuel Delivery" },
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
