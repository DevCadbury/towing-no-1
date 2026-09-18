import Link from "next/link";

// Reusable call CTA — used at top, mid-page, and bottom
function CallCTA({ label = "Need a Tow Truck in Langley?" }: { label?: string }) {
  return (
    <div className="bg-navy-950 rounded-2xl p-7 text-white text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-2">
        24/7 Emergency Towing &amp; Roadside Assistance
      </p>
      <h3 className="text-2xl md:text-3xl font-extrabold mb-3">{label}</h3>
      <p className="text-slate-300 text-sm mb-6 max-w-sm mx-auto">
        Get help from TowingNo.1. We dispatch immediately — upfront quote before any truck rolls.
      </p>
      <a
        href="tel:+17788380014"
        className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold py-4 px-10 rounded-xl text-lg transition-all duration-200 hover:-translate-y-0.5 shadow-lg"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        778-838-0014
      </a>
    </div>
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

function ArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
      <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
    </svg>
  );
}

// Langley-specific FAQ — mirrors the data in service-areas.ts and the FAQPage schema
const faq = [
  {
    q: "How quickly can a tow truck reach me in Langley?",
    a: "We dispatch the nearest available driver the moment you call (778) 838-0014 and give you a live ETA up front. Because Langley covers a wide area from Willoughby to Aldergrove, we ask for your nearest cross street or landmark so the right truck heads directly to you.",
  },
  {
    q: "Do you provide 24/7 towing in Langley?",
    a: "Yes. TowingNo.1 operates 24 hours a day, 7 days a week across Langley — including evenings, weekends, and all statutory holidays. Whether you're stranded on Highway 1 at midnight or in a Willoughby parkade on a Sunday morning, we answer.",
  },
  {
    q: "Do you cover all of Langley including Aldergrove and Fort Langley?",
    a: "Yes. We serve Langley City and all of Langley Township — Willoughby, Walnut Grove, Murrayville, Brookswood, Aldergrove, Fort Langley, and the rural roads in between. Give us your nearest cross street and we'll dispatch accordingly.",
  },
  {
    q: "Do you offer roadside assistance in Langley without towing?",
    a: "Yes. We provide battery boosts, flat tire changes, car lockout service, and fuel delivery across Langley. If the problem can be solved on the spot we fix it there — a tow is only arranged when the vehicle genuinely cannot be driven.",
  },
  {
    q: "Can you tow on Highway 1 near Langley?",
    a: "Yes. We respond to breakdowns on Highway 1 (Trans-Canada) through Langley, including the 200th Street, 232nd Street, and Glover Road interchanges. Call us with your location and we dispatch immediately.",
  },
  {
    q: "How much does towing cost in Langley?",
    a: "We use flat-rate pricing based on vehicle type and the distance involved. There is no meter running and no hidden fees. Call (778) 838-0014 for an upfront quote before we dispatch — you know the exact price before any truck rolls.",
  },
];

export default function LangleyPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-navy-950 pt-28 pb-14">
        <div className="container-custom">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-slate-400">
              <li><Link href="/" className="hover:text-amber-400 transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/locations" className="hover:text-amber-400 transition-colors">Service Areas</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-amber-400">Langley</li>
            </ol>
          </nav>

          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-3">
            Langley, BC · Available Now
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-5">
            24/7 Towing Service in Langley, BC
          </h1>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl mb-8">
            TowingNo.1 provides 24/7 emergency towing and roadside assistance across Langley, BC. We serve
            Langley City, Langley Township, Willoughby, Walnut Grove, Murrayville, Brookswood, Aldergrove,
            and Fort Langley — with upfront pricing and immediate dispatch.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <a
              href="tel:+17788380014"
              className="btn-call-highlight inline-flex items-center justify-center gap-2 rounded-xl py-4 px-8 text-base font-bold w-full sm:w-auto"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call 778-838-0014 — Free Quote
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-xl text-base border border-white/25 transition-all duration-200 w-full sm:w-auto"
            >
              Request Online
            </Link>
          </div>

          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-300">
            {[
              "Available 24/7 including holidays",
              "Free upfront quote before dispatch",
              "Flat-rate pricing — no hidden fees",
              "Licensed & insured in BC",
              "All vehicle types including EVs",
            ].map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <span className="text-amber-400" aria-hidden="true">✓</span> {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Main content + sidebar ── */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* ── Left: main content ── */}
            <div className="lg:col-span-2 space-y-14">

              {/* Intro */}
              <div>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Langley covers a wider mix of terrain than most of the Lower Mainland — dense townhome
                  developments in Willoughby, established suburban neighbourhoods in Walnut Grove and Murrayville,
                  and long stretches of rural road out toward Aldergrove and Fort Langley. The Trans-Canada
                  cuts through the middle, and the 200th Street corridor is one of the busiest interchange zones
                  in the region. Breakdowns happen in every setting here: strata parkades, quiet farm roads,
                  and live highway shoulders all in the same day's work.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Call <a href="tel:+17788380014" className="font-semibold text-amber-600 hover:text-amber-700">(778) 838-0014</a>{" "}
                  and give us your nearest cross street or landmark — we route the closest available driver
                  directly to you, confirm a firm flat-rate price, and give you an ETA before you hang up.
                </p>
              </div>

              {/* H2: Emergency Towing in Langley */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Emergency Towing in Langley</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  When your vehicle breaks down on Highway 1, the Fraser Highway, or anywhere across Langley,
                  we dispatch the nearest available driver immediately. We operate flatbed and wheel-lift trucks
                  24 hours a day, 7 days a week — including all statutory holidays — and every tow comes with
                  an upfront flat-rate quote before dispatch. No meter running, no surprise charges on arrival.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  The 200th Street and 232nd Street interchanges on Highway 1 are among our most frequent call
                  locations. Our drivers are trained to work safely on live highway shoulders, setting up
                  correctly to shield both the vehicle and the driver from passing traffic before any loading begins.
                </p>
                <ul className="grid sm:grid-cols-2 gap-3 mt-4">
                  {[
                    "Cars, SUVs, trucks & light commercial",
                    "Electric vehicles (flatbed only)",
                    "All-wheel-drive & 4×4",
                    "Accident-damaged & non-running vehicles",
                    "Tow to any shop, dealership, or home",
                    "Flatbed and wheel-lift trucks available",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <Check />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm">
                  <Link href="/services/emergency-towing" className="font-semibold text-amber-600 hover:text-amber-700">
                    Learn more about emergency towing →
                  </Link>
                </p>
              </div>

              {/* H2: Tow Truck Services in Langley */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Tow Truck Services in Langley</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  We run both wheel-lift and flatbed trucks across Langley, which lets us match the right
                  method to your vehicle. Flatbeds are the safe choice for all-wheel-drive cars, electric
                  vehicles, low-clearance models, and anything with crash or drivetrain damage — the vehicle
                  rides fully off the ground rather than on its drive wheels. Wheel-lift trucks handle quick,
                  economical moves for standard front- or rear-wheel-drive vehicles.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Langley's rural roads also present situations urban operators aren't built for: a vehicle
                  nosed into a ditch on a Brookswood section line, or a van stuck in soft ground on a farm
                  road past Aldergrove. Our winch-equipped trucks are designed for exactly this, and our drivers
                  know how to recover a vehicle on a soft or sloped shoulder without causing additional damage.
                </p>
              </div>

              {/* H2: 24/7 Roadside Assistance */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">24/7 Roadside Assistance in Langley</h2>
                <p className="text-slate-600 leading-relaxed mb-5">
                  Not every call needs a tow. We offer a full set of on-site roadside services across Langley —
                  each available 24 hours a day so you can get back on the road without the cost and delay of
                  a full tow when the problem can be fixed where you are.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { href: "/services/battery-boost",      label: "Battery Boost & Jump-Start", desc: "Dead battery? We jump-start and test on the spot." },
                    { href: "/services/flat-tire-help",      label: "Flat Tire Help",              desc: "On-site spare change or tow to the nearest shop." },
                    { href: "/services/lockout-service",     label: "Car Lockout Service",         desc: "Keys locked in? We open without damage." },
                    { href: "/services/fuel-delivery",       label: "Fuel Delivery",               desc: "Gas or diesel delivered to your location." },
                    { href: "/services/winching-extraction", label: "Winching & Extraction",       desc: "Stuck in a ditch, mud, or snow? We pull you out." },
                    { href: "/services/emergency-towing",    label: "Emergency Towing",            desc: "Flatbed and wheel-lift towing, 24/7." },
                  ].map((svc) => (
                    <Link
                      key={svc.href}
                      href={svc.href}
                      className="group flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-amber-400/60 hover:bg-amber-50/30 transition-all duration-200"
                    >
                      <Check />
                      <div>
                        <p className="text-sm font-bold text-navy-900 group-hover:text-amber-600 transition-colors">{svc.label}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{svc.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* H2: Battery Boost in Langley */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Battery Boost &amp; Jump-Start</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Dead batteries are a frequent call in Langley — particularly through the damp autumn months
                  when short commuter trips around Willoughby and Walnut Grove never give the alternator
                  enough running time to fully recharge. Vehicles left parked at Park-and-Ride lots near the
                  200th Street transit hub for several days are especially prone to draining down past the
                  point where they'll start.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  We dispatch a jump-start technician immediately, boost your vehicle on the spot, and then
                  test the battery and charging system to tell you honestly whether you're good for the season
                  or due for a replacement before the next cold spell.
                </p>
                <p className="mt-4 text-sm">
                  <Link href="/services/battery-boost" className="font-semibold text-amber-600 hover:text-amber-700">
                    Battery boost service details →
                  </Link>
                </p>
              </div>

              {/* H2: Flat Tire */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Flat Tire Help</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  A flat can happen anywhere in Langley — on a Highway 1 on-ramp, in a Willowbrook Shopping
                  Centre parking lot, or on a gravel road out near Fort Langley. We dispatch a technician to
                  fit your spare on-site, or if you have no spare or the tire is beyond a roadside repair,
                  we tow you to the nearest open shop with an upfront quote before we move.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Changing a tire on a live highway shoulder is genuinely dangerous without professional
                  equipment and proper traffic control positioning. Our technicians work from the safe side
                  of the vehicle and use the correct jack points and torque specs.
                </p>
                <p className="mt-4 text-sm">
                  <Link href="/services/flat-tire-help" className="font-semibold text-amber-600 hover:text-amber-700">
                    Flat tire service details →
                  </Link>
                </p>
              </div>

              {/* H2: Lockout */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Car Lockout Service</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Locking your keys inside in a Langley parking lot — whether at Willowbrook, a Walnut Grove
                  strata lot, or outside a Murrayville business — is stressful at any hour. Our lockout
                  technicians use professional tools to open your vehicle safely without damaging the door,
                  lock, or window on all makes and models, including modern keyless-entry vehicles.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  We cover all of Langley for lockouts — urban and rural. If your key fob battery has died
                  or you have a broken key in the cylinder, we handle those situations too.
                </p>
                <p className="mt-4 text-sm">
                  <Link href="/services/lockout-service" className="font-semibold text-amber-600 hover:text-amber-700">
                    Lockout service details →
                  </Link>
                </p>
              </div>

              {/* H2: Winching & Ditch Recovery */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Winching &amp; Ditch Recovery</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Langley's mix of wet farm roads, gravel section lines, and icy winter shoulders means ditch
                  recoveries are a regular part of our work here. A soft shoulder can give way suddenly, and
                  attempting to free a stuck vehicle with a tow strap and another truck often causes more damage
                  than the initial slide.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Our winch-equipped trucks pull from rated attachment points using controlled tension —
                  not a sudden jerk — so the vehicle comes back onto solid ground the same way it went off.
                  Once recovered, we check whether the vehicle is safe to drive or needs a tow to a shop.
                </p>
                <p className="mt-4 text-sm">
                  <Link href="/services/winching-extraction" className="font-semibold text-amber-600 hover:text-amber-700">
                    Winching & extraction details →
                  </Link>
                </p>
              </div>

              {/* H2: Accident Recovery */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Accident Towing &amp; Vehicle Recovery</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  After a collision on Highway 1, the Fraser Highway, or anywhere in Langley, your priority
                  is safety first. Once everyone is clear, call us and we dispatch a trained recovery crew to
                  handle the scene and transport your damaged vehicle to any repair shop, ICBC facility, or
                  storage yard you choose across the Lower Mainland.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  We secure the vehicle at the frame rather than damaged body panels and provide clear
                  documentation of the recovery to support your ICBC or private insurance claim.
                </p>
                <p className="mt-4 text-sm">
                  <Link href="/services/accident-recovery" className="font-semibold text-amber-600 hover:text-amber-700">
                    Accident recovery details →
                  </Link>
                </p>
              </div>

              {/* Mid-page CTA */}
              <CallCTA label="Need a Tow Truck in Langley Right Now?" />

              {/* H2: Langley Service Areas */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Areas We Cover in Langley</h2>
                <p className="text-slate-600 leading-relaxed mb-5">
                  We serve all of Langley City and Langley Township. Our most frequent areas include:
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  {[
                    { name: "Willoughby",   desc: "New townhome developments, 200th St corridor, Hwy 1 interchanges" },
                    { name: "Walnut Grove", desc: "Established neighbourhoods, 200th Street, Golden Ears Way" },
                    { name: "Murrayville",  desc: "Langley City centre, Fraser Highway, 216th Street corridor" },
                    { name: "Brookswood",   desc: "Suburban and semi-rural, 200th St south, township roads" },
                    { name: "Aldergrove",   desc: "Farm roads, rural sections, US border crossing area" },
                    { name: "Fort Langley", desc: "River road, historic village, Glover Road corridor" },
                  ].map((area) => (
                    <div key={area.name} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                      <p className="font-bold text-navy-900 text-sm mb-1">{area.name}</p>
                      <p className="text-xs text-slate-500">{area.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-2">
                  <strong>Major routes we cover:</strong> Highway 1 (Trans-Canada), Fraser Highway, 200th Street, Highway 10
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  We also dispatch to neighbouring communities — see{" "}
                  <Link href="/locations/surrey" className="text-amber-600 hover:text-amber-700 font-semibold">Surrey</Link>,{" "}
                  <Link href="/locations/aldergrove" className="text-amber-600 hover:text-amber-700 font-semibold">Aldergrove</Link>,{" "}
                  <Link href="/locations/cloverdale" className="text-amber-600 hover:text-amber-700 font-semibold">Cloverdale</Link>, and{" "}
                  <Link href="/locations/maple-ridge" className="text-amber-600 hover:text-amber-700 font-semibold">Maple Ridge</Link>.
                </p>
              </div>

              {/* H2: Why Choose TowingNo.1 in Langley */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Why Choose TowingNo.1 in Langley</h2>
                <ul className="space-y-4">
                  {[
                    {
                      title: "Local knowledge of Langley's roads",
                      body: "Township roads are long and lightly lit, so a vague address costs a stranded driver significant extra time with the wrong company. Our dispatchers ask for the nearest cross street or a landmark like the Langley Events Centre or Willowbrook so the closest truck heads straight to you.",
                    },
                    {
                      title: "Upfront flat-rate pricing",
                      body: "Every Langley call starts with a firm flat-rate quote before a truck rolls. No meter running while you wait, no hidden fees, no surprise charge on arrival. You hear the exact price before any truck is dispatched.",
                    },
                    {
                      title: "The right truck for the job",
                      body: "We carry both wheel-lift and flatbed trucks, plus winch-equipped rigs for rural recoveries. EVs, AWD cars, and accident-damaged vehicles go on a flatbed — we send the correct equipment on the first trip.",
                    },
                    {
                      title: "Licensed & insured in BC",
                      body: "TowingNo.1 is fully licensed and insured to operate in British Columbia. Every operator is trained to work safely on live highway shoulders, in tight strata parkades, and on Langley's rural and semi-rural road network.",
                    },
                    {
                      title: "Available every hour of every day",
                      body: "We operate 24 hours a day, 7 days a week in Langley — including all statutory holidays. Evenings, weekends, long weekends, and nights are all covered the same way.",
                    },
                  ].map((item) => (
                    <li key={item.title} className="flex items-start gap-3">
                      <Check />
                      <div>
                        <p className="font-bold text-navy-900 text-sm mb-1">{item.title}</p>
                        <p className="text-slate-600 text-sm leading-relaxed">{item.body}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* H2: FAQ */}
              <div id="faq-section">
                <h2 className="text-2xl font-extrabold text-navy-900 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {faq.map((item) => (
                    <div key={item.q} className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                      <h3 className="font-bold text-navy-900 mb-2 text-sm">{item.q}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{item.a}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* H2: Call Today */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Call TowingNo.1 in Langley</h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Stranded somewhere in Langley? Call us now and talk to dispatch directly — no bots, no hold
                  music. We give you an upfront quote and a live ETA, then dispatch the nearest available
                  driver immediately.
                </p>
                <CallCTA label="Get a Tow Truck in Langley Now" />
              </div>

              {/* Internal links footer */}
              <div className="text-sm text-slate-600 flex flex-wrap gap-4 pt-4 border-t border-slate-100">
                <Link href="/locations" className="font-semibold text-amber-600 hover:text-amber-700">All service areas</Link>
                <Link href="/services" className="font-semibold text-amber-600 hover:text-amber-700">All towing services</Link>
                <Link href="/services/emergency-towing" className="font-semibold text-amber-600 hover:text-amber-700">Emergency towing</Link>
                <Link href="/services/battery-boost" className="font-semibold text-amber-600 hover:text-amber-700">Battery boost</Link>
                <Link href="/services/lockout-service" className="font-semibold text-amber-600 hover:text-amber-700">Car lockout</Link>
                <Link href="/services/flat-tire-help" className="font-semibold text-amber-600 hover:text-amber-700">Flat tire help</Link>
                <Link href="/services/winching-extraction" className="font-semibold text-amber-600 hover:text-amber-700">Winching & extraction</Link>
                <Link href="/locations/surrey" className="font-semibold text-amber-600 hover:text-amber-700">Towing Surrey</Link>
                <Link href="/contact" className="font-semibold text-amber-600 hover:text-amber-700">Request online</Link>
              </div>
            </div>

            {/* ── Sidebar ── */}
            <div className="space-y-6">
              {/* Sticky CTA card */}
              <div className="bg-navy-950 rounded-2xl p-6 text-white sticky top-24">
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">Available Now · Langley, BC</p>
                <h3 className="text-xl font-extrabold mb-1">Need a Tow Truck?</h3>
                <p className="text-slate-300 text-sm mb-5">
                  24/7 towing &amp; roadside help in Langley. Free upfront quote before dispatch.
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
                <Link
                  href="/contact"
                  className="mt-3 flex items-center justify-center w-full rounded-xl py-3 px-5 text-sm font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
                >
                  Request Online
                </Link>
                <ul className="mt-5 space-y-2 text-xs text-slate-400">
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> Free upfront quote</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> Flat-rate — no hidden fees</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> Licensed &amp; insured in BC</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> 24/7 including holidays</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> All vehicle types</li>
                </ul>
              </div>

              {/* Langley services quick links */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                <h3 className="font-bold text-navy-900 mb-3 text-sm">Langley Towing Services</h3>
                <ul className="space-y-2">
                  {[
                    { href: "/services/emergency-towing",   label: "Emergency Towing" },
                    { href: "/services/battery-boost",      label: "Battery Boost" },
                    { href: "/services/lockout-service",    label: "Car Lockout Service" },
                    { href: "/services/flat-tire-help",     label: "Flat Tire Help" },
                    { href: "/services/fuel-delivery",      label: "Fuel Delivery" },
                    { href: "/services/winching-extraction",label: "Winching & Extraction" },
                    { href: "/services/accident-recovery",  label: "Accident Recovery" },
                    { href: "/services/vehicle-transport",  label: "Vehicle Transport" },
                  ].map((s) => (
                    <li key={s.href}>
                      <Link href={s.href} className="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1">
                        <ArrowIcon /> {s.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Nearby areas */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                <h3 className="font-bold text-navy-900 mb-3 text-sm">Nearby Service Areas</h3>
                <ul className="space-y-2">
                  {[
                    { href: "/locations/surrey",       label: "Towing Surrey" },
                    { href: "/locations/cloverdale",   label: "Cloverdale Towing" },
                    { href: "/locations/aldergrove",   label: "Aldergrove Towing" },
                    { href: "/locations/maple-ridge",  label: "Maple Ridge Towing" },
                    { href: "/locations/delta",        label: "Tow Truck Delta" },
                    { href: "/locations/white-rock",   label: "White Rock Towing" },
                  ].map((a) => (
                    <li key={a.href}>
                      <Link href={a.href} className="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1">
                        <ArrowIcon /> {a.label}
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
