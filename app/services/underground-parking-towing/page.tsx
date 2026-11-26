import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { faqPageSchema, type FaqItem } from "@/lib/faq";

// Owner-approved page (OWNER-ANSWERS-2026-11-25 "New page requested by the
// owner", D-098; ACTION-PLAN A-231). Copy uses only VERIFIED facts: F-34
// (underground / low-clearance towing, owner's "we specialize in it" and "low
// clearance height", "most" not "all"), F-17/F-28 (one light-duty wheel-lift
// truck), F-23 (24/7 incl. statutory holidays), F-38 (tow bill, destination of
// the customer's choice), F-13/F-19 (payment). No clearance figure (F-35
// UNVERIFIED), no price, no minute figure, no Service JSON-LD node (D-099).

export const metadata: Metadata = {
  title: {
    absolute: "Underground Parking Towing | Low Clearance | TowingNo.1",
  },
  description:
    "Stuck in an underground parkade in Surrey or the Lower Mainland? Our low-clearance tow truck reaches most parkades and garages. Call 778-838-0014.",
  alternates: { canonical: "https://www.towingno1.com/services/underground-parking-towing" },
  openGraph: {
    type: "website",
    url: "https://www.towingno1.com/services/underground-parking-towing",
    title: "Underground Parking Towing | Low Clearance | TowingNo.1",
    description:
      "Vehicle stuck in an underground parkade or parking garage? TowingNo.1 can get you out. Call 778-838-0014, day or night.",
    locale: "en_CA",
    images: [
      {
        url: "https://www.towingno1.com/preview.jpg",
        width: 1200,
        height: 630,
        alt: "TowingNo.1 wheel-lift tow truck towing a black SUV on a road",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Underground Parking Towing | Low Clearance | TowingNo.1",
    description:
      "Stuck in an underground parkade? TowingNo.1 can get you out. Call 778-838-0014, day or night.",
    images: ["https://www.towingno1.com/preview.jpg"],
  },
};

const faq: FaqItem[] = [
  {
    q: "Can your tow truck get into an underground parkade?",
    a: "Our tow truck has a low clearance height, so it can reach most low-clearance parkades and parking garages where standard tow trucks can't fit. When you call, read the dispatcher the clearance sign posted at the parkade entrance so the dispatcher can confirm the truck fits before the driver is sent.",
  },
  {
    q: "What vehicles can you tow out of a parking garage?",
    a: "We tow light-duty vehicles: cars, SUVs and light trucks. Tell the dispatcher the make, model and drive type. Many all wheel drive cars and electric vehicles should not be towed with any wheels on the ground, and the dispatcher will tell you plainly if the job does not suit our light-duty wheel-lift truck.",
  },
  {
    q: "The parkade has a gate or fob entry. What should I do?",
    a: "Arrange for someone to let the driver in. That can be you, a building manager, a concierge, the strata or the parking operator. If you can, meet the driver at the entrance and walk them down to the vehicle.",
  },
  {
    q: "Are you available at night and on statutory holidays?",
    a: "Yes. We take calls 24 hours a day, 7 days a week, including statutory holidays. Call (778) 838-0014 at any hour.",
  },
  {
    q: "Where will you take my vehicle?",
    a: "Wherever you choose: a repair shop, a dealership, your home, or another address. You receive a tow bill for your records.",
  },
  {
    q: "My car just won't start down there. Do I need a tow?",
    a: "Not always. If the problem is a dead battery, a battery boost on the spot may get the vehicle running so you can drive it out yourself. Describe the problem when you call and the dispatcher will tell you whether a boost or a tow makes sense.",
  },
];
const faqSchema = faqPageSchema(faq);

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",                       item: "https://www.towingno1.com" },
    { "@type": "ListItem", position: 2, name: "Services",                   item: "https://www.towingno1.com/services" },
    { "@type": "ListItem", position: 3, name: "Underground Parking Towing", item: "https://www.towingno1.com/services/underground-parking-towing" },
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

function Check() {
  return (
    <span className="w-5 h-5 rounded-full bg-amber-400/20 border border-amber-400 flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
      <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5"><path d="M2 6l3 3 5-5" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </span>
  );
}

export default function UndergroundParkingTowingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950 pt-[76px]">
        <Image
          src="/background_home.png"
          alt="TowingNo.1 wheel-lift tow truck towing a black SUV on a road"
          width={1500}
          height={837}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
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
              <li className="text-amber-400">Underground Parking Towing</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-3">Low-Clearance Towing</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Underground Parking &amp; Low-Clearance Towing
          </h1>
          <p className="text-white/80 text-lg max-w-xl mb-8">
            Stuck in underground parking? We can get you out. Is your vehicle stuck in an underground
            parkade? Don&apos;t worry, we specialize in it.
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

              {/* H2: The problem */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Stuck in Underground Parking? We Can Get You Out</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  A car that dies on the lowest level of a condo or office parkade is harder to move than
                  one stranded at the curb. It may sit behind a gate, at the bottom of a curved ramp, between
                  concrete pillars, under pipes and ducts. Pushing it up the ramp is unsafe, and many tow
                  companies simply cannot bring a truck down to it.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  This is the job we specialize in. Our tow truck has a low clearance height, so it can reach
                  most low-clearance parkades and parking garages where standard tow trucks can&apos;t fit. The
                  driver brings the truck down to your vehicle, lifts it with the wheel lift, and tows it up
                  and out to the place you choose.
                </p>
              </div>

              {/* Illustrative image (img-02) */}
              <figure className="rounded-2xl overflow-hidden">
                <Image
                  src="/image/generated/underground-parkade-entrance.webp"
                  alt="Entrance ramp to an underground parkade with a low overhead clearance bar"
                  width={1600}
                  height={900}
                  className="w-full h-auto"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              </figure>

              {/* H2: Why standard trucks can't get in */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Why Standard Tow Trucks Can&apos;t Get In</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Underground parking is built for passenger vehicles, not service trucks. Several things
                  stop an ordinary tow truck at the entrance:
                </p>
                <ul className="space-y-3">
                  {[
                    { title: "Posted height limits", body: "Most parkades hang a clearance bar or sign at the entrance. A truck that is taller than the posted limit cannot go in without hitting the bar, the ceiling or the sprinkler lines." },
                    { title: "Low points inside the garage", body: "Ceilings often drop further at beams, ducts, signs and door frames deeper inside, so a truck that clears the entrance can still get stuck lower down." },
                    { title: "Steep and curved ramps", body: "Spiral ramps and sharp turns between levels are hard for long vehicles, and the break-over point at the top or bottom of a ramp can catch a truck's frame." },
                    { title: "Tight aisles and pillars", body: "Narrow drive aisles and closely spaced columns leave little room to position a truck behind a parked vehicle and lift it." },
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
              </div>

              {/* H2: What to do */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">What to Do If Your Vehicle Is Stuck Underground</h2>
                <ol className="space-y-4">
                  {[
                    { step: "1", title: "Stay safe and leave the car where it is", body: "Switch on the hazard lights. Do not try to push or roll the vehicle up a ramp, and keep clear of moving traffic in the aisle." },
                    { step: "2", title: "Note exactly where you are", body: "Write down the building address, the entrance you used, the parking level and the stall number. Underground there is often no phone signal, so walk up to street level to call if you need to." },
                    { step: "3", title: "Read the clearance sign", body: "Look for the height limit posted at the parkade entrance and note it exactly as written." },
                    { step: "4", title: "Sort out access", body: "If the parkade has a gate, fob or ticket entry, arrange for someone to let the driver in, or plan to meet the driver at the entrance." },
                    { step: "5", title: "Call (778) 838-0014", body: "Give the dispatcher the details below. Keep your keys and parking ticket with you." },
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

              {/* H2: What to tell dispatch */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">What to Tell the Dispatcher</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  A parkade tow goes smoothly when the driver knows the layout before arriving. When you call,
                  have this ready:
                </p>
                <ul className="grid sm:grid-cols-2 gap-3 mb-4">
                  {[
                    "Building address and which entrance",
                    "Parking level and stall number",
                    "The clearance sign at the entrance",
                    "Gate, fob or ticket access details",
                    "Vehicle make, model and drive type",
                    "Whether it rolls, steers and brakes",
                    "Where the keys are",
                    "Where you want the vehicle taken",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <Check /> {item}
                    </li>
                  ))}
                </ul>
                <p className="text-slate-600 leading-relaxed">
                  These details help the driver plan the tow. If the vehicle is jammed against a wall or pillar,
                  or sits in a spot the truck cannot reach, say so: the dispatcher will tell you plainly what can
                  be done.
                </p>
              </div>

              {/* H2: Vehicles covered */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Vehicles We Tow Out of Parkades</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Our truck is a light-duty wheel-lift tow truck, so this service covers light-duty vehicles
                  only: cars, SUVs and light trucks. Many all wheel drive cars and electric vehicles should not
                  be towed with any wheels on the ground, so give the dispatcher the make, model and drive type,
                  and ask before the driver is sent if you are unsure.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  If the car simply has a dead battery, a{" "}
                  <Link href="/services/battery-boost" className="font-semibold text-amber-600 hover:text-amber-700">battery boost</Link>{" "}
                  on the spot may get you driving out on your own, and a{" "}
                  <Link href="/services/lockout-service" className="font-semibold text-amber-600 hover:text-amber-700">lockout service</Link>{" "}
                  call handles keys locked inside.
                </p>
              </div>

              {/* H2: After the tow */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">After Your Vehicle Is Out</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Once the vehicle is up at street level, we tow it wherever you want it to go: a repair shop,
                  a dealership, your home, or another address. You receive a tow bill for your records, and you
                  pay the driver directly by cash, credit card, debit card, contactless, Apple Pay or Google Pay.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  We take calls 24 hours a day, 7 days a week, including statutory holidays, from condo towers,
                  strata buildings, shopping-centre garages and office parkades across{" "}
                  <Link href="/locations/surrey" className="font-semibold text-amber-600 hover:text-amber-700">Surrey</Link>,{" "}
                  <Link href="/locations/vancouver" className="font-semibold text-amber-600 hover:text-amber-700">Vancouver</Link>,{" "}
                  <Link href="/locations/burnaby" className="font-semibold text-amber-600 hover:text-amber-700">Burnaby</Link>,{" "}
                  <Link href="/locations/richmond" className="font-semibold text-amber-600 hover:text-amber-700">Richmond</Link>{" "}
                  and the rest of the Lower Mainland.
                </p>
              </div>

              {/* H2: FAQ */}
              <div id="faq-section">
                <h2 className="text-2xl font-extrabold text-navy-900 mb-6">Underground Parking Towing FAQs</h2>
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
                <Link href="/services/vehicle-transport" className="font-semibold text-amber-600 hover:text-amber-700">Vehicle transport</Link>
                <Link href="/services/battery-boost" className="font-semibold text-amber-600 hover:text-amber-700">Battery boost</Link>
                <Link href="/locations/vancouver" className="font-semibold text-amber-600 hover:text-amber-700">Towing Vancouver</Link>
                <Link href="/locations/surrey" className="font-semibold text-amber-600 hover:text-amber-700">Towing Surrey</Link>
                <Link href="/contact" className="font-semibold text-amber-600 hover:text-amber-700">Request online</Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-navy-950 rounded-2xl p-6 text-white sticky top-24">
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">Available Now</p>
                <h3 className="text-xl font-extrabold mb-3">Stuck Underground?</h3>
                <p className="text-slate-300 text-sm mb-5">Call with the building address, the level and the clearance sign at the entrance.</p>
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
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> Low-clearance tow truck</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> Cars, SUVs &amp; light trucks</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> Tow to the destination you choose</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> Open day and night, including statutory holidays</li>
                </ul>
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                <h3 className="font-bold text-navy-900 mb-3 text-sm">Related Services</h3>
                <ul className="space-y-2">
                  {[
                    { href: "/services/emergency-towing",     label: "Emergency Towing" },
                    { href: "/services/battery-boost",        label: "Battery Boost" },
                    { href: "/services/lockout-service",      label: "Lockout Service" },
                    { href: "/services/vehicle-transport",    label: "Vehicle Transport" },
                    { href: "/services/accident-recovery",    label: "Accident Recovery" },
                    { href: "/services/roadside-assistance",  label: "Roadside Assistance" },
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
