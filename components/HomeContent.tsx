"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Counter from "@/components/Counter";
import { useState } from "react";

const services = [
  {
    src: "/image/Emergency_Towin.png",
    alt: "Emergency Towing",
    title: "Emergency Towing",
    desc: "24/7 towing for cars, SUVs, and light trucks. Fast response, safe transport.",
    anchor: "#emergency-towing",
  },
  {
    src: "/image/Flat_Tire_Hel.png",
    alt: "Flat Tire Help",
    title: "Flat Tire Help",
    desc: "On-site tire change or tow to the nearest shop — back on the road fast.",
    anchor: "#flat-tire",
  },
  {
    src: "/image/Battery_Boost.png",
    alt: "Battery Boost",
    title: "Battery Boost",
    desc: "Dead battery? We jump-start your vehicle on the spot, any time of day.",
    anchor: "#battery-boost",
  },
  {
    src: "/image/Accident_Recover.png",
    alt: "Accident Recovery",
    title: "Accident Recovery",
    desc: "Careful recovery and transport of damaged vehicles from any collision scene.",
    anchor: "#accident-recovery",
  },
  {
    src: "/image/Lockout_Servic.png",
    alt: "Lockout Service",
    title: "Lockout Service",
    desc: "Locked your keys inside? Our team opens your vehicle safely and quickly.",
    anchor: "#lockout",
  },
  {
    src: "/image/Vehicle_Transpor.png",
    alt: "Vehicle Transport",
    title: "Vehicle Transport",
    desc: "Secure, on-time vehicle moves between locations across the Lower Mainland.",
    anchor: "#vehicle-transport",
  },
  {
    src: "/image/Fuel_Deliver.png",
    alt: "Fuel Delivery",
    title: "Fuel Delivery",
    desc: "Run out of fuel? We deliver enough to get you to the nearest station.",
    anchor: "#fuel-delivery",
  },
  {
    src: "/image/Winching_Extractio.png",
    alt: "Winching & Extraction",
    title: "Winching & Extraction",
    desc: "Stuck in mud, snow, or a ditch? We pull your vehicle out safely.",
    anchor: "#winching",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export default function HomeContent() {
  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="relative bg-navy-950">

        {/* ── DESKTOP ONLY: full-viewport background ── */}
        <div className="hidden md:block absolute inset-0">
          <Image
            src="/background_home.png"
            alt="TowingNo.1 tow truck on the road"
            fill
            className="object-cover object-[center_60%]"
            priority
            quality={90}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-navy-950/55" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/80 via-navy-950/40 to-navy-950/10" />
        </div>

        {/* ── Content ── */}
        <div className="relative z-10 md:min-h-screen md:flex md:items-center">
          <div className="w-full container-custom px-4 sm:px-6 lg:px-8 pt-10 pb-0 md:py-0 flex flex-col items-center text-center md:items-start md:text-left">
          <div className="max-w-2xl w-full">
            {/* Eyebrow label */}
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-block text-xs font-semibold tracking-[0.18em] uppercase text-amber-400 mb-6 border border-amber-400/30 rounded-full px-4 py-1.5"
            >
              BC · Serving the Lower Mainland
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.06] tracking-tight mb-6 [text-shadow:0_2px_24px_rgba(0,0,0,0.75)]"
            >
              24/7 Emergency{" "}
              <span className="text-amber-400 [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]">Towing Service</span>
              <br />– We Come to You!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="text-base md:text-xl text-white/90 mb-10 max-w-xl leading-relaxed [text-shadow:0_1px_12px_rgba(0,0,0,0.6)]"
            >
              Fast, professional roadside assistance across the Lower Mainland — day or night, whatever the situation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.44 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <a
                href="tel:+16045551234"
                className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-gray-900 font-bold py-4 px-8 rounded-xl text-base transition-all duration-200 shadow-lg hover:-translate-y-0.5 hover:shadow-xl"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
                  <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                </svg>
                Call Now: (604) 555-1234
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-xl text-base border border-white/25 transition-all duration-200 backdrop-blur-sm hover:-translate-y-0.5"
              >
                Request Service
              </Link>
            </motion.div>

            {/* Trust bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.62 }}
              className="mt-10 grid grid-cols-2 sm:flex sm:flex-wrap gap-x-8 gap-y-3 text-white text-sm font-semibold [text-shadow:0_1px_8px_rgba(0,0,0,0.7)]"
            >
              <span className="flex items-center gap-1.5"><span className="text-amber-400">✓</span> &lt;15 min response</span>
              <span className="flex items-center gap-1.5"><span className="text-amber-400">✓</span> Licensed &amp; insured</span>
              <span className="flex items-center gap-1.5"><span className="text-amber-400">✓</span> Flat-rate pricing</span>
              <span className="flex items-center gap-1.5"><span className="text-amber-400">✓</span> All vehicle types</span>
            </motion.div>

            {/* ── MOBILE ONLY: truck image below content ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.72 }}
              className="relative w-full aspect-[16/9] mt-8 md:hidden rounded-2xl overflow-hidden"
            >
              <Image
                src="/background_home.png"
                alt="TowingNo.1 tow truck on the road"
                fill
                className="object-cover object-center"
                priority
                quality={90}
                sizes="100vw"
              />
            </motion.div>
          </div>
          </div>
        </div>

        {/* bottom padding for mobile so image isn't flush with next section */}
        <div className="h-8 md:hidden" />
      </section>

      {/* ── Services ───────────────────────────────────────────────── */}
      <section className="pt-16 pb-24 bg-slate-50">
        <div className="container-custom">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-14"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-500 mb-3">What we do</p>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                Full-Service Roadside<br className="hidden md:block" /> Assistance
              </h2>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-amber-500 transition-colors group shrink-0"
              >
                View all services
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 group-hover:translate-x-0.5 transition-transform">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </motion.div>
          {/* Cards grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <motion.div
                key={svc.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-amber-400/60 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out hover:-translate-y-1.5 cursor-pointer flex flex-col"
              >
                {/* Card image */}
                <div className="relative h-52 overflow-hidden shrink-0 bg-slate-100">
                  <Image
                    src={svc.src}
                    alt={svc.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                  {/* Subtle label badge */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-block bg-amber-400 text-gray-900 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                      24/7
                    </span>
                  </div>
                </div>
                {/* Card body */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-gray-900 text-[15px] mb-1.5 leading-snug">{svc.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed flex-1">{svc.desc}</p>
                  {/* Footer link */}
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href={`/services${svc.anchor}`}
                      className="text-xs font-semibold text-amber-500 hover:text-amber-600 transition-colors inline-flex items-center gap-1 group/link"
                    >
                      Learn more
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform">
                        <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                      </svg>
                    </Link>
                    <div className="w-2 h-2 rounded-full bg-amber-400 group-hover:scale-125 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us (stats strip) ────────────────────────────── */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-500 mb-3">Why us</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Trusted Across the Lower Mainland
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {[
              { stat: "24/7", label: "Always Available", sub: "Round-the-clock, every day of the year", delay: 0.1 },
              { stat: null, label: "Fast Response", sub: "Average response time under 15 minutes", delay: 0.2, counter: true, value: 15, suffix: " min" },
              { stat: null, label: "Years Experience", sub: "Serving BC communities since 2009", delay: 0.3, counter: true, value: 15, suffix: "+" },
              { stat: "$", label: "Affordable Rates", sub: "Flat-rate pricing, no hidden fees", delay: 0.4 },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: item.delay }}
                className="text-center px-4"
              >
                <div className="text-4xl md:text-5xl font-extrabold text-amber-500 mb-3 tabular-nums">
                  {item.counter ? (
                    <>{"<"}<Counter value={item.value!} duration={2} suffix={item.suffix} /></>
                  ) : (
                    item.stat
                  )}
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-1">{item.label}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials carousel ──────────────────────────────────── */}
      <TestimonialsCarousel />
      {/* ── FAQ ───────────────────────────────────────────────── */}
      <FaqSection />
      {/* ── CTA Banner ─────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
              Stranded? We're One Call Away.
            </h2>
            <p className="text-white/60 mb-10 text-base">
              Available 24 hours a day, 7 days a week — including holidays.
            </p>
            <a
              href="tel:+16045551234"
              className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-gray-900 font-bold py-4 px-10 rounded-xl text-base transition-all duration-200 shadow-lg hover:-translate-y-0.5 hover:shadow-xl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
              </svg>
              (604) 555-1234
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}

/* ─── Testimonials carousel ──────────────────────────────────── */
const testimonials = [
  { body: "Called TowingNo.1 at 2 AM when my car broke down on the highway. They arrived in 20 minutes and had me home safely. Excellent service!", name: "Sarah M.", title: "Verified Customer" },
  { body: "Professional, friendly, and fast. The driver took great care of my vehicle. Will definitely use them again if needed.", name: "Michael T.", title: "Verified Customer" },
  { body: "Best towing company around! Fair prices and they really care about helping people. Highly recommend.", name: "Jennifer L.", title: "Verified Customer" },
  { body: "Got a flat tire on the highway at rush hour. They were there in under 25 minutes and had me on my way. Unbelievable response time!", name: "David K.", title: "Verified Customer" },
  { body: "Locked my keys in the car at the mall. They opened it in minutes without any damage. Friendly and professional — saved my day!", name: "Lisa R.", title: "Verified Customer" },
  { body: "Needed a battery boost early in the morning before work. Quick, easy, and priced fairly. Definitely calling them again.", name: "Tom W.", title: "Verified Customer" },
  { body: "Had my car stuck in a ditch after a snowstorm. The team pulled it out carefully and got me moving again. Truly lifesavers!", name: "Amanda P.", title: "Verified Customer" },
];

function TestimonialsCarousel() {
  const [isPaused, setIsPaused] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  // Duplicate for seamless infinite loop
  const items = [...testimonials, ...testimonials];

  return (
    <section className="py-20 bg-slate-50 overflow-hidden">
      <div className="container-custom mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-500 mb-3">Reviews</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            What Our Customers Say
          </h2>
        </motion.div>
      </div>

      {/* Carousel track */}
      <div
        className="relative flex w-full select-none"
        style={{ maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)" }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => { setIsPaused(false); setActiveCard(null); }}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setTimeout(() => { setIsPaused(false); setActiveCard(null); }, 1800)}
      >
        <div
          className="flex gap-5"
          style={{
            animation: "marquee 38s linear infinite",
            animationPlayState: isPaused ? "paused" : "running",
            width: "max-content",
          }}
        >
          {items.map((t, i) => (
            <div
              key={i}
              onClick={() => setActiveCard(activeCard === i ? null : i)}
              className={`w-[300px] sm:w-[340px] shrink-0 bg-white rounded-2xl p-6 shadow-[0_2px_16px_rgba(0,0,0,0.07)] flex flex-col cursor-pointer transition-all duration-200 ${
                activeCard === i
                  ? "border-2 border-amber-400 shadow-[0_8px_32px_rgba(251,191,36,0.18)] -translate-y-1"
                  : "border-2 border-slate-100 hover:border-amber-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:-translate-y-1"
              }`}
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, s) => (
                  <svg key={s} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-amber-400">
                    <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clipRule="evenodd" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 leading-relaxed text-sm flex-1">&ldquo;{t.body}&rdquo;</p>
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-400 flex items-center justify-center text-gray-900 font-bold text-sm shrink-0">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm leading-none">{t.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{t.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pause indicator */}
      {isPaused }
    </section>
  );
}

/* ─── FAQ accordion ───────────────────────────────────────── */
const faqs = [
  {
    q: "How quickly can you reach me?",
    a: "Our average response time is under 15 minutes. We dispatch the closest available driver the moment you call — day or night, weekends and holidays included.",
  },
  {
    q: "Do you tow all types of vehicles?",
    a: "Yes. We tow cars, SUVs, pickup trucks, motorcycles, and light commercial vehicles. If you’re unsure whether your vehicle qualifies, just call us and we’ll confirm instantly.",
  },
  {
    q: "What areas do you cover?",
    a: "We serve the Lower Mainland including Delta, Langley, Burnaby, Richmond, White Rock, and the broader Metro Vancouver region.",
  },
  {
    q: "How much does a tow cost?",
    a: "Our pricing is flat-rate with no hidden fees. Cost depends on vehicle type and distance. Call us for an instant quote — we’ll give you a firm price before we dispatch.",
  },
  {
    q: "Can you help if I’m locked out of my car?",
    a: "Absolutely. Our lockout service gets you back in your vehicle safely without causing damage to the lock or door. We arrive fast and handle all makes and models.",
  },
  {
    q: "Do you offer roadside assistance without towing?",
    a: "Yes — if your issue can be solved on the spot (flat tire, dead battery, out of fuel, locked out) we’ll fix it right there. Towing is only arranged when the vehicle truly can’t be driven.",
  },
  {
    q: "Are you available on holidays and weekends?",
    a: "We operate 24 hours a day, 7 days a week, including all statutory holidays. Emergencies don’t follow business hours, and neither do we.",
  },
  {
    q: "Is my vehicle insured while being towed?",
    a: "We are fully licensed and insured. Your vehicle is handled with professional care using proper equipment throughout every tow.",
  },
];

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-14 text-center"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-500 mb-3">Got questions?</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
              Everything you need to know about our towing and roadside services.
            </p>
          </motion.div>

          {/* Accordion */}
          <div className="flex flex-col divide-y divide-slate-100">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-16px" }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-6 py-5 text-left group"
                    aria-expanded={isOpen}
                  >
                    <span className={`text-[15px] font-semibold leading-snug transition-colors duration-200 ${
                      isOpen ? "text-amber-500" : "text-gray-900 group-hover:text-amber-500"
                    }`}>
                      {faq.q}
                    </span>
                    {/* Plus / minus icon */}
                    <span className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-200 ${
                      isOpen
                        ? "bg-amber-400 border-amber-400 text-gray-900"
                        : "border-slate-200 text-slate-400 group-hover:border-amber-400 group-hover:text-amber-500"
                    }`}>
                      <motion.svg
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5"
                      >
                        <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
                      </motion.svg>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 text-[14.5px] text-gray-500 leading-relaxed pr-12">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom CTA nudge */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 flex flex-col sm:flex-row items-center gap-4 bg-slate-50 rounded-2xl px-6 py-5 border border-slate-100"
          >
            <p className="text-sm text-gray-600 flex-1">Still have a question? We’re available 24/7 and happy to help.</p>
            <a
              href="tel:+16045551234"
              className="shrink-0 inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold text-sm py-2.5 px-5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-sm hover:shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 16.352V17.5a1.5 1.5 0 0 1-1.5 1.5H15c-8.284 0-15-6.716-15-15V3.5Z" clipRule="evenodd" />
              </svg>
              Call (604) 555-1234
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
