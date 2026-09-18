import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { faqPageSchema, type FaqItem } from "@/lib/faq";
import { serviceAreaCompact } from "@/lib/service-areas";
import OfficialResources from "@/components/OfficialResources";

export const metadata: Metadata = {
  title: {
    absolute: "Accident Recovery & Towing | 24/7 Service | TowingNo.1",
  },
  description:
    "Accident recovery and towing in Surrey and the Lower Mainland. TowingNo.1 transports collision-damaged vehicles 24/7 to the shop or facility of your choice. Call 778-838-0014.",
  alternates: { canonical: "https://www.towingno1.com/services/accident-recovery" },
  keywords: [],
  openGraph: {
    type: "website",
    url: "https://www.towingno1.com/services/accident-recovery",
    title: "Accident Recovery & Towing | 24/7 Service | TowingNo.1",
    description:
      "24/7 accident recovery and towing in Surrey and the Lower Mainland. Safe transport of damaged vehicles to any shop or facility. Call 778-838-0014.",
    images: [{ url: "/image/Accident_Recover.png", alt: "Accident recovery towing — damaged vehicle being loaded onto a flatbed" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Accident Recovery & Towing | 24/7 Service | TowingNo.1",
    description:
      "24/7 accident recovery and towing across Surrey and the Lower Mainland. Safe vehicle transport to your chosen destination. Call 778-838-0014.",
    images: ["/image/Accident_Recover.png"],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.towingno1.com/services/accident-recovery#service",
  name: "Accident Recovery & Towing",
  serviceType: "Accident Recovery",
  description:
    "24/7 accident recovery and towing across Surrey and the Lower Mainland. Safe transport of collision-damaged vehicles to any repair shop, dealership, or storage facility.",
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
    q: "Do you provide towing after an accident?",
    a: "Yes. TowingNo.1 provides accident recovery and towing 24 hours a day, 7 days a week across Surrey and the Lower Mainland. Call (778) 838-0014, describe the situation and your location, and we will arrange the appropriate vehicle.",
  },
  {
    q: "Can you tow a vehicle that cannot be driven after a collision?",
    a: "Yes. A vehicle that will not roll, steer, or start after a collision is loaded onto a flatbed using our onboard winch — it does not need to move under its own power. We assess the vehicle on-site to determine the safest loading method based on the damage.",
  },
  {
    q: "Can you recover a vehicle from a roadside accident location?",
    a: "Yes. We respond to accident recovery calls on highway shoulders, at intersections, in parking lots, and at other roadside locations across the Lower Mainland. We position the recovery vehicle safely to shield the accident scene from traffic where possible.",
  },
  {
    q: "What should I do before arranging an accident tow?",
    a: "Once everyone is safe, switch on your hazard lights, move away from the vehicle if traffic conditions make it unsafe to stay inside, and call (778) 838-0014. Let the dispatcher know your exact location, whether anyone is injured, and whether the vehicle is blocking a live lane. Do not move the vehicle unless it is safe to do so and traffic conditions require it.",
  },
  {
    q: "Do you provide accident recovery 24/7?",
    a: "Yes. We operate around the clock including evenings, weekends, and all statutory holidays. Call (778) 838-0014 at any hour for accident towing and recovery.",
  },
  {
    q: "What areas do you serve for accident recovery?",
    a: "We provide accident recovery and towing across Surrey, Langley, Burnaby, Delta, White Rock, Richmond, Coquitlam, Maple Ridge, Vancouver, and the wider Lower Mainland. Call (778) 838-0014 to confirm coverage for your location.",
  },
  {
    q: "Can you transport a damaged vehicle to a specific destination?",
    a: "Yes. We deliver to the repair shop, body shop, dealership, ICBC facility, or storage yard you choose. If you have not yet decided on a destination, we can hold the vehicle securely until you and your insurer agree on next steps. We provide documentation of the recovery and drop-off.",
  },
];
const faqSchema = faqPageSchema(faq);

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",             item: "https://www.towingno1.com" },
    { "@type": "ListItem", position: 2, name: "Services",         item: "https://www.towingno1.com/services" },
    { "@type": "ListItem", position: 3, name: "Accident Recovery", item: "https://www.towingno1.com/services/accident-recovery" },
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

export default function AccidentRecoveryPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950 pt-[76px]">
        <Image
          src="/image/Accident_Recover.png"
          alt="Accident recovery towing — damaged vehicle being loaded safely onto a flatbed"
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
              <li className="text-amber-400">Accident Recovery</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-3">24/7 Service</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            24/7 Accident Recovery &amp; Towing
          </h1>
          <p className="text-white/80 text-lg max-w-xl mb-8">
            Involved in a collision? TowingNo.1 provides accident recovery and towing across Surrey
            and the Lower Mainland around the clock — transporting damaged vehicles safely to the
            repair shop, dealership, or facility you choose.
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

              {/* H2: When Your Vehicle Cannot Safely Continue */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Accident Recovery When Your Vehicle Cannot Safely Continue</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  After a collision, the most important question is whether the vehicle can be safely
                  driven. Even a collision that appears minor can cause damage that is not immediately
                  visible — bent suspension components, a cracked subframe, fluid leaks, or airbag
                  deployment that affects the vehicle&apos;s ability to protect occupants in a
                  subsequent impact.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Situations that typically require accident recovery rather than driving away include:
                </p>
                <ul className="space-y-3 mb-4">
                  {[
                    { title: "Severe collision damage",          body: "Visible structural damage, deployed airbags, a buckled chassis, or significant body damage that affects the doors, wheels, or steering." },
                    { title: "Vehicle unable to be driven",      body: "The engine will not start, the wheels are damaged, the steering is compromised, or the vehicle is stuck in its resting position after the collision." },
                    { title: "Vehicle blocking traffic",         body: "A vehicle that cannot be safely moved by driving needs to be recovered promptly to clear the road and reduce the risk of secondary incidents." },
                    { title: "Unsafe roadside location",         body: "A vehicle that has come to rest in a hazardous position — a live lane, against a guardrail, on an embankment — needs professional recovery equipment to move safely." },
                    { title: "Damage that is not immediately obvious", body: "Suspension damage, brake damage, and drivetrain faults are not always apparent from a walk-around. If there is any doubt, recovering the vehicle and having a shop inspect it is the safer choice." },
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
                  describe the situation. The dispatcher will ask about your location and the vehicle
                  condition and arrange the appropriate recovery vehicle.
                </p>
              </div>

              {/* H2: Accident Towing and Vehicle Recovery */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Accident Towing and Vehicle Recovery</h2>
                <p className="text-slate-600 leading-relaxed mb-5">
                  We provide the following services for collision-damaged and post-accident vehicles:
                </p>
                <div className="space-y-4 mb-5">
                  {[
                    {
                      title: "Collision towing",
                      body: "Towing of accident-damaged vehicles from the scene to the repair shop, body shop, dealership, ICBC facility, or storage yard of your choice. We provide documentation of the recovery and drop-off.",
                    },
                    {
                      title: "Non-driveable vehicle recovery",
                      body: "Vehicles that will not roll, steer, or start after a collision are loaded onto a flatbed using our onboard winch from rated attachment points on the frame — not damaged body panels — to avoid causing further damage during loading.",
                    },
                    {
                      title: "Safe loading of damaged vehicles",
                      body: "A damaged vehicle often cannot be loaded the same way as a running car. Bent control arms, a seized wheel, a deployed airbag, or a dragging bumper each change the approach. We assess the vehicle on-site and use the method appropriate to its condition.",
                    },
                    {
                      title: "Transport to your chosen destination",
                      body: "We deliver to any body shop, dealership, repair facility, ICBC location, or private address across the Lower Mainland. If you have not decided on a destination, we can secure the vehicle until you have.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                      <h3 className="font-bold text-navy-900 text-sm mb-2">{item.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{item.body}</p>
                    </div>
                  ))}
                </div>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {[
                    "Collision-damaged vehicle towing",
                    "Non-running and non-steering vehicles",
                    "Frame-point loading — not body panels",
                    "Delivery to any shop or facility",
                    "Recovery documentation provided",
                    "Available 24/7 including holidays",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-slate-700">
                      <Check /> {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-3 text-sm">
                  <Link href="/services/vehicle-transport" className="font-semibold text-amber-600 hover:text-amber-700">Vehicle transport →</Link>
                  <Link href="/services/winching-extraction" className="font-semibold text-amber-600 hover:text-amber-700">Winching & extraction →</Link>
                </div>
              </div>

              {/* H2: What To Do After a Vehicle Accident */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">What To Do After a Vehicle Accident</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  The steps you take in the minutes after a collision can affect your safety and the
                  safety of others on the road. The following is practical safety guidance — it is not
                  legal advice.
                </p>
                <ol className="space-y-4 mb-5">
                  {[
                    { step: "1", title: "Switch on hazard lights",               body: "Do this as soon as the vehicle stops moving. Hazard lights alert other drivers to a stationary vehicle in or near the road." },
                    { step: "2", title: "Check for injuries",                     body: "Check yourself and any passengers before getting out. Call 911 if anyone is injured or if the vehicles are blocking a live lane." },
                    { step: "3", title: "Move to a safe position if possible",    body: "If the vehicle can be driven and it is safe to do so, move it to the shoulder or a parking area. If it cannot be moved without causing further damage or risk, leave it and get to a safe position yourself." },
                    { step: "4", title: "Do not stand in active traffic",         body: "On a highway or busy road, exit on the side away from traffic and wait behind a barrier or guardrail rather than standing beside the vehicle." },
                    { step: "5", title: "Contact emergency services if required", body: "In British Columbia, call the police when someone is injured, when a vehicle cannot be driven, or when the combined damage appears to exceed the ICBC reporting threshold. You can also report online to ICBC." },
                    { step: "6", title: "Document the scene",                     body: "Photograph vehicle positions, damage, licence plates, and lane markings before anything is moved. Exchange contact and insurance details with other parties involved." },
                    { step: "7", title: "Arrange towing when needed",             body: "Once people are safe and the situation is documented, call (778) 838-0014 to arrange accident recovery if the vehicle cannot safely be driven away." },
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

                {/* Official resources */}
                <OfficialResources
                  heading="Official BC resources after a collision"
                  intro="These official B.C. resources help with reporting and next steps after an accident:"
                  items={[
                    { href: "https://www.icbc.com/claims/report-view", label: "ICBC — report a claim", note: "Report your crash online 24/7 or by phone." },
                    { href: "https://www.drivebc.ca", label: "DriveBC — road conditions & incidents", note: "Check for closures or hazards on your route." },
                  ]}
                />
              </div>

              {/* H2: When You Need an Accident Tow */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">When You Need an Accident Tow</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Not every collision results in a tow — some vehicles can be driven away after a minor
                  impact. But there are clear situations where towing is the right call:
                </p>
                <ul className="space-y-3 mb-5">
                  {[
                    { title: "Vehicle will not start or move",   body: "Engine failure, a damaged drivetrain, or a seized wheel after a collision means the vehicle cannot be driven and needs recovery." },
                    { title: "Visible structural damage",        body: "A buckled chassis, bent subframe, or significant body damage that affects wheel alignment or structural integrity." },
                    { title: "Damaged wheel or tyre",            body: "A collision that damages a wheel, rim, or tyre beyond what can be addressed with a spare requires recovery to a tyre shop or repair facility." },
                    { title: "Vehicle is unsafe to drive",       body: "Warning lights, unusual noises, pull in the steering, or any condition that suggests the vehicle cannot be operated safely." },
                    { title: "Vehicle is blocking traffic",      body: "A vehicle that cannot be moved under its own power and is creating a road hazard needs prompt professional recovery." },
                    { title: "Airbags deployed",                 body: "Deployed airbags are a strong indicator of a significant impact. The vehicle should be assessed by a shop before being driven again." },
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
                  <Link href="/services/vehicle-transport" className="font-semibold text-amber-600 hover:text-amber-700">Vehicle transport →</Link>
                </div>
              </div>

              {/* H2: Service Areas */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Accident Recovery in Surrey and Nearby Areas</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  We provide accident recovery and collision towing across{" "}
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
                  We respond to accident recovery calls on Highway 1 (Trans-Canada), Highway 99,
                  Fraser Highway, King George Boulevard, and all major Lower Mainland corridors, as
                  well as in parking lots, residential streets, and other locations.
                </p>
              </div>

              {/* H2: What Happens When You Call */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">What Happens When You Call TowingNo.1</h2>
                <ol className="space-y-4">
                  {[
                    { step: "1", title: "Call (778) 838-0014",                   body: "A dispatcher answers 24/7. Tell them you need accident recovery and give your location." },
                    { step: "2", title: "Location and situation confirmed",       body: "We ask for your exact location, a brief description of the collision and vehicle damage, and whether the vehicle is blocking traffic." },
                    { step: "3", title: "Upfront quote provided",                 body: "We give you a flat-rate price for the recovery before any truck is dispatched. You know the cost before we send anyone." },
                    { step: "4", title: "Appropriate recovery vehicle dispatched", body: "We send the nearest available driver with equipment suited to your vehicle and the collision damage described." },
                    { step: "5", title: "Vehicle assessed and loaded",            body: "The technician assesses the damage on-site to determine the safest loading method, then loads the vehicle onto the flatbed using frame attachment points." },
                    { step: "6", title: "Vehicle transported to your destination", body: "We deliver to the body shop, dealership, ICBC facility, or address you specify. We provide documentation of the recovery and drop-off." },
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
                <h2 className="text-2xl font-extrabold text-navy-900 mb-6">Accident Recovery FAQs</h2>
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
                <Link href="/services/vehicle-transport" className="font-semibold text-amber-600 hover:text-amber-700">Vehicle transport</Link>
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
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">Available Now</p>
                <h3 className="text-xl font-extrabold mb-3">Been in an Accident?</h3>
                <p className="text-slate-300 text-sm mb-5">
                  24/7 accident recovery and towing across Surrey and the Lower Mainland. Free upfront quote before dispatch.
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
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> Flatbed for damaged vehicles</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> Licensed &amp; insured in BC</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> 24/7 including holidays</li>
                </ul>
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                <h3 className="font-bold text-navy-900 mb-3 text-sm">Related Services</h3>
                <ul className="space-y-2">
                  {[
                    { href: "/services/emergency-towing",    label: "Emergency Towing" },
                    { href: "/services/vehicle-transport",   label: "Vehicle Transport" },
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
