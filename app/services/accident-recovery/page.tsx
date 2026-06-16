import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Accident Recovery Towing Surrey | 24/7 Collision Towing BC",
  description:
    "Need accident recovery towing in Surrey or the Lower Mainland? TowingNo.1 handles collision scenes carefully and transports damaged vehicles safely. Call (778) 838-0014.",
  alternates: { canonical: "https://www.towingno1.com/services/accident-recovery" },
  openGraph: {
    type: "website",
    url: "https://www.towingno1.com/services/accident-recovery",
    title: "Accident Recovery Towing Surrey | 24/7 Collision Towing BC",
    description: "24/7 accident recovery towing in Surrey and the Lower Mainland. Professional collision scene handling and safe vehicle transport.",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.towingno1.com/services/accident-recovery#service",
  name: "Accident Recovery Towing Surrey",
  serviceType: "Accident Recovery",
  description: "24/7 accident recovery towing across Surrey and the Lower Mainland. Professional collision scene handling and safe transport of damaged vehicles.",
  provider: { "@id": "https://www.towingno1.com/#localbusiness" },
  areaServed: [
    { "@type": "City", name: "Surrey" },
    { "@type": "City", name: "Langley" },
    { "@type": "City", name: "Burnaby" },
    { "@type": "City", name: "Richmond" },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.towingno1.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://www.towingno1.com/services" },
    { "@type": "ListItem", position: 3, name: "Accident Recovery", item: "https://www.towingno1.com/services/accident-recovery" },
  ],
};

export default function AccidentRecoveryPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="relative h-[380px] flex items-center overflow-hidden bg-navy-950">
        <Image src="/image/Accident_Recover.png" alt="Accident recovery towing Surrey — damaged vehicle being loaded on flatbed" fill className="object-cover opacity-30" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/60 to-navy-950/20" />
        <div className="relative z-10 container-custom">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-xs text-slate-400">
              <li><Link href="/" className="hover:text-amber-400 transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/services" className="hover:text-amber-400 transition-colors">Services</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-amber-400">Accident Recovery</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-3">Expert Recovery</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Accident Recovery Towing — Surrey &amp; Lower Mainland
          </h1>
          <p className="text-white/80 text-lg max-w-xl">
            Involved in a collision? We handle accident scenes carefully and transport damaged vehicles safely to your repair shop or storage. Available 24/7.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">24/7 Accident Recovery in Surrey, BC</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  After a collision, your priority is safety. TowingNo.1 dispatches a trained recovery crew to your location in <strong>under 15 minutes</strong> to handle the scene professionally and transport your damaged vehicle safely.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  We use proper securing techniques and equipment to prevent additional damage during transport. We can tow your vehicle to any repair shop, dealership, or storage facility across Surrey and the Lower Mainland.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Even if your vehicle appears driveable after an accident, internal damage may make it unsafe. We recommend having it professionally assessed before driving.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">What We Handle</h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {["Minor fender benders", "Major collision recovery", "Damaged vehicle transport", "Safe securing techniques", "Tow to any repair shop", "Insurance coordination available"].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-slate-700">
                      <span className="w-5 h-5 rounded-full bg-amber-400/20 border border-amber-400 flex items-center justify-center shrink-0" aria-hidden="true">
                        <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5"><path d="M2 6l3 3 5-5" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">What to Do at the Scene of a Crash</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  The minutes right after a collision shape how safely everyone gets home. Switch on your hazard lights, check yourself and your passengers for injuries, and only move the vehicle if it is rolling freely and blocking live traffic. On a fast corridor like Highway 99 or the Trans-Canada, leave the car where it is, climb out on the side away from traffic, and wait behind a barrier rather than standing beside crumpled metal.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Once people are safe, photograph the resting position of each vehicle, the damage, the licence plates, and the surrounding lane markings before anything is moved. Exchange insurance and contact details with the other driver, and in British Columbia call the police whenever someone is hurt or the combined damage looks to exceed the ICBC reporting limit. Those photos and notes make your claim far smoother later.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  When you call us, tell the dispatcher whether the car is leaking fluid, sitting on a median, or tangled with a guardrail. That lets us send a flatbed and the right rigging on the first trip instead of a second callout.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">How We Recover a Damaged Vehicle</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Crash damage changes how a car must be lifted. Bent control arms, seized wheels, a dragging bumper, or a deployed airbag mean the vehicle often cannot roll or steer normally, so we favour a flatbed and a controlled winch pull rather than a quick hook-and-go. Skids and recovery boards protect the underbody, and we secure the shell at the frame instead of damaged body panels to avoid widening the damage on the way to the shop.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  We deliver to the body shop, dealership, ICBC facility, or storage yard of your choosing. If you have not decided yet, we can hold the vehicle securely until you and your adjuster agree on the next step, so a stressful day does not force a rushed decision.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {[
                    { q: "Should I drive my car after a minor accident?", a: "Only if it is clearly safe. Fluid leaks, pulling steering, grinding wheels, or warning lights point to hidden structural or mechanical damage. When in doubt, let us transport it and have a shop inspect it first." },
                    { q: "Can you tow my car to an ICBC-approved shop?", a: "Yes. We deliver to any body shop, dealership, ICBC facility, or storage yard you choose across the Lower Mainland, and we can hold the vehicle if you have not picked one yet." },
                    { q: "Do you work with my insurance claim?", a: "We provide clear documentation of the recovery and drop-off so it lines up with your ICBC or private insurer claim. Keep your photos from the scene to support it." },
                  ].map((faq) => (
                    <div key={faq.q} className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                      <h3 className="font-bold text-navy-900 mb-2 text-sm">{faq.q}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-navy-950 rounded-2xl p-6 text-white sticky top-24">
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">Available Now</p>
                <h3 className="text-xl font-extrabold mb-3">Been in an Accident?</h3>
                <p className="text-slate-300 text-sm mb-5">We dispatch in under 15 minutes. Free quote before dispatch.</p>
                <a href="tel:+17788380014" className="btn-call-highlight flex items-center justify-center gap-2 w-full rounded-xl py-3.5 px-5 text-sm font-bold">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  (778) 838-0014
                </a>
                <ul className="mt-5 space-y-2 text-xs text-slate-400">
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> Under 15 min response</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> Professional recovery crew</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> Licensed &amp; insured</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> 24/7 including holidays</li>
                </ul>
              </div>
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                <h3 className="font-bold text-navy-900 mb-3 text-sm">Other Services</h3>
                <ul className="space-y-2">
                  {[
                    { href: "/services/emergency-towing", label: "Emergency Towing" },
                    { href: "/services/winching-extraction", label: "Winching & Extraction" },
                    { href: "/services/vehicle-transport", label: "Vehicle Transport" },
                    { href: "/services/battery-boost", label: "Battery Boost" },
                    { href: "/services/lockout-service", label: "Lockout Service" },
                  ].map((s) => (
                    <li key={s.href}><Link href={s.href} className="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 shrink-0" aria-hidden="true"><path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd"/></svg> {s.label}</Link></li>
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
