import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Flat Tire Help Surrey | 24/7 Roadside Tire Change Near Me",
  description:
    "Flat tire in Surrey or the Lower Mainland? TowingNo.1 changes your tire on-site or tows you to the nearest shop. 24/7 dispatch, upfront pricing. Call (778) 838-0014.",
  alternates: { canonical: "https://www.towingno1.com/services/flat-tire-help" },
  openGraph: {
    type: "website",
    url: "https://www.towingno1.com/services/flat-tire-help",
    title: "Flat Tire Help Surrey | 24/7 Roadside Tire Change Near Me",
    description: "24/7 flat tire help in Surrey and the Lower Mainland. On-site tire change or tow to the nearest shop.",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.towingno1.com/services/flat-tire-help#service",
  name: "Flat Tire Help Surrey",
  serviceType: "Flat Tire Roadside Assistance",
  description: "24/7 flat tire help across Surrey and the Lower Mainland. On-site tire change or tow to the nearest tire shop. Fast dispatch, upfront pricing.",
  provider: { "@id": "https://www.towingno1.com/#localbusiness" },
  areaServed: [
    { "@type": "City", name: "Surrey" },
    { "@type": "City", name: "Langley" },
    { "@type": "City", name: "Burnaby" },
    { "@type": "City", name: "Richmond" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How fast can you help with a flat tire in Surrey?",
      acceptedAnswer: { "@type": "Answer", text: "Our average response time for flat tire help in Surrey is under 15 minutes. Call (778) 838-0014 and we dispatch immediately." },
    },
    {
      "@type": "Question",
      name: "What if I don't have a spare tire?",
      acceptedAnswer: { "@type": "Answer", text: "If you don't have a spare tire, we tow your vehicle to the nearest tire shop. We'll give you an upfront quote before dispatch." },
    },
    {
      "@type": "Question",
      name: "Can you help with a flat tire on the highway?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. We respond to flat tires on Highway 99, King George Boulevard, Fraser Highway, and all major Surrey corridors. If it's unsafe to change on the shoulder, we tow you to safety." },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.towingno1.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://www.towingno1.com/services" },
    { "@type": "ListItem", position: 3, name: "Flat Tire Help", item: "https://www.towingno1.com/services/flat-tire-help" },
  ],
};

export default function FlatTireHelpPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="relative h-[380px] flex items-center overflow-hidden bg-navy-950">
        <Image src="/image/Flat_Tire_Hel.png" alt="Flat tire roadside assistance Surrey — technician changing a tire" fill className="object-cover opacity-30" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/60 to-navy-950/20" />
        <div className="relative z-10 container-custom">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-xs text-slate-400">
              <li><Link href="/" className="hover:text-amber-400 transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/services" className="hover:text-amber-400 transition-colors">Services</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-amber-400">Flat Tire Help</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-3">Fast Response</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Flat Tire Help — Surrey &amp; Lower Mainland
          </h1>
          <p className="text-white/80 text-lg max-w-xl">
            Flat tire on the highway or in a parking lot? We change your tire on-site or tow you to the nearest shop. Available 24/7 with fast dispatch.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">24/7 Flat Tire Help in Surrey, BC</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  A flat tire can happen anywhere — on Highway 99, King George Boulevard, or in a parking lot. TowingNo.1 dispatches a technician to your location in <strong>under 15 minutes</strong> to get you back on the road safely.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  If you have a spare tire, we change it on-site. If you don&apos;t have a spare or the tire is damaged beyond a roadside fix, we tow your vehicle to the nearest tire shop. Either way, you get an upfront flat-rate quote before we dispatch.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  From the Port Mann approaches to suburban cul-de-sacs and grocery-store parking lots, our tire crews reach jobs right across the region, so you are rarely more than a short wait from help.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">What We Offer</h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {["On-site spare tire installation", "Tow to nearest tire shop", "Highway and parking lot response", "All vehicle types", "Professional tire installation", "Available 24/7 including holidays"].map((item) => (
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
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Spare, Run-Flat, or No Spare At All</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Many newer vehicles ship without a conventional spare, swapping it for a sealant kit, run-flat tires, or nothing at all to save weight. If you have a full-size or compact spare, we mount it on the spot, torque the lugs to spec, and check that your damaged wheel is stowed properly. If your kit relies on sealant, be aware it only patches small tread punctures and will not fix a blowout or a sidewall tear.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Run-flats can carry you a limited distance at reduced speed, but once the sidewall is compromised they must be replaced rather than repaired. When there is no usable spare, the safest move is a short tow to a tire shop, and we will take you to one that is open rather than leaving you stranded in a lot overnight.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Why Roadside Is Safer Than a DIY Change</h2>
                <p className="text-slate-600 leading-relaxed">
                  Changing a tire sounds simple until you are kneeling beside a live lane with traffic passing at highway speed. A jack can slip on a slope or soft shoulder, and a wheel torqued by hand rarely matches factory specification. Our technicians work from the protected side of the vehicle, use proper jack points, and confirm tightness with a torque wrench, so you drive away knowing the wheel will not loosen a few kilometres down the road.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {[
                    { q: "How fast can you help with a flat tire in Surrey?", a: "Our average response time for flat tire help in Surrey is under 15 minutes. Call (778) 838-0014 and we dispatch immediately." },
                    { q: "What if I don't have a spare tire?", a: "If you don't have a spare tire, we tow your vehicle to the nearest tire shop. We'll give you an upfront quote before dispatch." },
                    { q: "Can you help with a flat tire on the highway?", a: "Yes. We respond to flat tires on Highway 99, King George Boulevard, Fraser Highway, and all major Surrey corridors. If it's unsafe to change on the shoulder, we tow you to safety." },
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
                <h3 className="text-xl font-extrabold mb-3">Flat Tire?</h3>
                <p className="text-slate-300 text-sm mb-5">We dispatch in under 15 minutes. Free quote before dispatch.</p>
                <a href="tel:+17788380014" className="btn-call-highlight flex items-center justify-center gap-2 w-full rounded-xl py-3.5 px-5 text-sm font-bold">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  (778) 838-0014
                </a>
                <ul className="mt-5 space-y-2 text-xs text-slate-400">
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> Under 15 min response</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> On-site or tow to shop</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> All vehicle types</li>
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
