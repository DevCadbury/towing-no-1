"use client";

import Image from "next/image";

interface LogoProps {
  height?: number;
  className?: string;
}

export default function Logo({ height = 52, className = "" }: LogoProps) {
  return (
    <Image
      src="/logo.png"
      alt="TowingNo.1 Emergency & Roadside Services"
      width={684}
      height={365}
      style={{ height: `${height}px`, width: 'auto' }}
      className={`object-contain ${className}`}
      priority
    />
  );
}
