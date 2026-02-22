"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    location: "",
    message: "",
  });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thanks for contacting us! We'll call you immediately.");
    setFormState({ name: "", phone: "", location: "", message: "" });
  };

  const faqs = [
    { q: "How fast can you get to me?", a: "We aim for a 15-minute arrival time or less, depending on traffic and your location." },
    { q: "Do you accept credit cards?", a: "Yes, our drivers carry wireless terminals and accept all major credit cards, debit, and cash." },
    { q: "Can you tow my motorcycle?", a: "Absolutely. We have specialized equipment to safely tow motorcycles without damage." },
    { q: "Are you insured?", a: "Yes, we are fully licensed and insured. Your vehicle is protected while in our care." },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[320px] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-navy-950">
          <Image
            src="https://images.unsplash.com/photo-1516733968668-dbdce39c4651?q=80&w=2000"
            alt="Contact TowingNo.1"
            fill
            className="object-cover object-top md:object-center opacity-25"
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
            <span className="text-amber-400 font-semibold text-sm uppercase tracking-widest mb-4 block">Get In Touch</span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Contact <span className="text-gradient-gold">Us</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-light">
              We&apos;re here for you 24/7. Reach out now for immediate assistance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 md:p-10 rounded-2xl shadow-card border border-slate-100"
            >
              <h2 className="text-2xl font-bold mb-2 text-navy-900">Send us a Message</h2>
              <p className="text-slate-400 mb-8 text-sm">We&apos;ll get back to you within minutes.</p>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-navy-900 font-medium mb-2 text-sm">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all bg-slate-50/50"
                    placeholder="John Doe"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="phone" className="block text-navy-900 font-medium mb-2 text-sm">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all bg-slate-50/50"
                      placeholder="(604) 555-0123"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="location" className="block text-navy-900 font-medium mb-2 text-sm">Location (Optional)</label>
                    <input
                      type="text"
                      id="location"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all bg-slate-50/50"
                      placeholder="Your city, BC"
                      value={formState.location}
                      onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-navy-900 font-medium mb-2 text-sm">How can we help?</label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all resize-none bg-slate-50/50"
                    placeholder="Describe your issue or request..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  />
                </div>
                <button type="submit" className="w-full btn-primary py-4 text-lg">
                  Send Message
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold mb-6 text-navy-900">Contact Information</h2>
                <div className="space-y-4">
                  {[
                    {
                      icon: "/assets/phone-call.png",
                      title: "Phone",
                      sub: "24/7 Emergency Dispatch",
                      content: (
                        <div className="flex flex-col gap-1 mt-0.5">
                          <a href="tel:+17788591457" className="text-xl font-bold text-fire hover:text-amber-600 transition-colors">(778) 859-1457</a>
                          <a href="tel:+16045551234" className="text-base font-semibold text-slate-500 hover:text-amber-600 transition-colors">(604) 555-1234</a>
                        </div>
                      ),
                    },
                    {
                      icon: "/assets/message.png",
                      title: "Email",
                      sub: "For non-urgent inquiries",
                      content: <a href="mailto:info@towingno1.ca" className="text-lg font-medium text-navy-900 hover:text-amber-600 transition-colors">info@towingno1.ca</a>,
                    },
                    {
                      icon: "/assets/map.png",
                      title: "Service Area",
                      sub: "",
                      content: <p className="text-slate-500 text-sm">Proudly serving Delta, White Rock, Langley, Burnaby, and surrounding areas in British Columbia.</p>,
                    },
                  ].map((item, i) => (
                    <div key={i} className="card !p-5 flex items-start gap-5">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg p-2.5">
                        <Image src={item.icon} alt={item.title} width={28} height={28} className="object-contain brightness-0 invert" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-navy-900 mb-0.5">{item.title}</h3>
                        {item.sub && <p className="text-slate-400 text-xs mb-1">{item.sub}</p>}
                        {item.content}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Google Map */}
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-card h-[260px] w-full">
                <iframe
                  title="TowingNo.1 Service Area – Lower Mainland BC"
                  src="https://maps.google.com/maps?q=Metro+Vancouver,BC,Canada&t=m&z=10&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-12">
            <span className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-4 block">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border border-slate-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-amber-500/30"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <h3 className="font-bold text-navy-900 pr-4">{faq.q}</h3>
                  <motion.span
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 text-amber-500"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-slate-500 leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
