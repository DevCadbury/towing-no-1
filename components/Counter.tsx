"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface CounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

function format(n: number, prefix: string, suffix: string, decimals: number) {
  return `${prefix}${n.toFixed(decimals)}${suffix}`;
}

/**
 * SSR-correct animated counter.
 *
 * The server and the first client render both emit the FINAL formatted value
 * (e.g. "15+", "24/7"), so crawlers and no-JS users never see 0 / <0 / NaN, and
 * there is no hydration mismatch. The count-up is a pure client-side
 * enhancement that runs once the element scrolls into view.
 *
 * When a `prefix` is present (e.g. "<15 min"), the count-up is skipped and the
 * final value is shown statically — counting up from 0 would flash a misleading
 * "<0 min" mid-animation.
 */
export default function Counter({ value, duration = 2, suffix = "", prefix = "", decimals = 0 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const final = format(value, prefix, suffix, decimals);
  const [text, setText] = useState(final);

  useEffect(() => {
    if (!inView || prefix) return; // prefixed values render statically (no "<0" flash)
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setText(format(value * eased, prefix, suffix, decimals));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setText(final);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, prefix, suffix, decimals, final]);

  return <motion.span ref={ref}>{text}</motion.span>;
}
