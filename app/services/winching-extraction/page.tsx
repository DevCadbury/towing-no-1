import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { faqPageSchema, type FaqItem } from "@/lib/faq";
import { serviceAreaCompact } from "@/lib/service-areas";
import OfficialResources from "@/components/OfficialResources";

export const metadata: Metadata = {
  title: {
    absolute: "Winching & Vehicle Extraction | 24/7 | TowingNo.1",
  },
  description:
    "Vehicle stuck in a ditch, mud, or snow in Surrey or the Lower Mainland? TowingNo.1 provides 24/7 winching and vehicle extraction. Call 778-838-0014.",
  alternates: { canonical: "https://www.towingno1.com/services/winching-extraction" },
  keywords: [],
  openGraph: {
    type: "website",
    url: "https://www.towingno1.com/services/winching-extraction",
    title: "Winching & Vehicle Extraction | 24/7 | TowingNo.1",
    description:
      "24/7 winching and vehicle extraction across Surrey and the Lower Mainland. Vehicle stuck in a ditch, mud, or snow? We can help. Call 778-838-0014.",
    images: [{ url: "/image/Winching_Extractio.png", alt: "Winching and vehicle extraction service — vehicle being recovered from a ditch" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Winching & Vehicle Extraction | 24/7 | TowingNo.1",
    description:
      "24/7 winching and vehicle extraction in Surrey and the Lower Mainland. Stuck in mud, a ditch, or snow? Call 778-838-0014.",
    images: ["/image/Winching_Extractio.png"],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.towingno1.com/services/winching-extraction#service",
  name: "Winching & Vehicle Extraction",
  serviceType: "Vehicle Winching and Extraction",
  description:
    "24/7 winching and vehicle extraction across Surrey and the Lower Mainland. Recovery of vehicles stuck in ditches, mud, snow, or difficult terrain.",
  provider: { "@id": "https://www.towingno1.com/#localbusiness" },
  areaServed: serviceAreaCompact,
};

const faq: FaqItem[] = [
  {
    q: "Can you recover a vehicle stuck in mud?",
    a: "Yes. Mud and soft ground require a controlled winch pull rather than driving or towing, because spinning the wheels only digs deeper and a tow strap from another vehicle can cause frame damage. We use proper anchor points and a steady line to pull the vehicle back onto firm ground.",
  },
  {
    q: "Do you provide vehicle winching?",
    a: "Yes. We provide winching and vehicle extraction for cars, SUVs, trucks, and other vehicles across Surrey and the Lower Mainland. Call (778) 838-0014, describe the situation, and we will arrange the appropriate recovery.",
  },
  {
    q: "What should I do if my vehicle is stuck?",
    a: "Stop attempting to drive out if the wheels are spinning without traction — continued wheelspin in mud or on ice usually makes the situation worse. Switch on your hazard lights, move passengers away from the vehicle and the area where recovery equipment will be rigged, and call (778) 838-0014 with your exact location. Do not stand near tensioned recovery cables or straps during extraction.",
  },
  {
    q: "Is winching different from towing?",
    a: "Yes. Towing moves a vehicle that can be safely hitched and transported. Winching is used to extract a vehicle from a position where it cannot be moved by normal towing — stuck in a ditch, embedded in mud, or in a location where a tow truck cannot get close enough to hitch up. Winching may be followed by a tow if the vehicle cannot be driven after extraction.",
  },
  {
    q: "Can a vehicle be towed after extraction?",
    a: "Often, but not always. After extraction we assess the vehicle — if it can be started and driven safely, you are free to continue. If extraction reveals suspension damage, a flat tyre, fluid loss, or another issue that makes driving unsafe, we can arrange a tow to a repair shop.",
  },
  {
    q: "What areas do you serve for winching and extraction?",
    a: "We provide winching and vehicle extraction across Surrey, Langley, Burnaby, Delta, White Rock, Richmond, Coquitlam, Maple Ridge, Vancouver, and the wider Lower Mainland. Call (778) 838-0014 to confirm coverage for your location.",
  },
  {
    q: "When would another recovery method be needed?",
    a: "If the vehicle is in a position where winching cannot safely extract it, or if the extraction reveals that the vehicle has collision or mechanical damage that prevents it from being driven, towing or a different recovery method may be required. We assess the situation honestly and recommend the appropriate next step.",
  },
];
const faqSchema = faqPageSchema(faq);

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",                  item: "https://www.towingno1.com" },
    { "@type": "ListItem", position: 2, name: "Services",              item: "https://www.towingno1.com/services" },
    { "@type": "ListItem", position: 3, name: "Winching & Extraction", item: "https://www.towingno1.com/services/winching-extraction" },
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

export default function WinchingExtractionPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950 pt-[76px]">
        <Image
          src="/image/Winching_Extractio.png"
          alt="Winching and vehicle extraction service — vehicle being recovered from a roadside ditch"
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
              <li className="text-amber-400">Winching & Extraction</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-3">24/7 Service</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            24/7 Winching &amp; Vehicle Extraction
          </h1>
          <p className="text-white/80 text-lg max-w-xl mb-8">
            Vehicle stuck in a ditch, mud, snow, or an awkward position? TowingNo.1 provides
            professional winching and vehicle extraction across Surrey and the Lower Mainland around
            the clock — recovering the vehicle safely and assessing it before you drive away.
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

              {/* H2: Vehicle Recovery When Your Vehicle Is Stuck */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Vehicle Recovery When Your Vehicle Is Stuck</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  A vehicle that has left the road, sunk into soft ground, or become stuck in an
                  awkward position cannot always be freed by driving forward or backward — and
                  attempting to do so can make the situation worse. Wheelspin in mud drives the vehicle
                  deeper; rocking on a slope risks tipping; forcing a buried vehicle with a tow strap
                  from another car can snap the strap or bend the frame.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Situations that typically require professional winching and extraction include:
                </p>
                <ul className="space-y-3 mb-4">
                  {[
                    { title: "Vehicle stuck in a roadside ditch",   body: "A vehicle that has slid off the shoulder or clipped a curb and dropped into a ditch — particularly on a slope or at an angle — needs to be winched out from the correct direction to avoid further damage." },
                    { title: "Vehicle stuck in mud or soft ground", body: "Soft or waterlogged ground on farm roads, unpaved shoulders, or flooded areas can trap vehicles that lose traction and sink. Driving or towing out without the right technique digs deeper." },
                    { title: "Vehicle stuck in snow or ice",        body: "Heavy snow or icy conditions can trap a vehicle that has slid off the road or become unable to move. The recovery must account for the truck's own footing on the same surface." },
                    { title: "Vehicle unable to move after an incident", body: "A vehicle that has come to rest in an awkward position after a collision, off-road excursion, or other incident that left it unable to be towed normally." },
                    { title: "Vehicle requiring recovery before towing", body: "Sometimes a vehicle must be winched to a stable, accessible position before a tow truck can hook up safely. Extraction and towing are separate operations in these cases." },
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
                  describe the situation. Tell the dispatcher where you are, how the vehicle became
                  stuck, and the approximate angle or position — that information helps us send the
                  right equipment.
                </p>
              </div>

              {/* H2: Winching and Vehicle Extraction Service */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Winching and Vehicle Extraction Service</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Winching is a specific recovery technique that uses a cable and pulley system to
                  draw a stuck vehicle back onto solid, level ground. It is different from ordinary
                  towing in an important way: towing assumes the vehicle can be hitched and moved in
                  a normal direction, while winching is used when the vehicle is in a position where
                  normal hitching is not possible or safe.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mb-5">
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                    <p className="font-bold text-navy-900 text-sm mb-2">Winching / extraction</p>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Used to recover a vehicle from a ditch, mud, soft ground, or an awkward
                      position where the vehicle cannot be moved by normal means. The vehicle is
                      pulled to a stable location before any further assessment or towing.
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                    <p className="font-bold text-navy-900 text-sm mb-2">Ordinary towing</p>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Used to transport a vehicle that can be safely hitched — whether running or
                      non-running — from one location to another. Towing is the step that often
                      follows a successful extraction.
                    </p>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed mb-4">
                  After extraction, we assess whether the vehicle can be safely driven. If it can,
                  you are free to continue. If the extraction reveals damage — a flat tyre, fluid
                  loss, bent suspension — we will tell you honestly and can arrange a tow.
                </p>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {[
                    "Vehicle stuck in a ditch",
                    "Stuck in mud or soft ground",
                    "Stuck in snow or ice",
                    "Post-incident recovery",
                    "Recovery before towing",
                    "Available 24/7 including holidays",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-slate-700">
                      <Check /> {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* H2: Ditch, Mud, and Snow — Different Problems */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">When You May Need Vehicle Extraction</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Each type of stuck situation has its own characteristics that affect how recovery
                  should be approached:
                </p>
                <div className="space-y-4">
                  {[
                    {
                      title: "Ditch recovery",
                      body: "A vehicle nosed into a roadside ditch is mostly a question of angle and weight. Pulling from the wrong direction risks rolling the vehicle or tearing off a bumper, so the winch line is set to lift and draw the vehicle along the path it went in rather than dragging it sideways.",
                    },
                    {
                      title: "Mud and soft ground",
                      body: "Mud and soft farmland shoulders are about traction and suction. Spinning the wheels only digs deeper. We stop the digging, rig to firm anchor points, and use steady, controlled tension so the vehicle comes free without causing additional damage.",
                    },
                    {
                      title: "Snow and ice",
                      body: "Snow and ice add an unpredictable surface. A vehicle that has slid off a road on a slope often sits at an awkward tilt, and the recovery must account for the recovery truck keeping grip on the same surface. Controlled tension and correct rigging are essential.",
                    },
                    {
                      title: "Off-road and difficult terrain",
                      body: "A vehicle over an embankment or on uneven terrain needs the approach angle and anchor points assessed carefully before any pull begins. The wrong rigging on unstable ground can cause the vehicle to shift in an uncontrolled way.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                      <h3 className="font-bold text-navy-900 text-sm mb-2">{item.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* H2: What To Do If Your Vehicle Is Stuck */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">What To Do If Your Vehicle Is Stuck</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Before professional help arrives, a few practical steps reduce risk for you and
                  preserve options for recovery:
                </p>
                <ol className="space-y-4 mb-5">
                  {[
                    { step: "1", title: "Stop trying to drive out",              body: "If the wheels are spinning without traction, continued acceleration in mud or on ice usually makes the situation worse — the vehicle sinks deeper or slides further. Try once gently in each direction, then stop." },
                    { step: "2", title: "Switch on hazard lights",               body: "If your position is near a road or other traffic, hazard lights warn approaching drivers that your vehicle is stationary in an unusual position." },
                    { step: "3", title: "Move passengers to a safe area",        body: "Get passengers away from the vehicle and the area where recovery equipment will be rigged. Keep them well back from the recovery direction." },
                    { step: "4", title: "Do not stand near tensioned equipment", body: "During recovery, stay well clear of winch cables, straps, and anchor points. A snapped cable or failed attachment stores significant energy and can be dangerous." },
                    { step: "5", title: "Call with your exact location",          body: "Give the dispatcher your location — nearest road, intersection, or landmark — and describe how the vehicle is positioned and how it became stuck. This helps us send the right equipment on the first trip." },
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

                {/* Official resources — retained from original, placed within safety section */}
                <OfficialResources
                  heading="Winter driving & road conditions"
                  intro="Getting stuck is often a winter-conditions problem. These official B.C. resources help you plan and stay legal:"
                  items={[
                    { href: "https://www.drivebc.ca", label: "DriveBC — live road conditions", note: "Check closures, snow, and hazards before you travel." },
                    { href: "https://www.gov.bc.ca/winterdriving", label: "B.C. winter tires & chains", note: "Winter tire/chain rules apply on most routes Oct 1 – Apr 30." },
                  ]}
                />
              </div>

              {/* H2: Safety — Technique */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Technique and Safety During Recovery</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  A winch line under load stores a significant amount of energy. A snapped cable or a
                  failed anchor point can be genuinely dangerous to everyone nearby. That is why we
                  keep bystanders clear, choose rated attachment points on the frame rather than
                  body panels or bumpers not designed for recovery loads, and use a steady controlled
                  pull rather than a sudden jerk that shock-loads the rigging.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Attempting to free a stuck vehicle using a tow strap between two private vehicles
                  is one of the most common ways to cause frame damage and injuries at a recovery
                  scene. Professional equipment, used with the correct technique, recovers the vehicle
                  without creating a second problem.
                </p>
              </div>

              {/* H2: When Winching Is Not Enough */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">When Winching Is Not Enough</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  In most cases, extraction gets the vehicle back onto solid ground and the driver
                  can continue. But there are situations where additional assistance is needed:
                </p>
                <ul className="space-y-3 mb-5">
                  {[
                    { title: "Vehicle cannot be safely extracted",   body: "If the position, terrain, or damage means the vehicle cannot be safely winched without risk of causing further harm, a different recovery method or specialist equipment may be required." },
                    { title: "Mechanical or collision damage found", body: "Extraction sometimes reveals that the vehicle has a flat tyre, damaged suspension, fluid loss, or collision damage that was not apparent from outside. Driving in this condition can cause additional harm." },
                    { title: "Vehicle cannot be driven after extraction", body: "If the vehicle will not start or cannot be safely operated after recovery, a tow to a repair shop is the appropriate next step." },
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
                  <Link href="/services/accident-recovery" className="font-semibold text-amber-600 hover:text-amber-700">Accident recovery →</Link>
                  <Link href="/services/vehicle-transport" className="font-semibold text-amber-600 hover:text-amber-700">Vehicle transport →</Link>
                </div>
              </div>

              {/* H2: Service Areas */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Winching &amp; Extraction in Surrey and Nearby Areas</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  We provide winching and vehicle extraction across{" "}
                  <Link href="/locations/surrey" className="font-semibold text-amber-600 hover:text-amber-700">Surrey</Link> and
                  the wider Lower Mainland including{" "}
                  <Link href="/locations/langley" className="font-semibold text-amber-600 hover:text-amber-700">Langley</Link>,{" "}
                  <Link href="/locations/burnaby" className="font-semibold text-amber-600 hover:text-amber-700">Burnaby</Link>,{" "}
                  <Link href="/locations/delta" className="font-semibold text-amber-600 hover:text-amber-700">Delta</Link>,{" "}
                  <Link href="/locations/coquitlam" className="font-semibold text-amber-600 hover:text-amber-700">Coquitlam</Link>,{" "}
                  <Link href="/locations/maple-ridge" className="font-semibold text-amber-600 hover:text-amber-700">Maple Ridge</Link>, and{" "}
                  <Link href="/locations/vancouver" className="font-semibold text-amber-600 hover:text-amber-700">Vancouver</Link>.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  We respond to extraction calls on highway shoulders, rural roads, farm tracks, and
                  other accessible locations. Call (778) 838-0014 to confirm coverage for your
                  specific location.
                </p>
              </div>

              {/* H2: What Happens When You Call */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">What Happens When You Call TowingNo.1</h2>
                <ol className="space-y-4">
                  {[
                    { step: "1", title: "Call (778) 838-0014",                       body: "A dispatcher answers 24/7. Tell them your vehicle is stuck and give your location." },
                    { step: "2", title: "Location and vehicle condition confirmed",   body: "We ask for your exact location — nearest road, intersection, or landmark — and a brief description of how the vehicle is stuck." },
                    { step: "3", title: "Upfront quote provided",                    body: "We give you a flat-rate price for the extraction before a truck is dispatched. You know the cost before anyone is sent." },
                    { step: "4", title: "Recovery vehicle dispatched",               body: "We send the nearest available driver with appropriate winching and recovery equipment for your situation." },
                    { step: "5", title: "Vehicle extracted",                         body: "The driver assesses the position, rigs to appropriate anchor points, and uses controlled winch tension to bring the vehicle back onto solid ground." },
                    { step: "6", title: "Assessment and onward assistance if needed", body: "We assess the vehicle after extraction. If it can be driven safely, you are free to go. If a tow or further assistance is needed, we arrange it." },
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
                <h2 className="text-2xl font-extrabold text-navy-900 mb-6">Winching &amp; Vehicle Recovery FAQs</h2>
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
                <Link href="/services/vehicle-transport" className="font-semibold text-amber-600 hover:text-amber-700">Vehicle transport</Link>
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
                <h3 className="text-xl font-extrabold mb-3">Vehicle Stuck?</h3>
                <p className="text-slate-300 text-sm mb-5">
                  24/7 winching and vehicle extraction across Surrey and the Lower Mainland. Free upfront quote before dispatch.
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
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> Professional equipment</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> Post-extraction assessment</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> 24/7 including holidays</li>
                </ul>
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                <h3 className="font-bold text-navy-900 mb-3 text-sm">Related Services</h3>
                <ul className="space-y-2">
                  {[
                    { href: "/services/emergency-towing",    label: "Emergency Towing" },
                    { href: "/services/accident-recovery",   label: "Accident Recovery" },
                    { href: "/services/vehicle-transport",   label: "Vehicle Transport" },
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
