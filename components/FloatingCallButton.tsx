"use client";

export default function FloatingCallButton() {
  // Direct call link - replace with your business phone if needed
  const phone = "+17788380014";

  return (
    <div className="fixed left-3 bottom-6 sm:left-4 sm:bottom-8 md:left-auto md:right-5 md:bottom-24 md:top-auto md:translate-y-0 z-[70]">
      <a
        href={`tel:${phone}`}
        aria-label="Call now for a free quote"
        className="btn-call-highlight inline-flex items-center gap-2 rounded-full py-3 pl-3 pr-4 shadow-2xl"
      >
        <span className="w-9 h-9 rounded-full bg-gray-900/15 flex items-center justify-center shrink-0">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
        </span>
        <span className="text-left leading-tight">
          <span className="block text-[12px] sm:text-[13px] font-extrabold">Call Now</span>
          <span className="block text-[10px] sm:text-[11px] font-semibold opacity-80">Free Quote</span>
        </span>
      </a>
    </div>
  );
}
