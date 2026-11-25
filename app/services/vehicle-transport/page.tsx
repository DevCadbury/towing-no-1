import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { faqPageSchema, type FaqItem } from "@/lib/faq";

export const metadata: Metadata = {
  title: {
    absolute: "Vehicle Transport | Car Transport Service | TowingNo.1",
  },
  description:
    "Vehicle transport and car transport service in Surrey, BC. TowingNo.1 moves vehicles whether or not they run. Call 778-838-0014.",
  alternates: { canonical: "https://www.towingno1.com/services/vehicle-transport" },
  openGraph: {
    type: "website",
    url: "https://www.towingno1.com/services/vehicle-transport",
    title: "Vehicle Transport | Car Transport Service | TowingNo.1",
    description:
      "Vehicle transport and car transport from TowingNo.1 in Surrey, BC, whether or not the vehicle runs. Call 778-838-0014.",
    locale: "en_CA",
    images: [{ url: "/image/Vehicle_Transpor.png", alt: "Vehicle transport service: car being loaded for transport" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vehicle Transport | Car Transport Service | TowingNo.1",
    description:
      "Vehicle transport and car transport from TowingNo.1 in Surrey, BC, whether or not the vehicle runs. Call 778-838-0014.",
    images: ["/image/Vehicle_Transpor.png"],
  },
};

// Service JSON-LD node removed: register F-07 UNVERIFIED, areaServed F-06
// UNVERIFIED (D-013, D-016; ACTION-PLAN A-004, A-005).

const faq: FaqItem[] = [
  {
    q: "Can you transport a vehicle that does not run?",
    a: "Yes. Vehicles that don't run can be lifted with the wheel lift and towed, so the car does not need to start or drive. Let us know the vehicle's condition when you call so the right kind of tow is arranged.",
  },
  {
    q: "Can you transport a damaged vehicle after an accident?",
    a: "Yes. We transport collision damaged vehicles and vehicles that can't be driven to the repair shop, body shop, dealership, or address of your choice. See our accident recovery service for more detail.",
  },
  {
    q: "Where can you transport my vehicle?",
    a: "We transport vehicles to repair shops, dealerships, body shops, private addresses, and auction lots within our service area, and we provide long-distance towing within British Columbia. Call (778) 838-0014 with the pickup and destination addresses to arrange the move.",
  },
  {
    q: "Do you provide local vehicle transport?",
    a: "Yes. Many transport requests are short local moves: a vehicle from a driveway to a nearby shop, a car that doesn't run from a parking lot to a mechanic, or a purchased vehicle from a seller's address to your home. Call (778) 838-0014 to ask about timing for your move.",
  },
  {
    q: "What information do you need for a vehicle transport request?",
    a: "When you call, let us know the pickup location, the delivery destination, the vehicle's make and model, whether the vehicle runs and can steer and brake, and any known access limitations at pickup or delivery. This helps the driver plan the tow.",
  },
  {
    q: "When should I request vehicle transport instead of roadside assistance?",
    a: "Roadside assistance is for situations where the vehicle can potentially be fixed on the spot, such as a flat tyre, dead battery, lockout, or empty fuel tank. Vehicle transport is the right service when the vehicle needs to be moved to a different location because it cannot be driven safely, needs workshop attention, or the situation is planned rather than an emergency breakdown.",
  },
];
const faqSchema = faqPageSchema(faq);

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",              item: "https://www.towingno1.com" },
    { "@type": "ListItem", position: 2, name: "Services",          item: "https://www.towingno1.com/services" },
    { "@type": "ListItem", position: 3, name: "Vehicle Transport", item: "https://www.towingno1.com/services/vehicle-transport" },
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

export default function VehicleTransportPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950 pt-[76px]">
        <Image
          src="/image/Vehicle_Transpor.png"
          alt="Vehicle transport service: car being loaded safely for transport across the Lower Mainland"
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
              <li className="text-amber-400">Vehicle Transport</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-3">Secure Transport</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Vehicle Transport Service
          </h1>
          <p className="text-white/80 text-lg max-w-xl mb-8">
            Need a vehicle moved across Surrey or the Lower Mainland? TowingNo.1 transports vehicles that run
            and vehicles that don't to the destination you choose, including repair shops, dealerships,
            private addresses, and more.
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

              {/* H2: Vehicle Transport for Cars and Other Vehicles */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Vehicle Transport for Cars and Other Vehicles</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Vehicle transport is the service of moving a vehicle from one location to another,
                  either because it cannot be driven, because it should not be driven, or simply because
                  driving it is impractical for the situation. Unlike emergency towing, which is a
                  response to a sudden breakdown or collision, vehicle transport is often a planned or
                  partly planned move with a confirmed pickup and a chosen destination.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  TowingNo.1 provides vehicle transport across Surrey and the Lower Mainland for a
                  range of vehicles and situations, using a light-duty wheel-lift tow truck for cars, SUVs
                  and light trucks, whether or not they run. We also provide long-distance towing within
                  British Columbia: call with the pickup address and the destination.
                </p>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {[
                    "Vehicles that run or don't",
                    "Cars, SUVs and light trucks",
                    "Long-distance towing within BC",
                    "Classic and collector cars",
                    "Dealership and auction transfers",
                    "Light commercial vehicles",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-slate-700">
                      <Check /> {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* H2: When You May Need Vehicle Transport */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">When You May Need Vehicle Transport</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Vehicle transport is the right choice in a variety of situations:
                </p>
                <div className="space-y-4">
                  {[
                    {
                      title: "Vehicle that doesn't run",
                      body: "A vehicle that will not start, cannot steer, or cannot roll under its own power needs to be lifted and towed rather than driven. We move these vehicles from driveways, parking lots, and other accessible locations.",
                    },
                    {
                      title: "Vehicle recovered after an accident",
                      body: "A collision damaged vehicle that cannot be driven safely should be transported to a repair shop or storage facility rather than being driven further. See our accident recovery service for situations after a collision.",
                    },
                    {
                      title: "Moving a vehicle to a repair facility",
                      body: "If your vehicle has a mechanical issue that makes driving it to a workshop risky (a fault that could worsen in transit, or a warning light you are unsure about), transporting rather than driving it is the safer option.",
                    },
                    {
                      title: "Vehicle that should not be driven",
                      body: "A vehicle awaiting a specific repair, a vehicle with expired or no insurance, or a classic car that is not in daily use but needs to move between locations all suit transport rather than driving.",
                    },
                    {
                      title: "Local vehicle relocation",
                      body: "Buying a car that doesn't run from a private seller, moving a project car to a different storage location, or relocating a vehicle without adding mileage are planned transport jobs that can be booked in advance.",
                    },
                    {
                      title: "Dealership and auction transfers",
                      body: "Moving a purchased vehicle from a dealership or auction to the owner, or transferring a traded in vehicle between lots across the Lower Mainland.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                      <h3 className="font-bold text-navy-900 text-sm mb-2">{item.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* H2: Vehicle Transport vs Emergency Towing */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Vehicle Transport vs. Emergency Towing</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  The terms are often used interchangeably, but there is a practical distinction worth
                  understanding before you call:
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mb-5">
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                    <p className="font-bold text-navy-900 text-sm mb-2">Emergency towing</p>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      An unplanned, urgent response to a breakdown on a highway shoulder, a vehicle
                      after a collision, or a roadside situation that needs immediate attention. Speed
                      of response is the priority.
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                    <p className="font-bold text-navy-900 text-sm mb-2">Vehicle transport</p>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      A planned or partly planned move, such as transporting a car that doesn&apos;t run from a driveway,
                      moving a purchased vehicle, or relocating a car that needs workshop attention.
                      A confirmed pickup time and destination are agreed in advance.
                    </p>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Both services are available by
                  calling (778) 838-0014. If you are uncertain which applies to your situation, describe
                  what you need and the dispatcher will direct you to the appropriate service.
                </p>
                <div className="flex flex-wrap gap-3 text-sm">
                  <Link href="/services/emergency-towing" className="font-semibold text-amber-600 hover:text-amber-700">Emergency towing →</Link>
                  <Link href="/services/accident-recovery" className="font-semibold text-amber-600 hover:text-amber-700">Accident recovery →</Link>
                </div>
              </div>

              {/* H2: Secure Loading and Tie-Down */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Secure Loading and Strapping</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  How a vehicle is secured for transport matters as much as the distance travelled.
                  Our wheel lift cradles one pair of wheels and lifts that end of the vehicle, and wheel
                  straps hold the tyres in the cradle rather than putting tension through the suspension
                  or body panels. Some vehicles need extra care: many all wheel drive cars and electric
                  vehicles should not be towed with any wheels turning on the road, and lowered or
                  classic cars may need a careful plan. Tell the dispatcher the make, drive type and
                  condition, and you will be told plainly if the move does not suit a light-duty
                  wheel-lift truck.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Before the truck moves, the driver checks every strap and confirms nothing can shift.
                  Secure strapping is the most important factor in delivering a vehicle in the same
                  condition it was picked up.
                </p>
                <p className="mt-4 text-sm text-slate-500">
                  See: <Link href="/blog/electric-vehicle-towing-bc" className="text-amber-600 hover:underline">EV and hybrid vehicle towing: why flatbed transport is required and how Transport Mode works</Link>
                </p>
              </div>

              {/* H2: How Vehicle Transport Works */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">How Vehicle Transport Works</h2>
                <ol className="space-y-4">
                  {[
                    { step: "1", title: "Call (778) 838-0014",                   body: "A dispatcher answers 24/7. Tell them you need vehicle transport and give the basic details." },
                    { step: "2", title: "Provide vehicle location and destination", body: "We need the full address or location of the pickup and the delivery destination so we can confirm coverage and quote the transport." },
                    { step: "3", title: "Describe the vehicle and its condition", body: "Let us know the make, model, whether the vehicle runs and can steer and brake, and any access limitations at pickup or delivery. This helps the driver plan the tow." },
                    { step: "4", title: "Quote, wherever possible",              body: "Wherever possible we give you a flat rate quote before we dispatch, based on the location, vehicle, and service you describe. If conditions on site differ materially, the driver explains any change before going ahead." },
                    { step: "5", title: "Transport arranged",                    body: "The driver loads the vehicle safely using the correct method for its condition and transports it to the agreed destination." },
                    { step: "6", title: "Vehicle delivered",                     body: "The vehicle is delivered to the destination, secured until unloading, and handed over. If plans change en route, let the driver know." },
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

              {/* H2: Service Areas */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Vehicle Transport in Surrey and Nearby Areas</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  We provide vehicle transport across{" "}
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
                  Call (778) 838-0014 to confirm coverage for your specific pickup and delivery
                  locations before booking.
                </p>
                <p className="text-slate-600 leading-relaxed mt-4">
                  Need a vehicle moved between Canada and the U.S.? See our{" "}
                  <Link href="/services/cross-border-towing" className="font-semibold text-amber-600 hover:text-amber-700">cross border towing</Link>{" "}
                  page.
                </p>
              </div>

              {/* H2: What Information To Have Ready */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">What Information To Have Ready</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Having the following details ready when you call makes the quoting and booking
                  process straightforward:
                </p>
                <ul className="space-y-3">
                  {[
                    { title: "Pickup location",                    body: "The full address or location where the vehicle currently is, including any access limitations (narrow driveway, underground parking, gated property)." },
                    { title: "Delivery destination",               body: "The full address of where the vehicle needs to go, such as a repair shop, dealership, private address, or storage facility." },
                    { title: "Vehicle make and model",             body: "This helps the driver plan the tow and check for any specific handling requirements." },
                    { title: "Whether the vehicle runs",           body: "Can the engine start? Can the vehicle steer and brake? A vehicle that doesn't run is lifted and towed rather than driven." },
                    { title: "Any known damage or access issues",  body: "Collision damage, missing wheels, a seized steering column, or other conditions that affect how the vehicle can be loaded." },
                    { title: "Preferred pickup window",            body: "For planned transport, a preferred date and time window helps us schedule the pickup." },
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

              {/* H2: FAQ */}
              <div id="faq-section">
                <h2 className="text-2xl font-extrabold text-navy-900 mb-6">Vehicle Transport FAQs</h2>
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
                <Link href="/services/roadside-assistance" className="font-semibold text-amber-600 hover:text-amber-700">Roadside assistance</Link>
                <Link href="/services/accident-recovery" className="font-semibold text-amber-600 hover:text-amber-700">Accident recovery</Link>
                <Link href="/services/winching-extraction" className="font-semibold text-amber-600 hover:text-amber-700">Winching & extraction</Link>
                <Link href="/services/battery-boost" className="font-semibold text-amber-600 hover:text-amber-700">Battery boost</Link>
                <Link href="/services/flat-tire-help" className="font-semibold text-amber-600 hover:text-amber-700">Flat tire help</Link>
                <Link href="/services/lockout-service" className="font-semibold text-amber-600 hover:text-amber-700">Lockout service</Link>
                <Link href="/services/fuel-delivery" className="font-semibold text-amber-600 hover:text-amber-700">Fuel delivery</Link>
                <Link href="/services/cross-border-towing" className="font-semibold text-amber-600 hover:text-amber-700">Cross border towing</Link>
                <Link href="/locations/surrey" className="font-semibold text-amber-600 hover:text-amber-700">Towing Surrey</Link>
                <Link href="/locations/langley" className="font-semibold text-amber-600 hover:text-amber-700">Towing Langley</Link>
                <Link href="/contact" className="font-semibold text-amber-600 hover:text-amber-700">Request online</Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-navy-950 rounded-2xl p-6 text-white sticky top-24">
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">Get a Quote</p>
                <h3 className="text-xl font-extrabold mb-3">Need Vehicle Transport?</h3>
                <p className="text-slate-300 text-sm mb-5">
                  Call for a free quote wherever possible, before dispatch. We take transport calls 24/7.
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
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> Light-duty wheel-lift towing</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> Whether or not it runs</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> Free quote wherever possible</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> Nearest available driver</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> 24/7 availability</li>
                </ul>
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                <h3 className="font-bold text-navy-900 mb-3 text-sm">Related Services</h3>
                <ul className="space-y-2">
                  {[
                    { href: "/services/emergency-towing",    label: "Emergency Towing" },
                    { href: "/services/accident-recovery",   label: "Accident Recovery" },
                    { href: "/services/winching-extraction", label: "Winching & Extraction" },
                    { href: "/services/roadside-assistance", label: "Roadside Assistance" },
                    { href: "/services/battery-boost",       label: "Battery Boost" },
                    { href: "/services/flat-tire-help",      label: "Flat Tire Help" },
                    { href: "/services/lockout-service",     label: "Lockout Service" },
                    { href: "/services/fuel-delivery",       label: "Fuel Delivery" },
                    { href: "/services/cross-border-towing", label: "Cross Border Towing" },
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
