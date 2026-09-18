import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { faqPageSchema, type FaqItem } from "@/lib/faq";
import { serviceAreaCompact } from "@/lib/service-areas";

export const metadata: Metadata = {
  title: {
    absolute: "Vehicle Transport | Car Transport Service | TowingNo.1",
  },
  description:
    "Vehicle transport and car transport service in Surrey and the Lower Mainland. TowingNo.1 moves running and non-running vehicles safely. Call 778-838-0014.",
  alternates: { canonical: "https://www.towingno1.com/services/vehicle-transport" },
  keywords: [],
  openGraph: {
    type: "website",
    url: "https://www.towingno1.com/services/vehicle-transport",
    title: "Vehicle Transport | Car Transport Service | TowingNo.1",
    description:
      "Vehicle transport and car transport across Surrey and the Lower Mainland. Running and non-running vehicles. Call 778-838-0014.",
    images: [{ url: "/image/Vehicle_Transpor.png", alt: "Vehicle transport service — car being loaded for transport" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vehicle Transport | Car Transport Service | TowingNo.1",
    description:
      "Vehicle transport and car transport across Surrey and the Lower Mainland. Running and non-running vehicles. Call 778-838-0014.",
    images: ["/image/Vehicle_Transpor.png"],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.towingno1.com/services/vehicle-transport#service",
  name: "Vehicle Transport Service",
  serviceType: "Vehicle Transport",
  description:
    "Vehicle transport and car transport service across Surrey and the Lower Mainland. Running and non-running vehicles moved safely to any destination.",
  provider: { "@id": "https://www.towingno1.com/#localbusiness" },
  areaServed: serviceAreaCompact,
  offers: {
    "@type": "Offer",
    priceCurrency: "CAD",
    priceSpecification: {
      "@type": "PriceSpecification",
      description: "Flat-rate pricing based on vehicle and distance. Call (778) 838-0014 for an upfront quote before dispatch.",
    },
  },
};

const faq: FaqItem[] = [
  {
    q: "Can you transport a vehicle that does not run?",
    a: "Yes. Non-running vehicles are loaded onto a flatbed using our onboard winch — the car does not need to start, steer, or brake. Let us know the vehicle's condition when you call so we can bring the right equipment.",
  },
  {
    q: "Can you transport a damaged vehicle after an accident?",
    a: "Yes. We transport collision-damaged and non-driveable vehicles to the repair shop, body shop, dealership, or storage facility of your choice across the Lower Mainland. See our accident recovery service for more detail.",
  },
  {
    q: "Where can you transport my vehicle?",
    a: "We transport vehicles to any destination across Surrey and the Lower Mainland — repair shops, dealerships, body shops, storage facilities, private addresses, and auction lots within our service area. Call (778) 838-0014 to confirm coverage for your specific pickup and delivery locations.",
  },
  {
    q: "Do you provide local vehicle transport?",
    a: "Yes. Many transport requests are short local moves — a vehicle from a driveway to a nearby shop, a non-runner from a parking lot to a mechanic, or a purchased vehicle from a seller's address to your home. We handle scheduled same-day and advance-booked transport within the Lower Mainland.",
  },
  {
    q: "What information do you need for a vehicle transport request?",
    a: "When you call, let us know the pickup location, the delivery destination, the vehicle's make and model, whether the vehicle runs and can steer and brake, and any known access limitations at pickup or delivery. This helps us send the correct truck with the appropriate equipment.",
  },
  {
    q: "When should I request vehicle transport instead of roadside assistance?",
    a: "Roadside assistance is for situations where the vehicle can potentially be fixed on the spot — a flat tyre, dead battery, lockout, or empty fuel tank. Vehicle transport is the right service when the vehicle needs to be moved to a different location because it cannot be driven safely, needs workshop attention, or the situation is planned rather than an emergency breakdown.",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950 pt-[76px]">
        <Image
          src="/image/Vehicle_Transpor.png"
          alt="Vehicle transport service — car being loaded safely for transport across the Lower Mainland"
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
              <li className="text-amber-400">Vehicle Transport</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-3">Secure Transport</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Vehicle Transport Service
          </h1>
          <p className="text-white/80 text-lg max-w-xl mb-8">
            Need a vehicle moved across Surrey or the Lower Mainland? TowingNo.1 transports running
            and non-running vehicles safely to the destination you choose — repair shops, dealerships,
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
                  Vehicle transport is the service of moving a vehicle from one location to another —
                  either because it cannot be driven, because it should not be driven, or simply because
                  driving it is impractical for the situation. Unlike emergency towing, which is a
                  response to a sudden breakdown or collision, vehicle transport is often a planned or
                  semi-planned move with a confirmed pickup and a chosen destination.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  TowingNo.1 provides vehicle transport across Surrey and the Lower Mainland for a
                  range of vehicle types and situations. We use flatbed trucks as the primary transport
                  method, which keeps the vehicle fully off the ground and is suitable for both running
                  and non-running vehicles.
                </p>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {[
                    "Running and non-running vehicles",
                    "Cars, SUVs, and trucks",
                    "Electric vehicles",
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
                      title: "Non-running vehicle",
                      body: "A vehicle that will not start, cannot steer, or cannot roll under its own power needs to be loaded using a winch and transported on a flatbed. We handle non-runners from driveways, parking lots, and other accessible locations.",
                    },
                    {
                      title: "Vehicle recovered after an accident",
                      body: "A collision-damaged vehicle that cannot be driven safely should be transported to a repair shop or storage facility rather than being driven further. See our accident recovery service for post-collision situations.",
                    },
                    {
                      title: "Moving a vehicle to a repair facility",
                      body: "If your vehicle has a mechanical issue that makes driving it to a workshop risky — a fault that could worsen in transit, a warning light you are unsure about — transporting rather than driving it is the safer option.",
                    },
                    {
                      title: "Vehicle that should not be driven",
                      body: "A vehicle awaiting a specific repair, a vehicle with expired or no insurance, or a classic car that is not in daily use but needs to move between locations — these all suit transport rather than driving.",
                    },
                    {
                      title: "Local vehicle relocation",
                      body: "Buying a non-runner from a private seller, moving a project car to a different storage location, or relocating a vehicle without adding mileage — these are planned transport jobs that can be booked in advance.",
                    },
                    {
                      title: "Dealership and auction transfers",
                      body: "Moving a purchased vehicle from a dealership or auction to the owner, or transferring a trade-in between lots across the Lower Mainland.",
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
                      An unplanned, urgent response — a breakdown on a highway shoulder, a vehicle
                      after a collision, or a roadside situation that needs immediate attention. Speed
                      of response is the priority.
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                    <p className="font-bold text-navy-900 text-sm mb-2">Vehicle transport</p>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      A planned or semi-planned move — transporting a non-runner from a driveway,
                      moving a purchased vehicle, or relocating a car that needs workshop attention.
                      A confirmed pickup time and destination are agreed in advance.
                    </p>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Both services use similar equipment — flatbed trucks — and both are available by
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
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Secure Loading and Tie-Down</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  How a vehicle is secured for transport matters as much as the distance travelled.
                  We load onto a flatbed so the vehicle rides level rather than nose-down, then anchor
                  it with wheel straps that hold the tyres to the deck rather than putting tension
                  through the suspension or body panels. This approach protects lowered cars, electric
                  vehicles with sensitive battery trays, and classic vehicles with older paint and trim
                  alike.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Before the truck moves, we walk the load, check every strap, and confirm nothing can
                  shift. A secure tie-down is the most important factor in delivering a vehicle in the
                  same condition it was picked up. Non-running vehicles that cannot roll onto the deck
                  are loaded using the onboard winch, attaching to rated frame points rather than
                  bumpers or tow eyes that may not be designed for recovery loads.
                </p>
              </div>

              {/* H2: How Vehicle Transport Works */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">How Vehicle Transport Works</h2>
                <ol className="space-y-4">
                  {[
                    { step: "1", title: "Call (778) 838-0014",                   body: "A dispatcher answers 24/7. Tell them you need vehicle transport and give the basic details." },
                    { step: "2", title: "Provide vehicle location and destination", body: "We need the full address or location of the pickup and the delivery destination so we can confirm coverage and quote the transport." },
                    { step: "3", title: "Describe the vehicle and its condition", body: "Let us know the make, model, whether the vehicle runs and can steer and brake, and any access limitations at pickup or delivery. This determines the right truck and equipment." },
                    { step: "4", title: "Upfront quote confirmed",               body: "We provide a flat-rate price based on the vehicle and the distance involved, confirmed before dispatch. No meter, no surprise charges on arrival." },
                    { step: "5", title: "Transport arranged",                    body: "We dispatch the appropriate truck, load the vehicle safely using the correct method for its condition, and transport it to the agreed destination." },
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
                    { title: "Delivery destination",               body: "The full address of where the vehicle needs to go — repair shop, dealership, private address, or storage facility." },
                    { title: "Vehicle make and model",             body: "This helps us determine the right truck and equipment and check for any specific handling requirements." },
                    { title: "Whether the vehicle runs",           body: "Can the engine start? Can the vehicle steer and brake? A non-running vehicle requires winch-loading rather than driving onto the flatbed." },
                    { title: "Any known damage or access issues",  body: "Collision damage, missing wheels, a seized steering column, or other conditions that affect how the vehicle can be loaded." },
                    { title: "Preferred pickup window",            body: "For planned transport, a preferred date and time window helps us schedule the appropriate truck." },
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
                  Call for an upfront flat-rate quote. We transport vehicles 24/7 across the Lower Mainland.
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
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> Flatbed trucks</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> Running &amp; non-running</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> Upfront flat-rate pricing</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> Licensed &amp; insured in BC</li>
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
