"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { isVerified, serviceArea } from "@/lib/business-facts";

// Register F-06 VERIFIED: the 15 owner-confirmed places (A-227).
const serviceAreaNames = serviceArea.filter(isVerified).map((p) => p.value);
const serviceAreaList = `${serviceAreaNames.slice(0, -1).join(", ")} and ${serviceAreaNames[serviceAreaNames.length - 1]}`;

export default function AboutContent() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-navy-950">
          <Image
            src="/assets/about-team.jpg"
            alt="TowingNo.1 team serving the Lower Mainland"
            fill
            className="object-cover object-top md:object-center opacity-30"
            sizes="100vw"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/50 to-navy-950" />
          <div className="absolute bottom-0 left-[30%] w-[400px] h-[400px] bg-amber-500/8 blur-[100px] rounded-full" />
        </div>

        <div className="relative z-10 container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-amber-400 font-semibold text-sm uppercase tracking-widest mb-4 block">Our Story</span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              About <span className="text-gradient-gold">TowingNo.1</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-light">
              Serving the Lower Mainland with pride, professionalism, and speed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-4 block">Surrey, BC</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-navy-900">Our Story</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mb-8 rounded-full" />
              <div className="space-y-5 text-lg text-slate-600 leading-relaxed">
                <p>
                  TowingNo.1 is a towing and roadside assistance company in Surrey, BC. Our aim is simple: honest, careful help for drivers who are stranded and stressed, with a clear answer, wherever possible, on price and what happens next before anyone is sent.
                </p>
                <p>
                  We treat every customer like family, because when you call us you are likely having a bad day.
                </p>
                <p>
                  We take calls for {serviceAreaList}. The work ranges from light-duty wheel-lift towing for cars, SUVs and light trucks to roadside jobs such as a battery boost, a spare-tire change, or winching a vehicle out of a ditch. TowingNo.1 is licensed and insured.
                </p>
                <p>
                  When you call, the dispatcher takes your location, your vehicle details, and the problem. Wherever possible we give you a flat rate quote before we dispatch, based on the location, vehicle, and service you describe. If conditions on site differ materially from what was described, the price may be adjusted, and the driver explains any change before going ahead. Pay the driver directly by cash, credit card, debit card, contactless, Apple Pay or Google Pay.
                </p>
                <p>
                  We send the nearest available driver. Arrival times vary by location and road conditions, so ask the dispatcher for a current estimate when you call.
                </p>
                <p>
                  Reputation is earned one call at a time. We aim to be clear about price, honest about timing, and careful with your vehicle on every job.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-[500px] rounded-2xl overflow-hidden shadow-card-hover group"
            >
              <Image
                src="/assets/about-fleet.jpg"
                alt="TowingNo.1 tow truck in British Columbia"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className="bg-amber-500 text-navy-900 px-4 py-2 rounded-full text-sm font-bold">Serving BC</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-4 block">What Drives Us</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-navy-900">Our Core Values</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              The principles that drive every service call we answer.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                imageSrc: "/assets/Safety_First.png",
                imageAlt: "Safety First",
                title: "Safety First",
                desc: "We never compromise on safety. Every call is handled with care for you, your vehicle, and other road users.",
              },
              {
                imageSrc: "/assets/Rapid_Response.png",
                imageAlt: "Rapid Response",
                title: "Rapid Response",
                desc: "We know time matters when you are stuck. We send the nearest available driver; arrival times vary by location and road conditions.",
              },
              {
                imageSrc: "/assets/Integrity.png",
                imageAlt: "Integrity",
                title: "Integrity",
                desc: "Honest pricing and clear communication. Your quote is based on your location, your vehicle, and the service you need, and we explain any change before going ahead.",
              },
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card group hover:shadow-card-hover flex flex-col h-full"
              >
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden mb-6 bg-white border border-slate-200 shadow-sm">
                  <Image
                    src={value.imageSrc}
                    alt={value.imageAlt}
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    sizes="80px"
                  />
                </div>
                <h3 className="text-xl font-bold mb-3 text-navy-900">{value.title}</h3>
                <p className="text-slate-500 leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials & Trust Signals */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-4 block">How We Work</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-navy-900">What to Expect When You Call</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              The same steps apply whether you need a tow or help at the roadside.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: "24/7 Dispatch",
                body: "Call (778) 838-0014 at any hour, any day of the week. Tell the dispatcher where you are, what you drive, and what has gone wrong.",
              },
              {
                title: "A Quote Before Dispatch, Wherever Possible",
                body: "Wherever possible we give you a flat rate quote before we dispatch, based on the location, vehicle, and service you describe. If conditions on site differ materially, the driver explains any change before going ahead.",
              },
              {
                title: "Nearest Available Driver",
                body: "We send the nearest available driver. Arrival times vary by location and road conditions.",
              },
              {
                title: "Light-Duty Wheel-Lift Towing",
                body: "Tell the dispatcher your vehicle type, and whether it is electric, all-wheel drive, or damaged. Those details help the driver plan the tow.",
              },
              {
                title: "Payment at the Job",
                body: "Pay the driver directly by cash, credit card, debit card, contactless, Apple Pay or Google Pay.",
              },
              {
                title: "Accident Tows",
                body: "After a collision we take your vehicle where you choose, such as a repair shop, your home, or an ICBC or storage facility you pick, and give you a tow bill. What happens after that is between you and your insurer.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <h3 className="font-bold text-navy-900 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-10">
            <span className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-4 block">Where We Work</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-navy-900">Lower Mainland Service Areas</h2>
            <p className="text-lg text-slate-500 max-w-xl mx-auto">
              We provide towing and roadside help across Surrey, Langley, and the wider Lower Mainland.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto mb-8">
            {[
              { href: "/locations/surrey",       label: "Surrey" },
              { href: "/locations/langley",      label: "Langley" },
              { href: "/locations/burnaby",      label: "Burnaby" },
              { href: "/locations/richmond",     label: "Richmond" },
              { href: "/locations/delta",        label: "Delta" },
              { href: "/locations/white-rock",   label: "White Rock" },
              { href: "/locations/coquitlam",    label: "Coquitlam" },
              { href: "/locations/maple-ridge",  label: "Maple Ridge" },
              { href: "/locations/vancouver",    label: "Vancouver" },
              { href: "/locations/cloverdale",   label: "Cloverdale" },
            ].map((area) => (
              <a
                key={area.href}
                href={area.href}
                className="text-sm font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-4 py-2 hover:bg-amber-100 transition-colors"
              >
                {area.label}
              </a>
            ))}
          </div>
          <p className="text-center text-sm text-slate-500">
            Not sure if we cover your area? Call{" "}
            <a href="tel:+17788380014" className="text-amber-600 font-semibold hover:underline">(778) 838-0014</a>
            {" "}and we&apos;ll confirm before you commit.
          </p>
        </div>
      </section>

      {/* From Our Blog */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-10">
            <span className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-4 block">From Our Blog</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-navy-900">Road Safety &amp; Towing Advice</h2>
            <p className="text-lg text-slate-500 max-w-xl mx-auto">
              Practical guides from our Lower Mainland roadside experience.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                href: "/blog/bc-winter-roadside-safety-checklist",
                category: "Seasonal",
                title: "BC Winter Roadside Safety Checklist",
                excerpt: "Preseason vehicle prep, emergency kit essentials, and what to do if you get stranded in BC winter conditions.",
              },
              {
                href: "/blog/what-to-do-after-car-accident-bc",
                category: "Road Safety",
                title: "What to Do After a Car Accident in BC",
                excerpt: "Scene safety, ICBC reporting, exchanging information, and when to call for an accident tow.",
              },
              {
                href: "/blog/electric-vehicle-towing-bc",
                category: "Towing Advice",
                title: "EV and Hybrid Towing in BC",
                excerpt: "Why EVs require flatbed transport, how Transport Mode works, and what to do when an EV runs out of charge.",
              },
            ].map((post) => (
              <a
                key={post.href}
                href={post.href}
                className="group block bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-amber-300 hover:bg-amber-50/30 transition-all duration-200"
              >
                <span className="inline-block text-xs font-bold text-navy-900 bg-white border border-slate-200 px-3 py-1 rounded-full mb-3">{post.category}</span>
                <h3 className="font-bold text-navy-900 mb-2 group-hover:text-amber-600 transition-colors leading-snug">{post.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{post.excerpt}</p>
              </a>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="/blog" className="inline-flex items-center gap-2 text-amber-600 font-bold hover:text-amber-700 transition-colors">
              View all articles
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4" aria-hidden="true"><path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd"/></svg>
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-navy-950">
          <Image
            src="/assets/about-cta.jpg"
            alt="TowingNo.1 dispatchers ready to help"
            fill
            className="object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 to-navy-900/90" />
        </div>
        <div className="container-custom relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Need a tow or roadside help?</h2>
            <p className="text-lg mb-10 max-w-2xl mx-auto text-slate-300">
              Call any time, 24/7, and we will send the nearest available driver.
            </p>
            <a
              href="tel:+17788380014"
              className="inline-flex items-center gap-3 btn-amber text-lg py-4 px-12 !rounded-full shadow-glow-amber"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              (778) 838-0014
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
