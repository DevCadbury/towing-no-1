"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Counter from "@/components/Counter";
import BespokeFeatures from "@/components/BespokeFeatures";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" as const },
  }),
};

export default function HomeContent() {
  return (
    <>
      {/* ═══ HERO SECTION ═══ */}
      <section className="relative min-h-screen flex items-center text-white overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-navy-950">
          <Image
            src="https://images.unsplash.com/photo-1615900119312-2a3a7b3605d7?q=80&w=2000"
            alt="Emergency Towing Service"
            fill
            className="object-cover opacity-30"
            priority
          />
          {/* Multi-layer overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/40" />
          {/* Ambient glow */}
          <div className="absolute bottom-0 left-[20%] w-[500px] h-[500px] bg-amber-500/10 blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10 container-custom pt-32 pb-20">
          <div className="max-w-4xl">
            <motion.div
              initial="hidden"
              animate="visible"
              viewport={{ once: true }}
            >
              {/* Badge */}
              <motion.div custom={0} variants={fadeUp}>
                <span className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-sm font-medium tracking-wider uppercase">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  Surrey&apos;s Premier Roadside Assistance
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h1
                custom={1}
                variants={fadeUp}
                className="text-5xl sm:text-6xl md:text-8xl font-black mb-8 leading-[0.95] tracking-tight"
              >
                PROS IN <br />
                <span className="text-gradient-gold">
                  MOTION
                </span>
              </motion.h1>

              {/* Subtext */}
              <motion.p
                custom={2}
                variants={fadeUp}
                className="text-lg md:text-xl mb-12 text-slate-300 max-w-2xl font-light leading-relaxed"
              >
                When the unexpected happens, we redefine the standard for{" "}
                <span className="text-amber-400 font-medium">speed</span>,{" "}
                <span className="text-amber-400 font-medium">safety</span>, and{" "}
                <span className="text-amber-400 font-medium">service</span>.
              </motion.p>

              {/* CTAs */}
              <motion.div custom={3} variants={fadeUp} className="flex flex-col sm:flex-row gap-4 items-start">
                <a
                  href="tel:+16045551234"
                  className="group btn-primary text-lg px-10 py-4 flex items-center gap-3"
                >
                  <svg className="w-5 h-5 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  (604) 555-1234
                </a>
                <Link
                  href="/contact"
                  className="group flex items-center gap-3 px-8 py-4 text-white bg-white/5 backdrop-blur-sm border border-white/15 rounded-xl hover:bg-amber-500 hover:text-navy-900 hover:border-amber-500 transition-all duration-500 font-semibold"
                >
                  Request Service
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Floating Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
          >
            {[
              { value: 15, suffix: "+", label: "Years Experience" },
              { value: 5000, suffix: "+", label: "Happy Customers" },
              { value: 30, suffix: " min", label: "Avg Response" },
              { value: 98, suffix: "%", label: "On-Time Rate" },
            ].map((stat, i) => (
              <div
                key={i}
                className="card-glass text-center !p-5 md:!p-6 group hover:border-amber-500/30 transition-all duration-500"
              >
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                  <Counter value={stat.value} duration={2.5} suffix={stat.suffix} />
                </div>
                <p className="text-xs md:text-sm text-slate-400 uppercase tracking-wider font-medium">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ BESPOKE FEATURES ═══ */}
      <BespokeFeatures />

      {/* ═══ PROCESS SECTION (NEW) ═══ */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-4 block">How It Works</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-navy-900">Get Help in 3 Simple Steps</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              We&apos;ve streamlined our process to get you back on the road as quickly as possible.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-100 -z-10"></div>

            {[
              {
                step: "01",
                title: "Call Us",
                desc: "Dial our 24/7 hotline. Our dispatch team answers immediately.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                )
              },
              {
                step: "02",
                title: "Dispatch",
                desc: "We locate the nearest truck and send them your exact coordinates.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                )
              },
              {
                step: "03",
                title: "Recovery",
                desc: "Our driver arrives, secures your vehicle, and transports you safely.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                )
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-white p-8 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 border border-slate-100 text-center group"
              >
                <div className="w-20 h-20 mx-auto bg-slate-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-amber-50 group-hover:scale-110 transition-all duration-500 relative">
                  <div className="absolute top-0 right-0 bg-amber-500 text-white text-xs font-bold w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                    {item.step}
                  </div>
                  <div className="text-navy-900 group-hover:text-amber-600 transition-colors">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-3">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SERVICES SHOWCASE ═══ */}
      <section className="py-28 bg-slate-50">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="max-w-2xl">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-4 block"
              >
                What We Do
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold mb-5 text-navy-900"
              >
                Comprehensive Solutions.
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg text-slate-500 font-light"
              >
                From heavy-duty recovery to simple lockouts, our fleet handles it all with precision.
              </motion.p>
            </div>
            <Link href="/services" className="hidden md:flex items-center gap-2 text-amber-600 font-bold hover:gap-4 transition-all group">
              VIEW ALL SERVICES <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 rounded-2xl overflow-hidden">
            <ServiceHighlight
              image="https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=800"
              title="Emergency Towing"
              category="24/7 Service"
            />
            <ServiceHighlight
              image="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=800"
              title="Roadside Assistance"
              category="Tires & Battery"
            />
            <ServiceHighlight
              image="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=800"
              title="Specialized Recovery"
              category="Heavy Duty"
            />
          </div>
          <div className="mt-10 text-center md:hidden">
            <Link href="/services" className="btn-amber inline-block">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIAL ═══ */}
      <section className="py-28 bg-navy-950 text-white overflow-hidden relative">
        {/* Background accents */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-navy-900/50 skew-x-12 transform origin-top-right" />
        <div className="absolute bottom-0 left-[10%] w-[400px] h-[400px] bg-amber-500/5 blur-[100px] rounded-full" />

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="text-amber-400 text-7xl font-serif mb-6 leading-none">&ldquo;</div>
              <h2 className="text-2xl md:text-4xl font-bold leading-snug mb-10 text-white/95">
                They turned a nightmare on the highway into a safe, calm experience. The professionalism was unmatched.
              </h2>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden relative bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                  <span className="text-navy-900 font-bold text-lg">SJ</span>
                </div>
                <div>
                  <p className="font-bold text-white">Sarah Jenkins</p>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-slate-500 text-sm">via Google</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="card-glass !p-8 hover:border-amber-500/30 transition-all duration-500 text-center">
                <h3 className="text-4xl font-bold text-white mb-2">
                  <Counter value={4.9} duration={2} decimals={1} />
                </h3>
                <p className="text-slate-400 text-xs uppercase tracking-widest font-medium">Average Rating</p>
              </div>
              <div className="card-glass !p-8 hover:border-amber-500/30 transition-all duration-500 text-center">
                <h3 className="text-4xl font-bold text-white mb-2">
                  <Counter value={98} duration={2} suffix="%" />
                </h3>
                <p className="text-slate-400 text-xs uppercase tracking-widest font-medium">Arrival On Time</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ CTA SECTION ═══ */}
      <section className="relative py-28 md:py-36 overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-fire to-fire-dark" />
        <Image
          src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2000"
          alt="Truck on road"
          fill
          className="object-cover opacity-15 group-hover:opacity-10 transition-opacity duration-700"
        />
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 blur-[150px] rounded-full" />

        <div className="relative z-10 text-center text-white container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-5xl md:text-7xl font-black mb-3 tracking-tighter">DON&apos;T STRAND.</h2>
            <h2 className="text-5xl md:text-7xl font-black mb-12 tracking-tighter text-white/20 group-hover:text-white transition-colors duration-700">JUST CALL.</h2>
            <a
              href="tel:+16045551234"
              className="inline-flex items-center gap-3 bg-white text-fire hover:bg-navy-900 hover:text-white font-bold py-5 px-14 text-xl rounded-2xl shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              (604) 555-1234
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}

function ServiceHighlight({ image, title, category }: { image: string; title: string; category: string }) {
  return (
    <div className="group relative h-[420px] overflow-hidden cursor-pointer">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-all duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
      />
      <div className="absolute inset-0 bg-navy-950/50 group-hover:bg-navy-950/30 transition-colors duration-500" />
      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-navy-950/90 to-transparent" />
      <div className="absolute bottom-0 left-0 p-8 text-white w-full">
        <span className="text-xs font-bold tracking-widest uppercase text-amber-400 mb-2 block opacity-0 group-hover:opacity-100 transform translate-y-3 group-hover:translate-y-0 transition-all duration-500">
          {category}
        </span>
        <h3 className="text-2xl md:text-3xl font-bold transform transition-transform duration-500 group-hover:-translate-y-1">
          {title}
        </h3>
      </div>
    </div>
  );
}
