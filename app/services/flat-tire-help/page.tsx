import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { faqPageSchema, type FaqItem } from "@/lib/faq";
import { serviceAreaCompact } from "@/lib/service-areas";

export const metadata: Metadata = {
  title: {
    absolute: "Flat Tire Help | 24/7 Roadside Assistance | TowingNo.1",
  },
  description:
    "Flat tire in Surrey or the Lower Mainland? TowingNo.1 provides 24/7 flat tire assistance — on-site spare change or tow to the nearest shop. Call 778-838-0014.",
  alternates: { canonical: "https://www.towingno1.com/services/flat-tire-help" },
  keywords: [],
  openGraph: {
    type: "website",
    url: "https://www.towingno1.com/services/flat-tire-help",
    title: "Flat Tire Help | 24/7 Roadside Assistance | TowingNo.1",
    description:
      "24/7 flat tire assistance in Surrey and the Lower Mainland. On-site spare change or tow to the nearest shop. Call 778-838-0014.",
    images: [{ url: "/image/Flat_Tire_Hel.png", alt: "Flat tire roadside assistance — technician helping a stranded driver" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flat Tire Help | 24/7 Roadside Assistance | TowingNo.1",
    description:
      "24/7 flat tire assistance across Surrey and the Lower Mainland. On-site or tow to shop. Call 778-838-0014.",
    images: ["/image/Flat_Tire_Hel.png"],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.towingno1.com/services/flat-tire-help#service",
  name: "Flat Tire Assistance",
  serviceType: "Flat Tire Roadside Assistance",
  description:
    "24/7 flat tire assistance across Surrey and the Lower Mainland. On-site spare tire change or tow to the nearest tire shop. Upfront pricing.",
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
    q: "Do you provide flat tire assistance 24/7?",
    a: "Yes. TowingNo.1 provides flat tire assistance 24 hours a day, 7 days a week — including evenings, weekends, and all statutory holidays. Call (778) 838-0014 at any hour and a dispatcher will answer, confirm your location, and arrange the appropriate help.",
  },
  {
    q: "Can you help if I have a flat tire on the highway?",
    a: "Yes. We respond to flat tires on Highway 1 (Trans-Canada), Highway 99, the Fraser Highway, King George Boulevard, and all major Lower Mainland corridors. If the shoulder is too narrow or the position is unsafe for a roadside change, we tow the vehicle to safety rather than attempting a change in a hazardous spot.",
  },
  {
    q: "Can you change a flat tire?",
    a: "Yes, if you have a usable spare tire. We fit the spare on-site, torque the lugs correctly, and confirm the wheel is secure before you drive away. If you have no spare, or the tire or wheel is damaged beyond a roadside fix, we tow you to the nearest open tire shop.",
  },
  {
    q: "What should I do while waiting for roadside assistance?",
    a: "Move the vehicle to a safe position if you can do so without further damage — a parking lot, a wide shoulder, or a side road. Switch on your hazard lights and leave them on. If you are on a highway and cannot safely exit the vehicle, stay buckled inside rather than standing in a live lane. When you call, give the dispatcher your exact location — nearest intersection, exit number, or address — so help can reach you without delay.",
  },
  {
    q: "What if the tire or wheel is damaged?",
    a: "If the wheel is bent, cracked, or the tire has a sidewall tear or blowout that cannot be addressed with a spare, we tow the vehicle to a tire shop. We will explain what we find and give you an upfront quote for the tow before any truck is dispatched.",
  },
  {
    q: "What areas do you serve for flat tire help?",
    a: "We provide flat tire assistance across Surrey, Langley, Burnaby, Delta, White Rock, Richmond, Coquitlam, Maple Ridge, Vancouver, and the wider Lower Mainland. Call (778) 838-0014 and we will confirm coverage for your location.",
  },
  {
    q: "When would I need a tow instead of a roadside tire change?",
    a: "A tow is the right call when there is no usable spare, the wheel or tire damage is beyond a roadside fix, the vehicle cannot be safely positioned for a change, or the flat has caused other damage that makes driving risky. We assess the situation honestly when we arrive and arrange a tow if it is genuinely needed.",
  },
];
const faqSchema = faqPageSchema(faq);

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",          item: "https://www.towingno1.com" },
    { "@type": "ListItem", position: 2, name: "Services",      item: "https://www.towingno1.com/services" },
    { "@type": "ListItem", position: 3, name: "Flat Tire Help", item: "https://www.towingno1.com/services/flat-tire-help" },
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

export default function FlatTireHelpPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950 pt-[76px]">
        <Image
          src="/image/Flat_Tire_Hel.png"
          alt="Flat tire roadside assistance — technician helping a driver with a flat tire"
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
              <li className="text-amber-400">Flat Tire Help</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-3">24/7 Service</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            24/7 Flat Tire Assistance
          </h1>
          <p className="text-white/80 text-lg max-w-xl mb-8">
            Flat tire on a highway shoulder, in a parking lot, or at the roadside?
            TowingNo.1 provides flat tire assistance across Surrey and the Lower Mainland around the clock —
            spare change on-site where possible, tow to a shop when needed.
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

              {/* H2: Flat Tire Help When You Are Stranded */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Flat Tire Help When You Are Stranded</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  A flat tire can happen in any situation — a nail or screw picked up in a parking lot,
                  a pothole strike on a highway on-ramp, a sudden blowout on a fast road, or a slow leak
                  that leaves the vehicle sitting on the rim by morning. Whatever the cause, a flat that
                  cannot be safely driven on needs prompt attention.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Common situations that lead to a flat tire call include:
                </p>
                <ul className="space-y-3 mb-4">
                  {[
                    { title: "Puncture from road debris",      body: "Nails, screws, and sharp debris cause slow or sudden punctures. A small tread puncture may allow the vehicle to limp to a safe spot; a sidewall puncture does not." },
                    { title: "Flat tire with no usable spare",  body: "Many newer vehicles carry no full-size spare — only a sealant kit or a compact temporary spare — which limits the roadside fix options." },
                    { title: "Blowout at speed",               body: "A tyre that fails suddenly at highway speed is a dangerous situation. The vehicle needs to be brought to a controlled stop and assessed before any attempt is made to continue." },
                    { title: "Damaged tyre from kerb or pothole", body: "A hard impact can cause sidewall damage or a bent wheel that makes the tyre unsafe to drive on even if it holds air initially." },
                    { title: "Roadside breakdown caused by a tyre", body: "A vehicle that has been driven on a flat — even briefly — may have damaged the tyre beyond repair, bent the wheel, or sustained brake or suspension damage." },
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
                  describe your situation. A dispatcher will confirm your location, ask about the vehicle
                  and the damage, and send the appropriate help.
                </p>
              </div>

              {/* H2: What Our Flat Tire Assistance Can Help With */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">What Our Flat Tire Assistance Can Help With</h2>
                <p className="text-slate-600 leading-relaxed mb-5">
                  We offer the following flat tire services across Surrey and the Lower Mainland:
                </p>
                <div className="space-y-4">
                  {[
                    {
                      title: "On-site spare tire change",
                      body: "If your vehicle has a usable full-size or compact spare, we mount it on-site, torque the wheel lugs to the correct specification, and stow the flat properly. A compact spare is a temporary solution — it should be replaced with a full-size tyre as soon as possible.",
                    },
                    {
                      title: "Assessment for vehicles without a spare",
                      body: "If your vehicle has no spare, uses run-flat tyres, or carries only a sealant kit, we assess whether any of those options can safely get you to a tyre shop. If not, a tow is the honest recommendation.",
                    },
                    {
                      title: "Towing to a tyre shop",
                      body: "When a roadside change is not possible — no spare, damaged wheel, unsafe location, or severe tyre damage — we tow the vehicle to the nearest open tyre shop. You receive an upfront flat-rate quote before the tow is dispatched.",
                    },
                    {
                      title: "Roadside safety positioning",
                      body: "If the vehicle is in an unsafe position — a live lane, a narrow shoulder, or close to fast traffic — we prioritise getting it to a safer location before any roadside work begins.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                      <h3 className="font-bold text-navy-900 text-sm mb-2">{item.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{item.body}</p>
                    </div>
                  ))}
                </div>
                <ul className="grid sm:grid-cols-2 gap-3 mt-5">
                  {[
                    "On-site spare tyre installation",
                    "Tow to nearest tyre shop",
                    "Highway and parking lot response",
                    "All vehicle types",
                    "Upfront flat-rate pricing",
                    "Available 24/7 including holidays",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-slate-700">
                      <Check /> {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* H2: What To Do After Getting a Flat Tire */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">What To Do After Getting a Flat Tire</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  The moments after a flat tire — particularly on a busy road — carry real safety risk.
                  The following steps will help you stay safe until assistance arrives:
                </p>
                <ol className="space-y-4">
                  {[
                    { step: "1", title: "Switch on your hazard lights",        body: "Do this as soon as you notice the flat, before you have fully stopped. Hazard lights alert other drivers that your vehicle is in trouble." },
                    { step: "2", title: "Move to a safe position if possible",  body: "Steer gently onto the shoulder, into a parking lot, or onto a side road if you can do so without swerving suddenly or damaging the wheel further. A slow, controlled movement to safety is better than stopping abruptly in a live lane." },
                    { step: "3", title: "Stay away from live traffic",          body: "On a highway, if the shoulder is narrow or fast traffic is passing close, stay inside the vehicle with your seatbelt on until help arrives. Exiting on the traffic side is more dangerous than staying buckled inside." },
                    { step: "4", title: "Call for assistance",                  body: "Call (778) 838-0014 and give the dispatcher your exact location — the nearest intersection, exit number, or address. Describe the vehicle and the situation briefly so the right help can be arranged." },
                    { step: "5", title: "Wait in a safe spot",                  body: "If you exit the vehicle, move to the passenger side, away from the road. Wait behind a barrier or guardrail where one is available. Keep your hazard lights running." },
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
                <p className="mt-4 text-sm text-slate-500">
                  Related reading:{" "}
                  <Link href="/blog/when-call-tow-vs-fix-yourself" className="text-amber-600 hover:underline">
                    When to call a tow truck vs. attempting a roadside fix yourself
                  </Link>
                </p>
              </div>

              {/* H2: Why a Professional Roadside Change Is Safer */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Why a Professional Roadside Change Is Safer</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  A tyre change sounds straightforward until you are kneeling beside a live lane on a wet
                  highway shoulder with vehicles passing at speed. A jack placed on soft, sloped, or
                  uneven ground can slip. A wheel tightened by hand rather than torque wrench can loosen
                  after a few kilometres. And attempting to change a tyre in an unsafe position exposes
                  you to traffic in a way that no cost saving justifies.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Our technicians work from the safe side of the vehicle, use rated jack points, and
                  confirm correct torque before you pull away. If the position is too dangerous for a
                  roadside change, we tow the vehicle to a safe location first.
                </p>
              </div>

              {/* H2: When You Need a Tow Instead */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">When You Need a Tow Instead</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  A flat tire does not always end with a spare change. There are situations where a tow
                  is the safer and more practical solution:
                </p>
                <ul className="space-y-3 mb-5">
                  {[
                    { title: "No usable spare",               body: "Many vehicles carry no full-size spare — only a sealant kit or nothing at all. If sealant cannot seal the damage, a tow to a tyre shop is the only option." },
                    { title: "Damaged wheel or rim",           body: "A cracked, bent, or broken wheel cannot safely hold a tyre at speed. The vehicle needs a tow and a wheel replacement at a shop." },
                    { title: "Severe tyre damage",             body: "Sidewall tears, large blowouts, and extensive tread damage go beyond what a spare can address. A new tyre at a shop is required." },
                    { title: "Multiple flat tyres",            body: "A vehicle with more than one flat tyre — sometimes caused by road damage, debris, or a collision — cannot be fixed with a single spare and needs a tow." },
                    { title: "Unsafe roadside position",       body: "If the vehicle is positioned in a live lane, on a dangerous curve, or in a location where a roadside change would expose the driver to serious risk, we move the vehicle by tow before any tyre work is considered." },
                    { title: "Possible additional damage",     body: "Driving briefly on a flat can cause suspension, brake, or body damage beyond the tyre itself. If other damage is suspected, a shop inspection before driving further is the right call." },
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
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Flat Tire Assistance in Surrey and Nearby Areas</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  We provide flat tire assistance across{" "}
                  <Link href="/locations/surrey" className="font-semibold text-amber-600 hover:text-amber-700">Surrey</Link> —
                  including Guildford, Newton, Fleetwood, South Surrey, and Cloverdale — and the wider
                  Lower Mainland including{" "}
                  <Link href="/locations/langley" className="font-semibold text-amber-600 hover:text-amber-700">Langley</Link>,{" "}
                  <Link href="/locations/burnaby" className="font-semibold text-amber-600 hover:text-amber-700">Burnaby</Link>,{" "}
                  <Link href="/locations/delta" className="font-semibold text-amber-600 hover:text-amber-700">Delta</Link>,{" "}
                  <Link href="/locations/white-rock" className="font-semibold text-amber-600 hover:text-amber-700">White Rock</Link>,{" "}
                  <Link href="/locations/richmond" className="font-semibold text-amber-600 hover:text-amber-700">Richmond</Link>,{" "}
                  <Link href="/locations/coquitlam" className="font-semibold text-amber-600 hover:text-amber-700">Coquitlam</Link>, and{" "}
                  <Link href="/locations/vancouver" className="font-semibold text-amber-600 hover:text-amber-700">Vancouver</Link>.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  We respond to flat tyres on highway shoulders and interchanges — Highway 1, Highway 99,
                  Fraser Highway, and King George Boulevard — as well as in parking lots, driveways, and
                  on residential streets. If the shoulder is unsafe for a roadside change, we tow the
                  vehicle to a safe location first.
                </p>
              </div>

              {/* H2: What Happens When You Call */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">What Happens When You Call TowingNo.1</h2>
                <ol className="space-y-4">
                  {[
                    { step: "1", title: "Call (778) 838-0014",                body: "A dispatcher answers 24/7. Tell them you have a flat tyre and give your location." },
                    { step: "2", title: "Location and situation confirmed",    body: "We ask for your exact location — nearest intersection, exit number, or address — and whether you have a usable spare. This determines what we send." },
                    { step: "3", title: "Upfront quote provided",              body: "We give you a flat-rate price before anyone is dispatched. You know the cost before the truck leaves." },
                    { step: "4", title: "Appropriate help dispatched",         body: "We send the nearest available technician with the right equipment for your situation." },
                    { step: "5", title: "Tyre situation assessed on-site",     body: "The technician assesses the tyre and wheel damage, determines whether an on-site spare change is feasible and safe, and carries it out if so." },
                    { step: "6", title: "Tow arranged if needed",              body: "If a roadside change is not possible, we arrange a tow to the nearest open tyre shop, with your agreement and a confirmed quote." },
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
                <h2 className="text-2xl font-extrabold text-navy-900 mb-6">Flat Tire Assistance FAQs</h2>
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
                <Link href="/services/lockout-service" className="font-semibold text-amber-600 hover:text-amber-700">Lockout service</Link>
                <Link href="/services/fuel-delivery" className="font-semibold text-amber-600 hover:text-amber-700">Fuel delivery</Link>
                <Link href="/services/vehicle-transport" className="font-semibold text-amber-600 hover:text-amber-700">Vehicle transport</Link>
                <Link href="/services/accident-recovery" className="font-semibold text-amber-600 hover:text-amber-700">Accident recovery</Link>
                <Link href="/locations/surrey" className="font-semibold text-amber-600 hover:text-amber-700">Towing Surrey</Link>
                <Link href="/locations/langley" className="font-semibold text-amber-600 hover:text-amber-700">Towing Langley</Link>
                <Link href="/contact" className="font-semibold text-amber-600 hover:text-amber-700">Request online</Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-navy-950 rounded-2xl p-6 text-white sticky top-24">
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">Available Now</p>
                <h3 className="text-xl font-extrabold mb-3">Flat Tire?</h3>
                <p className="text-slate-300 text-sm mb-5">
                  24/7 flat tire assistance across Surrey and the Lower Mainland. Free upfront quote before dispatch.
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
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> On-site or tow to shop</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> All vehicle types</li>
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
                    { href: "/services/lockout-service",      label: "Lockout Service" },
                    { href: "/services/fuel-delivery",        label: "Fuel Delivery" },
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
