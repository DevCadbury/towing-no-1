"use client";

import { useEffect } from "react";

interface CallDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function CallDialog({ open, onClose }: CallDialogProps) {
  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      {/* Dim overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Sheet */}
      <div
        className="relative w-full sm:max-w-sm mx-auto bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle bar (mobile) */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-slate-200" />
        </div>

        {/* Header */}
        <div className="px-6 pt-4 pb-3 flex items-center justify-between border-b border-slate-100">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-0.5">TowingNo.1</p>
            <h2 className="text-lg font-bold text-slate-900 leading-tight">Choose a number to call</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
            aria-label="Close"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Numbers */}
        <div className="px-5 py-4 space-y-3">
          {/* Primary */}
          <a
            href="tel:+17788591457"
            className="flex items-center gap-4 w-full bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-gray-900 rounded-xl px-5 py-4 transition-colors group"
            onClick={onClose}
          >
            <span className="w-10 h-10 rounded-full bg-gray-900/10 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </span>
            <div className="text-left">
              <p className="text-[11px] font-semibold uppercase tracking-widest opacity-70 mb-0.5">Main Line · 24/7</p>
              <p className="text-xl font-extrabold tracking-tight">(778) 859-1457</p>
            </div>
          </a>

          {/* Secondary */}
          <a
            href="tel:+16045551234"
            className="flex items-center gap-4 w-full bg-slate-900 hover:bg-slate-800 active:bg-black text-white rounded-xl px-5 py-4 transition-colors"
            onClick={onClose}
          >
            <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </span>
            <div className="text-left">
              <p className="text-[11px] font-semibold uppercase tracking-widest opacity-50 mb-0.5">Alternate Line</p>
              <p className="text-xl font-extrabold tracking-tight">(604) 555-1234</p>
            </div>
          </a>
        </div>

        {/* Footer note */}
        <p className="text-center text-[11px] text-slate-400 pb-5 pt-1">
          Available 24 hours a day, 7 days a week
        </p>
      </div>
    </div>
  );
}
