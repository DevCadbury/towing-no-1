import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Winching & Extraction Surrey | Stuck in Ditch or Snow — 24/7",
  description:
    "Vehicle stuck in a ditch, mud, or snow in Surrey or the Lower Mainland? TowingNo.1 provides 24/7 winching and extraction. Fast dispatch, upfront pricing. Call (778) 838-0014.",
  alternates: { canonical: "https://www.towingno1.com/services/winching-extraction" },
  openGraph: {
    type: "website",
    url: "https://www.towingno1.com/services/winching-extraction",
    title: "Winching & Extraction Surrey | Stuck in Ditch or Snow — 24/7",
    description: "24/7 winching and extraction in Surrey and the Lower Mainland. We pull your vehicle out of ditches, mud, and snow safely.",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.towingno1.com/services/winching-extraction#service",
  name: "Winching & Extraction Service Surrey",
  serviceType: "Vehicle Winching and Extraction",
  description: "24/7 winching and extraction for vehicles stuck in ditches, mud, snow, or off-road across Surrey and the Lower Mainland.",
  provider: { "@id": "https://www.towingno1.com/#localbusiness" },
  areaServed: [
    { "@type": "City", name: "Surrey" },
    { "@type": "City", name: "Langley" },
    { "@type": "City", name: "Burnaby" },
    { "@type": "City", name: "Maple Ridge" },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.towingno1.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://www.towingno1.com/services" },
    { "@type": "ListItem", position: 3, name: "Winching & Extraction", item: "https://www.towingno1.com/services/winching-extraction" },
  ],
};

export default function WinchingExtractionPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="relative h-[380px] flex items-center overflow-hidden bg-navy-950">
        <Image src="/image/Winching_Extractio.png" alt="Winching and extraction service BC — vehicle stuck in ditch being pulled out" fill className="object-cover opacity-30" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/60 to-navy-950/20" />
        <div className="relative z-10 container-custom">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-xs text-slate-400">
              <li><Link href="/" className="hover:text-amber-400 transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/services" className="hover:text-amber-400 transition-colors">Services</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-amber-400">Winching & Extraction</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-3">Heavy-Duty Recovery</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Winching &amp; Extraction — Surrey &amp; Lower Mainland
          </h1>
          <p className="text-white/80 text-lg max-w-xl">
            Stuck in a ditch, mud, or snow? We pull your vehicle out safely using professional winching equipment. Help is available around the clock right across the region.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">24/7 Winching & Extraction in Surrey, BC</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Getting stuck in a ditch, mud, or snowbank is a serious situation that requires professional equipment. Attempting to extract your vehicle without the right tools can cause additional damage. TowingNo.1 dispatches a trained winching crew in <strong>under 15 minutes</strong> to pull your vehicle out safely.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  We use professional-grade winching equipment and proper techniques to extract your vehicle without causing further damage. Once your vehicle is on solid ground, we assess whether it can be driven or needs to be towed.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Once your vehicle is back on solid ground, we assess whether it can be safely driven or whether it needs a tow to a shop — and we make that call honestly rather than waving you back onto the road with hidden damage.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Ditch, Mud, and Snow — Different Problems</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  A car nosed into a roadside ditch is mostly a question of angle and weight: pull from the wrong direction and you risk rolling it or tearing off a bumper, so we set the winch line to lift and draw the vehicle along the path it went in rather than dragging it sideways. Mud and soft farmland shoulders are about traction and suction — spinning the wheels only digs deeper, so we stop the digging, rig to firm anchor points, and let the winch do steady work the tires cannot.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Snow and ice add a slippery surface that makes everything less predictable. A vehicle that slid off a Westwood Plateau switchback or a Coquitlam side street often sits at an awkward tilt, and the recovery has to account for the truck itself keeping grip on the same ice. We use the angle of the slope, recovery boards under the tires where it helps, and a controlled pull so the car comes out the way it should instead of sliding further.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Technique and Safety Come First</h2>
                <p className="text-slate-600 leading-relaxed">
                  A winch line under load stores an enormous amount of energy, and a snapped cable or a failed anchor point can be genuinely dangerous to everyone nearby. That is why we keep bystanders clear, choose rated attachment points on the frame rather than fragile body panels, and use a steady, controlled pull instead of a sudden jerk that can shock-load the rigging. Trying to free a stuck vehicle with a tow strap and another truck is exactly how people bend frames and hurt themselves; the right equipment, used patiently, recovers the vehicle without turning one problem into two.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {[
                    { q: "Can you get my car out without damaging it?", a: "In most cases, yes. We pull from rated points and control the line carefully so the vehicle comes out the way it went in. We will always flag any risk before we start rather than gamble with your car." },
                    { q: "My car is stuck in snow — can I just be towed out?", a: "Not always safely. A buried or angled vehicle usually needs a proper winch pull rather than a tow strap, which can snap or bend the frame. Our winch trucks are built for exactly this." },
                    { q: "Will I be able to drive after you pull it out?", a: "Often yes, but we check first. If the extraction reveals bent suspension, a punctured tire, or fluid loss, we recommend a tow to a shop so you are not driving something unsafe." },
                  ].map((faq) => (
                    <div key={faq.q} className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                      <h3 className="font-bold text-navy-900 mb-2 text-sm">{faq.q}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">When You Need Winching</h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {["Vehicle stuck in a ditch", "Stuck in mud or soft ground", "Stuck in snow or ice", "Off-road recovery", "Vehicle over an embankment", "Post-accident extraction"].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-slate-700">
                      <span className="w-5 h-5 rounded-full bg-amber-400/20 border border-amber-400 flex items-center justify-center shrink-0" aria-hidden="true">
                        <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5"><path d="M2 6l3 3 5-5" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-navy-950 rounded-2xl p-6 text-white sticky top-24">
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">Available Now</p>
                <h3 className="text-xl font-extrabold mb-3">Stuck?</h3>
                <p className="text-slate-300 text-sm mb-5">We dispatch in under 15 minutes. Free quote before dispatch.</p>
                <a href="tel:+17788380014" className="btn-call-highlight flex items-center justify-center gap-2 w-full rounded-xl py-3.5 px-5 text-sm font-bold">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  (778) 838-0014
                </a>
                <ul className="mt-5 space-y-2 text-xs text-slate-400">
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> Under 15 min response</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> Professional equipment</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> Minimal vehicle damage</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> 24/7 including holidays</li>
                </ul>
              </div>
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                <h3 className="font-bold text-navy-900 mb-3 text-sm">Other Services</h3>
                <ul className="space-y-2">
                  {[
                    { href: "/services/emergency-towing", label: "Emergency Towing" },
                    { href: "/services/battery-boost", label: "Battery Boost" },
                    { href: "/services/lockout-service", label: "Lockout Service" },
                    { href: "/services/flat-tire-help", label: "Flat Tire Help" },
                    { href: "/services/fuel-delivery", label: "Fuel Delivery" },
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
