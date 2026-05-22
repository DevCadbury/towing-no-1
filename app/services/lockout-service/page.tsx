import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Car Lockout Service Surrey | Keys Locked Inside — We Help 24/7",
  description:
    "Locked your keys in your car in Surrey or the Lower Mainland? TowingNo.1 opens your vehicle safely without damage. 24/7 dispatch, upfront pricing. Call (778) 838-0014.",
  alternates: { canonical: "https://www.towingno1.com/services/lockout-service" },
  openGraph: {
    type: "website",
    url: "https://www.towingno1.com/services/lockout-service",
    title: "Car Lockout Service Surrey | Keys Locked Inside — We Help 24/7",
    description: "24/7 car lockout service in Surrey and the Lower Mainland. We open your vehicle safely without damage.",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.towingno1.com/services/lockout-service#service",
  name: "Car Lockout Service Surrey",
  serviceType: "Vehicle Lockout",
  description: "24/7 car lockout service for all vehicles across Surrey and the Lower Mainland. We open your vehicle safely without damage using professional tools.",
  provider: { "@id": "https://www.towingno1.com/#localbusiness" },
  areaServed: [
    { "@type": "City", name: "Surrey" },
    { "@type": "City", name: "Langley" },
    { "@type": "City", name: "Burnaby" },
    { "@type": "City", name: "Richmond" },
    { "@type": "City", name: "Delta" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How fast can you unlock my car in Surrey?",
      acceptedAnswer: { "@type": "Answer", text: "Our average response time for lockout service in Surrey is under 15 minutes. Call (778) 838-0014 and we dispatch immediately." },
    },
    {
      "@type": "Question",
      name: "Will you damage my car opening it?",
      acceptedAnswer: { "@type": "Answer", text: "No. Our technicians use professional tools and techniques to open your vehicle without causing any damage to the lock, door, or window." },
    },
    {
      "@type": "Question",
      name: "How much does lockout service cost in Surrey?",
      acceptedAnswer: { "@type": "Answer", text: "We use flat-rate pricing with no hidden fees. Call (778) 838-0014 for an instant quote before we dispatch." },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.towingno1.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://www.towingno1.com/services" },
    { "@type": "ListItem", position: 3, name: "Lockout Service", item: "https://www.towingno1.com/services/lockout-service" },
  ],
};

export default function LockoutServicePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="relative h-[380px] flex items-center overflow-hidden bg-navy-950">
        <Image src="/image/Lockout_Servic.png" alt="Car lockout service Surrey — keys locked inside vehicle" fill className="object-cover opacity-30" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/60 to-navy-950/20" />
        <div className="relative z-10 container-custom">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-xs text-slate-400">
              <li><Link href="/" className="hover:text-amber-400 transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/services" className="hover:text-amber-400 transition-colors">Services</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-amber-400">Lockout Service</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-3">No Damage Guaranteed</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Car Lockout Service — Surrey &amp; Lower Mainland
          </h1>
          <p className="text-white/80 text-lg max-w-xl">
            Locked your keys inside? We open your vehicle safely without damage in under 15 minutes. Available 24/7 across Surrey and the Lower Mainland.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">24/7 Car Lockout Service in Surrey, BC</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Locking your keys inside your car is stressful — especially in a parking lot, at the side of the road, or late at night. TowingNo.1 dispatches a trained technician to your location in <strong>under 15 minutes</strong> to open your vehicle safely without causing any damage.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Our technicians use professional-grade tools and proven techniques to unlock all makes and models — from standard sedans to modern keyless-entry vehicles. We handle your car with care and get you back on the road quickly.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  We cover all of Surrey including Guildford, Newton, Fleetwood, Cloverdale, and South Surrey, as well as Langley, Burnaby, Richmond, Coquitlam, White Rock, Delta, and Vancouver.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">What We Handle</h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {["Keys locked inside the car", "Keys locked in the trunk", "Broken key in the lock", "All makes and models", "Keyless entry vehicles", "Available 24/7 including holidays"].map((item) => (
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
                <h2 className="text-2xl font-extrabold text-navy-900 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {[
                    { q: "How fast can you unlock my car in Surrey?", a: "Our average response time for lockout service in Surrey is under 15 minutes. Call (778) 838-0014 and we dispatch immediately." },
                    { q: "Will you damage my car opening it?", a: "No. Our technicians use professional tools and techniques to open your vehicle without causing any damage to the lock, door, or window." },
                    { q: "How much does lockout service cost in Surrey?", a: "We use flat-rate pricing with no hidden fees. Call (778) 838-0014 for an instant quote before we dispatch." },
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
                <h3 className="text-xl font-extrabold mb-3">Locked Out?</h3>
                <p className="text-slate-300 text-sm mb-5">We dispatch in under 15 minutes. Free quote before we send a technician.</p>
                <a href="tel:+17788380014" className="btn-call-highlight flex items-center justify-center gap-2 w-full rounded-xl py-3.5 px-5 text-sm font-bold">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  (778) 838-0014
                </a>
                <ul className="mt-5 space-y-2 text-xs text-slate-400">
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> Under 15 min response</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> No damage guaranteed</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> All makes and models</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> 24/7 including holidays</li>
                </ul>
              </div>
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                <h3 className="font-bold text-navy-900 mb-3 text-sm">Other Services</h3>
                <ul className="space-y-2">
                  {[
                    { href: "/services/emergency-towing", label: "Emergency Towing" },
                    { href: "/services/battery-boost", label: "Battery Boost" },
                    { href: "/services/flat-tire-help", label: "Flat Tire Help" },
                    { href: "/services/fuel-delivery", label: "Fuel Delivery" },
                    { href: "/services/winching-extraction", label: "Winching & Extraction" },
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
