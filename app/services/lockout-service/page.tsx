import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { faqPageSchema, type FaqItem } from "@/lib/faq";
import { serviceAreaCompact } from "@/lib/service-areas";

export const metadata: Metadata = {
  title: {
    absolute: "Car Lockout Service | 24/7 Roadside Help | TowingNo.1",
  },
  description:
    "Locked out of your car in Surrey or the Lower Mainland? TowingNo.1 provides 24/7 vehicle lockout assistance — we open your vehicle safely without damage. Call 778-838-0014.",
  alternates: { canonical: "https://www.towingno1.com/services/lockout-service" },
  keywords: [],
  openGraph: {
    type: "website",
    url: "https://www.towingno1.com/services/lockout-service",
    title: "Car Lockout Service | 24/7 Roadside Help | TowingNo.1",
    description:
      "24/7 car lockout assistance in Surrey and the Lower Mainland. Professional tools, no damage to your vehicle. Call 778-838-0014.",
    images: [{ url: "/image/Lockout_Servic.png", alt: "Car lockout service — technician helping a driver locked out of their vehicle" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Car Lockout Service | 24/7 Roadside Help | TowingNo.1",
    description:
      "24/7 car lockout assistance across Surrey and the Lower Mainland. Professional tools, no damage. Call 778-838-0014.",
    images: ["/image/Lockout_Servic.png"],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.towingno1.com/services/lockout-service#service",
  name: "Car Lockout Service",
  serviceType: "Vehicle Lockout",
  description:
    "24/7 car lockout assistance for all vehicles across Surrey and the Lower Mainland. Professional tools used to open your vehicle without damage.",
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
    q: "Can you help if I locked my keys in my car?",
    a: "Yes. We provide vehicle lockout assistance 24/7 across Surrey and the Lower Mainland. Call (778) 838-0014, tell the dispatcher your location and vehicle make, and we arrange to send a technician with the appropriate tools to open your vehicle safely.",
  },
  {
    q: "Do you provide 24/7 lockout assistance?",
    a: "Yes. TowingNo.1 operates 24 hours a day, 7 days a week — including evenings, weekends, and all statutory holidays. Whether you are locked out at midday in a Guildford parking lot or late at night on a Surrey residential street, call (778) 838-0014 and we will answer.",
  },
  {
    q: "What should I do if I lost my car keys?",
    a: "If your keys are lost rather than locked inside the vehicle, we can still help you gain access to the car using professional lockout tools. However, if the keys are genuinely lost and cannot be found, you will likely need a locksmith or your vehicle dealer to cut or programme a replacement key — that is beyond what roadside lockout assistance covers. We will be honest about what we can and cannot do when you call.",
  },
  {
    q: "Can you help with a vehicle that will not unlock?",
    a: "Yes, in many cases. If the door will not unlock due to a dead key fob battery, a malfunctioning central locking system, or a mechanical fault, we use professional tools to access the vehicle through the mechanical override. If the problem is an electrical fault that prevents any mechanical access, we will tell you honestly and discuss whether a tow to a dealer or auto-electrician is the right next step.",
  },
  {
    q: "What areas do you serve for lockout assistance?",
    a: "We provide car lockout assistance across Surrey, Langley, Burnaby, Delta, White Rock, Richmond, Coquitlam, Maple Ridge, Vancouver, and the wider Lower Mainland. Call (778) 838-0014 and we will confirm coverage for your specific location.",
  },
  {
    q: "When would I need towing instead of lockout assistance?",
    a: "Lockout assistance gets you back into your vehicle. If the vehicle then has a separate problem — it will not start, has a flat tyre, has run out of fuel, or has been damaged — we can arrange the appropriate roadside assistance or a tow at that point. A lockout call does not automatically include a tow, but we can arrange one if it is needed.",
  },
];
const faqSchema = faqPageSchema(faq);

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",            item: "https://www.towingno1.com" },
    { "@type": "ListItem", position: 2, name: "Services",        item: "https://www.towingno1.com/services" },
    { "@type": "ListItem", position: 3, name: "Lockout Service", item: "https://www.towingno1.com/services/lockout-service" },
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

export default function LockoutServicePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950 pt-[76px]">
        <Image
          src="/image/Lockout_Servic.png"
          alt="Car lockout service — technician helping a driver access their locked vehicle"
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
              <li className="text-amber-400">Lockout Service</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-3">24/7 Service</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            24/7 Car Lockout Service
          </h1>
          <p className="text-white/80 text-lg max-w-xl mb-8">
            Locked out of your vehicle? TowingNo.1 provides professional car lockout assistance across
            Surrey and the Lower Mainland around the clock. We open your vehicle using professional
            tools without causing damage to the door, lock, or window.
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

              {/* H2: Locked Out of Your Vehicle? */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Locked Out of Your Vehicle?</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  A vehicle lockout is one of the most stressful roadside situations — especially late at
                  night, in an unfamiliar location, or when a child or pet is inside the car. The good
                  news is that most lockouts can be resolved on the spot with the right tools and
                  without any damage to the vehicle.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Common situations that lead to a lockout call include:
                </p>
                <ul className="space-y-3 mb-4">
                  {[
                    { title: "Keys locked inside the vehicle",       body: "The most common lockout — keys left in the ignition, on the seat, or in the boot while the doors locked behind you." },
                    { title: "Keys locked in the boot/trunk",        body: "Loading or unloading with the doors open, then closing the boot with the keys inside and hearing the central locking engage." },
                    { title: "Dead key fob battery",                 body: "Push-button and keyless-entry vehicles will not respond to a fob with a dead battery. The mechanical override is often hidden behind a trim cap on the door handle." },
                    { title: "Keys lost or misplaced",               body: "If you cannot find your keys at all, we can still open the vehicle using professional tools. Replacing the keys is a separate step requiring a locksmith or dealer." },
                    { title: "Key damaged or will not turn",         body: "A worn or damaged mechanical key that no longer operates the lock may require professional tools to work around. Key cutting or replacement is beyond roadside scope." },
                    { title: "Central locking malfunction",          body: "An electrical or mechanical fault that prevents the doors from unlocking through normal methods. We attempt access using the mechanical override where available." },
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
                  describe your situation. A dispatcher will confirm your location and send a technician
                  with the appropriate tools.
                </p>
              </div>

              {/* H2: Our Vehicle Lockout Assistance */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Our Vehicle Lockout Assistance</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  We provide professional on-site vehicle access using lockout tools — not improvised
                  methods that risk damaging the door, window, or weatherstripping. Our technicians
                  are familiar with the entry points and mechanical overrides on common makes and
                  models, including modern push-button and keyless-entry vehicles.
                </p>

                <div className="space-y-4 mb-5">
                  {[
                    {
                      title: "On-site door opening",
                      body: "We use a cushioned door wedge and long-reach tools to create a safe gap and operate the interior handle or unlock button, exactly as the door is designed to be opened from inside. The weatherstripping remains undamaged, no glass is under pressure, and nothing is forced.",
                    },
                    {
                      title: "Keyless and push-button vehicles",
                      body: "Most keyless-entry vehicles have a mechanical backup — a key blade inside the fob and a concealed keyhole on the door handle. We know where these are located on common makes. If the fob is dead, we use the mechanical override to open the door.",
                    },
                    {
                      title: "All makes and models",
                      body: "We handle standard key-cylinder vehicles, transponder-key cars, push-button starters, and keyless-entry systems. For rare or unusual vehicles where our standard approach is not viable, we will tell you before attempting anything.",
                    },
                    {
                      title: "What we do not cover",
                      body: "Key cutting, key programming, transponder coding, and ignition repair are specialist locksmith or dealer services that go beyond roadside lockout assistance. If your situation requires one of these, we will tell you honestly and can arrange a tow to the appropriate professional.",
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
                    "Keys locked inside the car",
                    "Keys locked in the trunk",
                    "Dead key fob battery",
                    "All makes and models",
                    "Keyless-entry vehicles",
                    "Available 24/7 including holidays",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-slate-700">
                      <Check /> {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* H2: What To Do If You Are Locked Out */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">What To Do If You Are Locked Out</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Most lockouts are not emergencies in the traffic-safety sense, but a few practical
                  steps will keep you comfortable and safe until help arrives:
                </p>
                <ol className="space-y-4 mb-4">
                  {[
                    { step: "1", title: "Move to a safe location if possible",    body: "If you are on a roadside or in a position where you feel unsafe, move away from traffic before calling. A parking lot, petrol station, or side street is better than a busy road shoulder." },
                    { step: "2", title: "Keep your personal belongings secure",   body: "If you have valuables visible through the windows, note their position so you can retrieve them once the vehicle is open. There is no need to attempt anything that could damage the car." },
                    { step: "3", title: "Do not attempt to force the door",       body: "Coat hangers, screwdrivers, and improvised tools almost always cause more damage than they prevent. A bent door frame or gouged window seal is expensive to repair. Wait for a professional with proper equipment." },
                    { step: "4", title: "Call (778) 838-0014",                    body: "Give the dispatcher your location — nearest intersection or address — and your vehicle make and model. This helps the technician come prepared with the right tools for your specific vehicle." },
                    { step: "5", title: "Wait in a safe, visible spot",           body: "Stay near the vehicle where the technician can easily find you. If the weather is poor, a nearby covered area is fine — just let the dispatcher know when you call." },
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

              {/* H2: How We Open a Car Without Damage */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">How We Open a Car Without Damage</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  The improvised methods people remember — a coat hanger gouging the window seal, a
                  screwdriver levering the door frame — cause expensive damage because they use
                  uncontrolled force against surfaces that are not designed for it. Professional
                  lockout tools work with the door&apos;s own mechanism rather than against it.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  We use a cushioned door wedge to create a small controlled gap at the top of the door
                  frame — a few millimetres, applied gradually — and a long-reach tool to operate the
                  interior handle, lock button, or unlock switch directly. The door opens the same way
                  it would from inside. The weatherstripping stays intact, no glass is placed under
                  pressure, and nothing is forced. If a particular vehicle design makes this approach
                  unsafe, we say so before attempting anything.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  We also confirm the caller owns the vehicle or has authority to access it before
                  opening any car. This is a standard part of the process and protects both you and us.
                </p>
              </div>

              {/* H2: When a Lockout Becomes a Towing Situation */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">When a Lockout Becomes a Towing Situation</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Most lockouts are resolved on the spot — you get back into the vehicle and drive away.
                  But sometimes getting back in reveals a second problem that prevents the vehicle from
                  being driven:
                </p>
                <ul className="space-y-3 mb-5">
                  {[
                    { title: "Dead battery",      body: "Leaving the ignition on accessory mode while locked out can drain the battery. If the car will not start after we open it, we can attempt a battery boost on the spot." },
                    { title: "Empty fuel tank",   body: "If the vehicle ran out of fuel before the lockout occurred, we can arrange a fuel delivery once the door is open." },
                    { title: "Mechanical fault",  body: "If the vehicle has an underlying mechanical problem that prevented it being driven before the lockout, opening the door does not fix that. We can arrange a tow to a shop." },
                    { title: "Flat tyre",         body: "A flat tyre discovered after opening the vehicle can be addressed with our roadside tyre assistance or a tow to a tyre shop." },
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
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Lockout Service in Surrey and Nearby Areas</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  We provide car lockout assistance across{" "}
                  <Link href="/locations/surrey" className="font-semibold text-amber-600 hover:text-amber-700">Surrey</Link> —
                  including Guildford, Newton, Cloverdale, Fleetwood, Whalley, and South Surrey — and
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
                  Whether you are locked out in a Guildford Town Centre parking lot, outside a
                  Willoughby strata complex, or on a residential street in Langley City — call us
                  with your location and we will dispatch accordingly.
                </p>
              </div>

              {/* H2: What Happens When You Call */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">What Happens When You Call TowingNo.1</h2>
                <ol className="space-y-4">
                  {[
                    { step: "1", title: "Call (778) 838-0014",                   body: "A dispatcher answers 24/7. Tell them you are locked out and give your location." },
                    { step: "2", title: "Location and vehicle confirmed",         body: "We ask for your exact location and your vehicle make and model so the technician can come prepared for your specific entry system." },
                    { step: "3", title: "Upfront quote provided",                 body: "We give you a flat-rate price for the lockout service before anyone is dispatched. No surprises on arrival." },
                    { step: "4", title: "Technician dispatched",                  body: "We send the nearest available technician with the appropriate lockout tools for your vehicle." },
                    { step: "5", title: "Vehicle access restored",                body: "The technician opens your vehicle using professional tools without damaging the door, lock, or window, and confirms you are safely back inside." },
                    { step: "6", title: "Further assistance arranged if needed",  body: "If a secondary problem is discovered — flat tyre, dead battery, empty tank — we can arrange the appropriate roadside service or a tow." },
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
                <h2 className="text-2xl font-extrabold text-navy-900 mb-6">Car Lockout FAQs</h2>
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
                <Link href="/services/flat-tire-help" className="font-semibold text-amber-600 hover:text-amber-700">Flat tire help</Link>
                <Link href="/services/fuel-delivery" className="font-semibold text-amber-600 hover:text-amber-700">Fuel delivery</Link>
                <Link href="/services/vehicle-transport" className="font-semibold text-amber-600 hover:text-amber-700">Vehicle transport</Link>
                <Link href="/services/accident-recovery" className="font-semibold text-amber-600 hover:text-amber-700">Accident recovery</Link>
                <Link href="/services/winching-extraction" className="font-semibold text-amber-600 hover:text-amber-700">Winching & extraction</Link>
                <Link href="/locations/surrey" className="font-semibold text-amber-600 hover:text-amber-700">Towing Surrey</Link>
                <Link href="/locations/langley" className="font-semibold text-amber-600 hover:text-amber-700">Towing Langley</Link>
                <Link href="/contact" className="font-semibold text-amber-600 hover:text-amber-700">Request online</Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-navy-950 rounded-2xl p-6 text-white sticky top-24">
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">Available Now</p>
                <h3 className="text-xl font-extrabold mb-3">Locked Out?</h3>
                <p className="text-slate-300 text-sm mb-5">
                  24/7 car lockout assistance across Surrey and the Lower Mainland. Free upfront quote before dispatch.
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
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> No damage to your vehicle</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> All makes and models</li>
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
                    { href: "/services/flat-tire-help",       label: "Flat Tire Help" },
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
