"use client";

import Image from "next/image";
import Script from "next/script";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// reCAPTCHA v3 (invisible, score-based). A token is generated on submit via
// grecaptcha.execute() and verified server-side.
declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

export default function ContactContent() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Generate a reCAPTCHA v3 token (invisible) before submitting.
    let recaptchaToken = "";
    if (RECAPTCHA_SITE_KEY) {
      try {
        recaptchaToken = await new Promise<string>((resolve, reject) => {
          if (!window.grecaptcha) {
            reject(new Error("reCAPTCHA is still loading. Please try again in a moment."));
            return;
          }
          window.grecaptcha.ready(() => {
            window.grecaptcha!
              .execute(RECAPTCHA_SITE_KEY, { action: "contact" })
              .then(resolve)
              .catch(reject);
          });
        });
      } catch (err: unknown) {
        setStatus("error");
        setErrorMsg(err instanceof Error ? err.message : "Could not verify reCAPTCHA. Please refresh and try again.");
        return;
      }
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formState, recaptchaToken }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Submission failed.");
      setStatus("success");
      setFormState({ name: "", email: "", phone: "", message: "" });
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  const faqs = [
    { q: "How fast can you get to me?", a: "We aim for a 15-minute arrival time or less, depending on traffic and your location." },
    { q: "Do you accept credit cards?", a: "Yes, our drivers carry wireless terminals and accept all major credit cards, debit, and cash." },
    { q: "Are you insured?", a: "Yes, we are fully licensed and insured. Your vehicle is protected while in our care." },
  ];

  const contactItems = [
    {
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
          <path d="M10 14C10 11.8 11.8 10 14 10h3.5a2 2 0 0 1 1.9 1.37l2 6a2 2 0 0 1-.57 2.14L18.7 21.4a22 22 0 0 0 7.9 7.9l1.9-2.14a2 2 0 0 1 2.14-.57l6 2A2 2 0 0 1 38 30.5V34c0 2.2-1.8 4-4 4h-2C16.5 38 10 31.5 10 16v-2Z" fill="url(#ph1)" />
          <defs>
            <linearGradient id="ph1" x1="10" y1="10" x2="38" y2="38" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38bdf8"/>
              <stop offset="1" stopColor="#3b82f6"/>
            </linearGradient>
          </defs>
        </svg>
      ),
      title: "Phone",
      sub: "24/7 Emergency Dispatch",
      content: (
        <a href="tel:+17788380014" className="text-xl font-bold text-fire hover:text-amber-600 transition-colors">(778) 838-0014</a>
      ),
    },
    {
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
          <rect x="6" y="12" width="36" height="26" rx="4" fill="#818cf8"/>
          <path d="M6 16l18 13L42 16" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Email",
      sub: "For non-urgent inquiries",
      content: <a href="mailto:info@towingno1.com" className="text-lg font-medium text-navy-900 hover:text-amber-600 transition-colors">info@towingno1.com</a>,
    },
    {
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
          <ellipse cx="24" cy="34" rx="10" ry="3" fill="#fbbf24" opacity="0.4"/>
          <path d="M24 4C17.4 4 12 9.4 12 16c0 9 12 24 12 24s12-15 12-24c0-6.6-5.4-12-12-12Z" fill="#ef4444"/>
          <path d="M24 4C17.4 4 12 9.4 12 16c0 9 12 24 12 24s12-15 12-24c0-6.6-5.4-12-12-12Z" fill="url(#mp1)"/>
          <circle cx="24" cy="16" r="5" fill="#fff"/>
          <defs>
            <linearGradient id="mp1" x1="12" y1="4" x2="36" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f87171"/>
              <stop offset="1" stopColor="#dc2626"/>
            </linearGradient>
          </defs>
        </svg>
      ),
      title: "Service Area",
      sub: "",
      content: <p className="text-slate-500 text-sm">Proudly serving Delta, White Rock, Langley, Burnaby, and surrounding areas in British Columbia.</p>,
    },
  ];

  return (
    <div className="min-h-screen">
      {RECAPTCHA_SITE_KEY && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}
          strategy="afterInteractive"
        />
      )}
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[320px] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-navy-950">
          <Image
            src="/assets/contact-hero.jpg"
            alt="Contact TowingNo.1 for 24/7 roadside assistance"
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
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-navy-900">Message Sent</h3>
                  <p className="text-slate-500 text-sm max-w-xs">Thank you. We have received your request and will be in touch shortly. A confirmation has been sent to your email.</p>
                  <button onClick={() => setStatus("idle")} className="mt-2 text-sm text-amber-600 hover:underline font-medium">Send another message</button>
                </div>
              ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-navy-900 font-medium mb-2 text-sm">Full Name</label>
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
                  <div>
                    <label htmlFor="email" className="block text-navy-900 font-medium mb-2 text-sm">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all bg-slate-50/50"
                      placeholder="you@example.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-navy-900 font-medium mb-2 text-sm">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all bg-slate-50/50"
                    placeholder="(778) 555-0100"
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                  />
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
                {RECAPTCHA_SITE_KEY && (
                  <p className="text-xs text-slate-400 leading-relaxed">
                    This site is protected by reCAPTCHA and the Google{" "}
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">Privacy Policy</a>{" "}
                    and{" "}
                    <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">Terms of Service</a>{" "}
                    apply.
                  </p>
                )}
                {status === "error" && (
                  <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">{errorMsg}</p>
                )}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full btn-primary py-4 text-lg disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? "Sending..." : "Send Message"}
                </button>
              </form>
              )}
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
                  {contactItems.map((item, i) => (
                    <div key={i} className="card !p-5 flex items-start gap-5">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-md border border-slate-100 p-2">
                        {item.icon}
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

      {/* What to expect / coverage prose */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900">Reach Us Any Time, Day or Night</h2>
            <p>
              Vehicle trouble rarely waits for a convenient moment, so neither do we. Our dispatch line is staffed
              24 hours a day, 7 days a week, including weekends and holidays. Whether your battery died in a parking
              lot at 2 a.m., you locked your keys inside on the school run, or you slid off an icy shoulder on the
              highway, a real person answers, gathers your details, and gets a driver moving. For anything urgent,
              calling <a href="tel:+17788380014" className="text-amber-600 font-semibold hover:text-amber-700">(778) 838-0014</a> is
              always the fastest way to reach us. The contact form is best for quotes, questions, and non-emergency
              requests, and we usually reply within minutes during the day.
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-navy-900 pt-2">Where We Serve</h2>
            <p>
              TowingNo.1 covers Surrey and the wider Lower Mainland, including Delta, White Rock, Langley, Burnaby,
              Richmond, Coquitlam, Vancouver, and Maple Ridge, along with the highways and connector routes that tie
              them together. Because our trucks are positioned across the region rather than run from a single yard,
              we can usually reach you quickly no matter which community you are calling from. If you are unsure
              whether your location is in our area, just call and ask, we will tell you honestly and, if a job falls
              outside our coverage, point you toward someone who can help.
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-navy-900 pt-2">What to Expect When You Reach Out</h2>
            <p>
              When you call or send a message, it helps to have a few details ready: where you are located or a
              nearby landmark or cross street, the make and model of your vehicle, and a short description of what
              is wrong. With that information our dispatcher can match the right truck and equipment to your
              situation and give you a flat-rate quote up front. You will get an honest arrival estimate, a heads-up
              as the driver approaches, and a final confirmation of the price before any work starts. There are no
              hidden fees and no pressure, only clear communication so you always know what is happening and what it
              will cost.
            </p>
            <p>
              If you are stranded in an unsafe spot, please prioritize your safety first. Move well clear of moving
              traffic, switch on your hazard lights, and stay behind a barrier where one exists. Then call us and
              stay on the line if you would like, our dispatchers are happy to keep you company and guide you until
              help arrives.
            </p>
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
