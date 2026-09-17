/**
 * Shared FAQ helper.
 *
 * A page declares its Q&As ONCE as `FaqItem[]`, then feeds the same array to
 * both the visible FAQ and `faqPageSchema()`. This guarantees the structured
 * data always matches the on-page content (no drift).
 *
 * NOTE ON INTENT: FAQPage markup here is semantic machine-understanding of the
 * page's real, visible Q&A — NOT a play for a guaranteed SERP feature. Google
 * states structured data does not guarantee a search-result enhancement, and
 * FAQ rich results are currently limited to a narrow set of sites. Answers must
 * mirror the visible text exactly and must not contain unverified claims (e.g.
 * specific response-time figures) — see lib/business-facts.ts + claims-check.
 */

export type FaqItem = { q: string; a: string };

export function faqPageSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
