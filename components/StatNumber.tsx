"use client";

import Counter from "@/components/Counter";
import { isVerified, type StatFact } from "@/lib/business-facts";

/**
 * Renders a business stat under the verification policy:
 *   - verified  → the real number (animated via Counter, or static if prefixed
 *                 or animate=false)
 *   - otherwise → the neutral, non-numeric `placeholder` (never 0 / <0 / NaN /
 *                 an invented number)
 *
 * This is the single gate that keeps unverified numbers out of the UI's
 * prominent animated stats. Flip a stat to "verified" in lib/business-facts.ts
 * and the real number appears automatically.
 */
export default function StatNumber({ fact, animate = true }: { fact: StatFact; animate?: boolean }) {
  if (!isVerified(fact)) {
    return <>{fact.placeholder}</>;
  }
  if (!animate || fact.prefix) {
    return <>{`${fact.prefix ?? ""}${fact.value}${fact.suffix ?? ""}`}</>;
  }
  return <Counter value={fact.value} prefix={fact.prefix} suffix={fact.suffix} />;
}
