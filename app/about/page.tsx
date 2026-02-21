"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Counter from "@/components/Counter";

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-navy-950">
          <Image
            src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=2000"
            alt="About TowingNo.1"
            fill
            className="object-cover object-top md:object-center opacity-30"
            sizes="100vw"
            priority
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
              <span className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-4 block">Since 2010</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-navy-900">Our Story</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mb-8 rounded-full" />
              <div className="space-y-5 text-lg text-slate-600 leading-relaxed">
                <p>
                  Founded in 2010, TowingNo.1 began with a single truck and a clear mission: to provide the most reliable and honest towing service in the Lower Mainland. We saw too many people stranded and stressed, dealing with hidden fees and long wait times.
                </p>
                <p>
                  Over the years, we&apos;ve grown into a full fleet operation, but our core values haven&apos;t changed. We treat every customer like family, understanding that when you call us, you&apos;re likely in a stressful situation.
                </p>
                <p>
                  Today, we are proud to be the top-rated towing service in BC, known for our fast response times, professional drivers, and transparent pricing.
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
                src="https://images.unsplash.com/photo-1596726584282-358c3886e588?q=80&w=800"
                alt="Tow truck fleet"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className="bg-amber-500 text-navy-900 px-4 py-2 rounded-full text-sm font-bold">Serving since 2010</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-navy-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 blur-[120px] rounded-full" />
        </div>
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { val: 15, label: "Years in Business", suffix: "+" },
              { val: 5000, label: "Happy Customers", suffix: "+" },
              { val: 20, label: "Trucks in Fleet", suffix: "+" },
              { val: 24, label: "Hours Available", suffix: "/7" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-glass text-center !p-8 hover:border-amber-500/30 transition-all duration-500"
              >
                <div className="text-4xl md:text-5xl font-bold text-gradient-gold mb-2">
                  <Counter value={stat.val} duration={2} suffix={stat.suffix} />
                </div>
                <div className="text-slate-400 text-sm uppercase tracking-wider font-medium">{stat.label}</div>
              </motion.div>
            ))}
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
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                ),
                title: "Safety First",
                desc: "We never compromise on safety. Our drivers are trained to handle every situation with the utmost care for you, your vehicle, and other road users.",
                gradient: "from-amber-400 to-amber-600",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                ),
                title: "Rapid Response",
                desc: "We understand that time is of the essence. We invest in dispatch technology and strategic fleet positioning to get to you as fast as possible.",
                gradient: "from-fire to-amber-500",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                ),
                title: "Integrity",
                desc: "Honest pricing and transparent communication. No hidden fees or surprise charges. We treat you with the respect you deserve.",
                gradient: "from-amber-500 to-fire",
              },
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card group hover:shadow-card-hover"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${value.gradient} rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-navy-900">{value.title}</h3>
                <p className="text-slate-500 leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-navy-950">
          <Image
            src="https://images.unsplash.com/photo-1504981157121-654877ee5ee5?q=80&w=1200"
            alt="Team working"
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
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Join the thousands who trust us</h2>
            <p className="text-lg mb-10 max-w-2xl mx-auto text-slate-300">
              Experience the difference of a towing service that puts you first.
            </p>
            <a
              href="tel:+16045551234"
              className="inline-flex items-center gap-3 btn-amber text-lg py-4 px-12 !rounded-full shadow-glow-amber"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Us Today
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
