"use client";

import Image from "next/image";

interface LogoProps {
  height?: number;
  className?: string;
}

// Intrinsic size of /public/logo.png.
const LOGO_WIDTH = 684;
const LOGO_HEIGHT = 365;

export default function Logo({ height = 52, className = "" }: LogoProps) {
  // A-012: rendered width at the given height, so the browser picks a srcset
  // candidate near the displayed size instead of the 1920 px default.
  const renderedWidth = Math.ceil((height * LOGO_WIDTH) / LOGO_HEIGHT);
  return (
    <Image
      src="/logo.png"
      alt="TowingNo.1 Emergency & Roadside Services"
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      sizes={`${renderedWidth}px`}
      style={{ height: `${height}px`, width: 'auto' }}
      className={`object-contain ${className}`}
      priority
    />
  );
}
