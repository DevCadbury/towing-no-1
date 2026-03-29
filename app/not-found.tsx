"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center section-padding relative overflow-hidden bg-slate-50">
      <div className="absolute -top-24 -left-20 w-[360px] h-[360px] bg-amber-500/10 blur-[100px] rounded-full" />
      <div className="absolute -bottom-24 -right-24 w-[420px] h-[420px] bg-sky-500/10 blur-[120px] rounded-full" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto bg-white border border-slate-200/80 rounded-3xl shadow-xl p-8 md:p-12"
        >
          <p className="text-xs uppercase tracking-[0.18em] font-semibold text-amber-500 mb-3">Dispatch Error 404</p>
          <h1 className="text-4xl md:text-6xl font-black text-navy-900 leading-tight">This Route Got Towed</h1>
          <p className="text-slate-600 text-base md:text-lg mt-4 max-w-2xl">
            The page you requested is not available anymore. If you are stranded roadside, our team is still live 24/7 and ready to dispatch.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3">
            <Link href="/services" className="rounded-xl border border-slate-200 px-4 py-3 text-left hover:border-amber-300 hover:bg-amber-50 transition-colors">
              <p className="text-sm font-bold text-navy-900">Services</p>
              <p className="text-xs text-slate-500 mt-1">Towing, battery, lockout, flat tire</p>
            </Link>
            <Link href="/contact" className="rounded-xl border border-slate-200 px-4 py-3 text-left hover:border-amber-300 hover:bg-amber-50 transition-colors">
              <p className="text-sm font-bold text-navy-900">Contact Dispatch</p>
              <p className="text-xs text-slate-500 mt-1">Send your location and details</p>
            </Link>
            <Link href="/blog" className="rounded-xl border border-slate-200 px-4 py-3 text-left hover:border-amber-300 hover:bg-amber-50 transition-colors">
              <p className="text-sm font-bold text-navy-900">Roadside Tips</p>
              <p className="text-xs text-slate-500 mt-1">Safety and towing guidance</p>
            </Link>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href="/" className="btn-amber inline-flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Back to Home
            </Link>
            <a href="tel:+17788380014" className="btn-secondary inline-flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call 24/7 Assistance
            </a>
          </div>

          <p className="text-xs text-slate-500 mt-6">Fast dispatch across Vancouver, Surrey, Burnaby, Richmond, Coquitlam, Langley, and nearby BC cities.</p>
        </motion.div>
      </div>
    </div>
  );
}
