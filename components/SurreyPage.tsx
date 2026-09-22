import Link from "next/link";

// Reusable call CTA block — used three times on the page
function CallCTA({ label = "Need a Tow Truck in Surrey?" }: { label?: string }) {
  return (
    <div className="bg-navy-950 rounded-2xl p-7 text-white text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-2">24/7 Emergency Towing &amp; Roadside Assistance</p>
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

// Checkmark icon used in feature lists
function Check() {
  return (
    <span className="w-5 h-5 rounded-full bg-amber-400/20 border border-amber-400 flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
      <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5">
        <path d="M2 6l3 3 5-5" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

const faq = [
  {
    q: "How quickly can a tow truck reach me in Surrey?",
    a: "We dispatch the nearest available driver the moment you call (778) 838-0014 and give you a live ETA before you commit. Because we stage drivers across Surrey rather than running from a single yard, help is usually close by wherever you are in the city.",
  },
  {
    q: "Do you provide 24/7 towing in Surrey?",
    a: "Yes. TowingNo.1 operates 24 hours a day, 7 days a week in Surrey — including evenings, weekends, and all statutory holidays. Emergencies don't follow business hours, and neither do we.",
  },
  {
    q: "Do you provide roadside assistance in Surrey?",
    a: "Yes. Beyond towing, we offer battery boosts and jump-starts, flat tire changes, car lockout service, and fuel delivery across all Surrey neighbourhoods. Many calls are resolved on the spot without needing a tow.",
  },
  {
    q: "Do you tow cars after accidents in Surrey?",
    a: "Yes. Our accident recovery service handles collision scenes throughout Surrey — we transport damaged vehicles safely to any repair shop, dealership, or storage facility you choose, and provide documentation that aligns with ICBC claims.",
  },
  {
    q: "What areas of Surrey do you serve?",
    a: "We cover all of Surrey including Cloverdale, Fleetwood, Guildford, Newton, South Surrey, and Whalley. We also dispatch to neighbouring communities including Langley, Delta, White Rock, and Burnaby.",
  },
  {
    q: "How much does towing cost in Surrey?",
    a: "We use flat-rate pricing based on your vehicle type and the distance involved. There is no meter running and no hidden fees. Call (778) 838-0014 for an upfront quote before we dispatch — you know the exact price before a truck rolls.",
  },
];

export default function SurreyPage() {
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
              <li className="text-amber-400">Surrey</li>
            </ol>
          </nav>

          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-3">Surrey, BC · Available Now</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-5">
            24/7 Towing Service in Surrey, BC
          </h1>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl mb-8">
            TowingNo.1 provides 24/7 emergency towing and roadside assistance in Surrey, BC. We help drivers with emergency towing, vehicle recovery, battery boosts, flat tires, car lockouts, fuel delivery, and accident recovery throughout Surrey and surrounding communities.
          </p>

          {/* Top CTA */}
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

          {/* Quick trust signals */}
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-300">
            {["Available 24/7 including holidays", "Free upfront quote before dispatch", "Flat-rate pricing — no hidden fees", "Licensed & insured in BC", "All vehicle types including EVs"].map((item) => (
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
                  Surrey is the busiest territory we cover — from the Guildford big-box corridor down through Newton, out to the Cloverdale fairgrounds, and along the fast-moving traffic of Highway 99. Breakdowns happen in every kind of setting: packed mall parkades, quiet cul-de-sacs off 152nd Street, and live highway shoulders. We keep drivers distributed across Surrey so our trucks reach most calls quickly, wherever you are in the city.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Call <a href="tel:+17788380014" className="font-semibold text-amber-600 hover:text-amber-700">(778) 838-0014</a> and give us your nearest major intersection — we will route the closest available driver straight to you, give you a firm flat-rate price, and confirm your ETA before you hang up.
                </p>
              </div>

              {/* H2: Emergency Towing */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Emergency Towing in Surrey</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  When your vehicle breaks down on Highway 99, King George Boulevard, Fraser Highway, or anywhere in Surrey, we dispatch the nearest driver immediately. We operate flatbed and wheel-lift trucks 24/7 — including all statutory holidays — and every tow comes with an upfront flat-rate quote before dispatch.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Our drivers are trained to work safely on live highway shoulders, in underground parkades, and on the steep grades of South Surrey. Whether your car has died in a parkade at Guildford Town Centre, stalled on the Highway 99 shoulder, or needs a tow after a collision, we get there fast and handle your vehicle with professional care from pickup to drop-off.
                </p>
                <ul className="grid sm:grid-cols-2 gap-3 mt-4">
                  {[
                    "Cars, SUVs, trucks & light commercial",
                    "Electric vehicles (flatbed only)",
                    "All-wheel-drive & 4×4",
                    "Accident-damaged & non-running vehicles",
                    "Tow to any shop, dealership, or home",
                    "Wheel-lift and flatbed trucks available",
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

              {/* H2: Tow Truck Services */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Tow Truck Services in Surrey</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  We run both wheel-lift and flatbed trucks across Surrey, which lets us match the right method to your vehicle rather than forcing a single approach onto every job. Flatbeds carry all-wheel-drive cars, electric vehicles, low-clearance models, and anything with crash or drivetrain damage. Wheel-lift trucks handle quick, economical moves for standard front- or rear-wheel-drive vehicles.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  When you call, tell the dispatcher your vehicle's make, drive type, and whether it still rolls and steers. That one detail lets us send the correct truck on the first trip — protecting your transmission and bumpers and keeping your wait short.
                </p>
              </div>

              {/* H2: Roadside Assistance */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">24/7 Roadside Assistance</h2>
                <p className="text-slate-600 leading-relaxed mb-5">
                  Not every call needs a tow. We offer a full range of on-site roadside services that fix the problem right where you are, so you can get back on the road without the cost and delay of a tow. Each service is available 24 hours a day across all Surrey neighbourhoods.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { href: "/services/battery-boost",       label: "Battery Boost & Jump-Start",  desc: "Dead battery? We jump-start and test on the spot." },
                    { href: "/services/flat-tire-help",       label: "Flat Tire Help",               desc: "On-site spare change or tow to the nearest shop." },
                    { href: "/services/lockout-service",      label: "Car Lockout Service",          desc: "Keys locked in? We open your car without damage." },
                    { href: "/services/fuel-delivery",        label: "Fuel Delivery",                desc: "Gas or diesel delivered to your location." },
                    { href: "/services/winching-extraction",  label: "Winching & Extraction",        desc: "Stuck in a ditch, mud, or snow? We pull you out." },
                    { href: "/services/emergency-towing",     label: "Emergency Towing",             desc: "Full flatbed and wheel-lift towing, 24/7." },
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

              {/* H2: Battery Boost */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Battery Boost &amp; Jump Start</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  A dead battery is one of the most common roadside calls we handle in Surrey — especially through the damp coastal winters when short city trips never give the alternator enough time to fully recharge. Whether you left the lights on overnight in Newton, your battery has finally given up in a Fleetwood parkade, or cold weather has drained it after sitting at the airport, we dispatch a jump-start technician immediately.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  After the boost, we test your battery and charging system on the spot and give you an honest assessment — whether you are good for the season or due for a replacement before the next cold snap leaves you stranded again.
                </p>
                <p className="mt-4 text-sm">
                  <Link href="/services/battery-boost" className="font-semibold text-amber-600 hover:text-amber-700">
                    Battery boost service details →
                  </Link>
                </p>
              </div>

              {/* H2: Flat Tire */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Flat Tire Assistance</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  A flat can happen anywhere in Surrey — on the Highway 99 shoulder, in a Newton parking lot, or on a quiet street in Fleetwood. We dispatch a technician to change your spare on-site or, if you have no spare or the tire is beyond a roadside fix, we tow you to the nearest open tire shop.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Changing a tire on a busy Surrey highway shoulder is genuinely hazardous without professional equipment and traffic protection. Our technicians work from the safe side of the vehicle, use proper jack points, and confirm tightness with a torque wrench — so you drive away knowing the wheel won't loosen a few kilometres down the road.
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
                  Locking your keys inside your car in a Surrey parking lot or on the roadside is stressful — especially at night or in bad weather. Our lockout technicians open your vehicle safely without causing any damage to the lock, door, or window, using professional-grade tools on all makes and models including modern keyless-entry vehicles.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Guildford Town Centre, Central City, and the Newton Exchange area are our most frequent Surrey lockout locations. We respond the same way whether you are in a tight parkade or parked curbside — quickly, carefully, and without leaving a mark.
                </p>
                <p className="mt-4 text-sm">
                  <Link href="/services/lockout-service" className="font-semibold text-amber-600 hover:text-amber-700">
                    Car lockout service details →
                  </Link>
                </p>
              </div>

              {/* H2: Accident Towing */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Accident Towing &amp; Vehicle Recovery</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  After a collision in Surrey, your priority is safety. Once everyone is clear, call us and we dispatch a trained recovery crew to handle the scene professionally and transport your damaged vehicle to any repair shop, ICBC facility, or storage yard you choose across the Lower Mainland.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  We use proper securing techniques and equipment to prevent additional damage during transport — skids and recovery boards protect the undercarriage, and we secure at the frame rather than damaged body panels. Even if your car appears driveable after an accident, hidden structural damage can make it unsafe, and we will tell you plainly what we observe.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  We provide clear documentation of the recovery and drop-off to support your ICBC or private insurance claim.
                </p>
                <p className="mt-4 text-sm">
                  <Link href="/services/accident-recovery" className="font-semibold text-amber-600 hover:text-amber-700">
                    Accident recovery service details →
                  </Link>
                </p>
              </div>

              {/* Mid-page CTA */}
              <CallCTA label="Need a Tow Truck in Surrey Right Now?" />

              {/* H2: Service Areas */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Our Surrey Service Areas</h2>
                <p className="text-slate-600 leading-relaxed mb-5">
                  We cover all of Surrey — every neighbourhood, highway, and back road. Our most frequent areas include:
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  {[
                    { name: "Cloverdale", desc: "Town Centre, Clayton Heights, Highway 10 corridor" },
                    { name: "Fleetwood", desc: "152nd Street, Fraser Highway, Fleetwood Park area" },
                    { name: "Guildford", desc: "Guildford Town Centre, 104th Avenue, 152nd Street" },
                    { name: "Newton", desc: "Newton Exchange, King George Blvd, 72nd Avenue" },
                    { name: "South Surrey", desc: "Morgan Crossing, Grandview, 16th Avenue, Highway 99" },
                    { name: "Whalley", desc: "Surrey City Centre, King George Boulevard, SkyTrain corridor" },
                  ].map((area) => (
                    <div key={area.name} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                      <p className="font-bold text-navy-900 text-sm mb-1">{area.name}</p>
                      <p className="text-xs text-slate-500">{area.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-2">
                  <strong>Major routes we cover:</strong> Highway 99, King George Boulevard, 152nd Street, Fraser Highway, Highway 10
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  We also dispatch to neighbouring communities — see{" "}
                  <Link href="/locations/langley" className="text-amber-600 hover:text-amber-700 font-semibold">Langley</Link>,{" "}
                  <Link href="/locations/delta" className="text-amber-600 hover:text-amber-700 font-semibold">Delta</Link>,{" "}
                  <Link href="/locations/white-rock" className="text-amber-600 hover:text-amber-700 font-semibold">White Rock</Link>, and{" "}
                  <Link href="/locations/burnaby" className="text-amber-600 hover:text-amber-700 font-semibold">Burnaby</Link>.
                </p>
              </div>

              {/* H2: Why Choose Us */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Why Choose Towing No.1</h2>
                <ul className="space-y-4">
                  {[
                    {
                      title: "Local Surrey drivers who know the roads",
                      body: "Our drivers know the difference between the Guildford slip lanes and the Newton Exchange bus loops, so they don't waste time circling. That local knowledge matters most during rush hour on King George Boulevard or when a collision closes a lane on Highway 99.",
                    },
                    {
                      title: "Upfront flat-rate pricing — no surprises",
                      body: "Every Surrey job starts with a firm flat-rate quote before a truck rolls. No meter running while you wait, no hidden fees, no surprise charges on arrival. You hear the exact price in under 60 seconds.",
                    },
                    {
                      title: "The right truck for your vehicle",
                      body: "We run wheel-lift and flatbed trucks. Flatbeds for EVs, all-wheel-drive cars, and accident-damaged vehicles; wheel-lift for quick economical moves. We send the right equipment on the first trip.",
                    },
                    {
                      title: "Licensed & insured in BC",
                      body: "TowingNo.1 is fully licensed and insured to operate in British Columbia. Every operator is trained to work safely on live highway shoulders, in underground parkades, and on the difficult terrain of Surrey and the Lower Mainland.",
                    },
                    {
                      title: "Available every hour of every day",
                      body: "We operate 24 hours a day, 7 days a week, including all statutory holidays. Evenings, weekends, long weekends — the same team is available whenever you need us.",
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
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Call Towing No.1 Today</h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Stranded somewhere in Surrey? Call us now and talk to dispatch directly — no bots, no hold music, no runaround. We give you an upfront quote and a live ETA in under 60 seconds, then dispatch the nearest available driver immediately.
                </p>
                <p className="text-slate-600 leading-relaxed mb-6">
                  TowingNo.1 is a local towing company serving Surrey, South Surrey, Cloverdale, and the wider Lower Mainland. Whether you need a tow truck at 2&nbsp;a.m. or a quick battery boost in a parking lot, you reach a real dispatcher who gets the right help to you without delay.
                </p>
                <CallCTA label="Get a Tow Truck in Surrey Now" />
              </div>

              {/* Internal links footer */}
              <div className="text-sm text-slate-600 flex flex-wrap gap-4 pt-4 border-t border-slate-100">
                <Link href="/locations" className="font-semibold text-amber-600 hover:text-amber-700">All service areas</Link>
                <Link href="/services" className="font-semibold text-amber-600 hover:text-amber-700">All towing services</Link>
                <Link href="/services/emergency-towing" className="font-semibold text-amber-600 hover:text-amber-700">Emergency towing</Link>
                <Link href="/services/battery-boost" className="font-semibold text-amber-600 hover:text-amber-700">Battery boost</Link>
                <Link href="/services/lockout-service" className="font-semibold text-amber-600 hover:text-amber-700">Car lockout</Link>
                <Link href="/services/flat-tire-help" className="font-semibold text-amber-600 hover:text-amber-700">Flat tire help</Link>
                <Link href="/contact" className="font-semibold text-amber-600 hover:text-amber-700">Request online</Link>
                <Link href="/blog" className="font-semibold text-amber-600 hover:text-amber-700">Towing tips</Link>
              </div>
            </div>

            {/* ── Sidebar ── */}
            <div className="space-y-6">
              {/* Sticky CTA card */}
              <div className="bg-navy-950 rounded-2xl p-6 text-white sticky top-24">
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">Available Now · Surrey, BC</p>
                <h3 className="text-xl font-extrabold mb-1">Need a Tow Truck?</h3>
                <p className="text-slate-300 text-sm mb-5">
                  24/7 emergency towing &amp; roadside help. Free upfront quote before dispatch.
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

              {/* Services quick links */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                <h3 className="font-bold text-navy-900 mb-3 text-sm">Surrey Towing Services</h3>
                <ul className="space-y-2">
                  {[
                    { href: "/services/emergency-towing", label: "Emergency Towing" },
                    { href: "/services/battery-boost", label: "Battery Boost" },
                    { href: "/services/lockout-service", label: "Car Lockout Service" },
                    { href: "/services/flat-tire-help", label: "Flat Tire Help" },
                    { href: "/services/fuel-delivery", label: "Fuel Delivery" },
                    { href: "/services/winching-extraction", label: "Winching & Extraction" },
                    { href: "/services/accident-recovery", label: "Accident Recovery" },
                    { href: "/services/vehicle-transport", label: "Vehicle Transport" },
                  ].map((s) => (
                    <li key={s.href}>
                      <Link
                        href={s.href}
                        className="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
                          <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                        </svg>
                        {s.label}
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
                    { href: "/locations/langley", label: "Towing Langley" },
                    { href: "/locations/delta", label: "Tow Truck Delta" },
                    { href: "/locations/white-rock", label: "White Rock Towing" },
                    { href: "/locations/burnaby", label: "Burnaby Towing" },
                    { href: "/locations/cloverdale", label: "Cloverdale Towing" },
                    { href: "/locations/south-surrey", label: "South Surrey Towing" },
                  ].map((a) => (
                    <li key={a.href}>
                      <Link
                        href={a.href}
                        className="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
                          <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                        </svg>
                        {a.label}
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
