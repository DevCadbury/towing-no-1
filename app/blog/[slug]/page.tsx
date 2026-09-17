import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { blogPosts, getPostBySlug } from "@/lib/blog-posts";

interface Props {
  params: Promise<{ slug: string }>;
}

/**
 * Convert a human date string ("February 10, 2026") to an ISO timestamp for
 * schema/OG. Invalid dates fall back to now; FUTURE dates are clamped to now so
 * a placeholder/typo can never ship a future publish/modified timestamp.
 */
function toISODate(dateStr: string): string {
  const d = new Date(dateStr);
  const now = new Date();
  if (Number.isNaN(d.getTime())) return now.toISOString();
  return (d.getTime() > now.getTime() ? now : d).toISOString();
}

// Topic → service link map, so each post's "Related Services" block is
// contextual (derived from its title/excerpt/keywords) rather than identical.
const RELATED_SERVICES: { href: string; label: string; match: RegExp }[] = [
  { href: "/services/emergency-towing", label: "Emergency Towing Surrey", match: /tow|breakdown|highway|stall|engine/i },
  { href: "/services/accident-recovery", label: "Accident Recovery", match: /accident|collision|crash|recovery/i },
  { href: "/services/battery-boost", label: "Battery Boost", match: /battery|jump|dead|charg/i },
  { href: "/services/flat-tire-help", label: "Flat Tire Help", match: /tire|flat|blowout|tread/i },
  { href: "/services/winching-extraction", label: "Winching & Extraction", match: /winch|stuck|ditch|snow|mud|ice|extraction/i },
  { href: "/services/fuel-delivery", label: "Fuel Delivery", match: /fuel|gas|empty|diesel/i },
  { href: "/services/lockout-service", label: "Lockout Service", match: /lock|keys?|fob/i },
];

function relatedServiceLinks(post: { title: string; excerpt: string; keywords: string[] }): { href: string; label: string }[] {
  const hay = `${post.title} ${post.excerpt} ${post.keywords.join(" ")}`.toLowerCase();
  const matched = RELATED_SERVICES.filter((s) => s.match.test(hay)).map(({ href, label }) => ({ href, label }));
  const withPrimary = matched.some((m) => m.href === "/services/emergency-towing")
    ? matched
    : [{ href: "/services/emergency-towing", label: "Emergency Towing Surrey" }, ...matched];
  return withPrimary.slice(0, 4);
}

/**
 * Render inline **bold** segments within a line of body text. Everything else
 * is plain, React-escaped text (no dangerouslySetInnerHTML — XSS-safe).
 */
function renderInline(text: string): ReactNode[] {
  return text.split(/(\*\*.+?\*\*)/g).map((part, j) => {
    const m = /^\*\*(.+?)\*\*$/.exec(part);
    return m ? (
      <strong key={j} className="font-semibold text-navy-900">{m[1]}</strong>
    ) : (
      <span key={j}>{part}</span>
    );
  });
}

/**
 * Parse the markdown-ish blog body into React blocks:
 *  - "## " / "### "   → headings (with inline bold)
 *  - consecutive "- "  → a real <ul> of <li> (with inline bold)
 *  - "---" + a **bold** line → amber CTA callout containing that line
 *  - "---" otherwise   → plain separator (skipped)
 *  - a whole-line **bold** → emphasized paragraph
 *  - everything else   → paragraph (with inline bold)
 * XSS-safe: all text flows through React children, never dangerouslySetInnerHTML.
 */
function renderBody(content: string): ReactNode[] {
  const lines = content.trim().split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    if (line === "") {
      i++;
      continue;
    }

    // "---" introduces the closing CTA callout: its content is the next
    // non-empty **bold** line (fixes the previously EMPTY amber box).
    if (line === "---") {
      let j = i + 1;
      while (j < lines.length && lines[j].trim() === "") j++;
      const next = j < lines.length ? lines[j].trim() : "";
      if (/^\*\*.+\*\*$/.test(next)) {
        blocks.push(
          <div key={key++} className="mt-10 p-6 bg-amber-50 border border-amber-200 rounded-2xl">
            <p className="text-slate-700 font-medium text-sm">{renderInline(next.replace(/^\*\*|\*\*$/g, ""))}</p>
          </div>
        );
        i = j + 1;
      } else {
        i++; // plain separator — nothing to render
      }
      continue;
    }

    if (line.startsWith("### ")) {
      blocks.push(<h3 key={key++} className="text-xl font-bold text-navy-900 mt-8 mb-3">{renderInline(line.slice(4))}</h3>);
      i++;
      continue;
    }
    if (line.startsWith("## ")) {
      blocks.push(<h2 key={key++} className="text-2xl font-bold text-navy-900 mt-10 mb-4">{renderInline(line.slice(3))}</h2>);
      i++;
      continue;
    }

    // Group consecutive "- " lines into a single real <ul>.
    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        items.push(lines[i].trim().slice(2));
        i++;
      }
      blocks.push(
        <ul key={key++} className="list-disc pl-6 space-y-2 mb-5 text-slate-600">
          {items.map((it, k) => (
            <li key={k} className="leading-relaxed">{renderInline(it)}</li>
          ))}
        </ul>
      );
      continue;
    }

    // Whole-line bold → emphasized paragraph.
    if (/^\*\*.+\*\*$/.test(line)) {
      blocks.push(<p key={key++} className="font-bold text-navy-900 mt-6 mb-2">{renderInline(line)}</p>);
      i++;
      continue;
    }

    blocks.push(<p key={key++} className="text-slate-600 leading-relaxed mb-5">{renderInline(line)}</p>);
    i++;
  }

  return blocks;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: {
      canonical: `https://www.towingno1.com/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      url: `https://www.towingno1.com/blog/${post.slug}`,
      title: post.title,
      description: post.excerpt,
      publishedTime: toISODate(post.date),
      modifiedTime: post.updatedDate ? toISODate(post.updatedDate) : toISODate(post.date),
      images: [
        {
          url: `https://www.towingno1.com${post.image}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [`https://www.towingno1.com${post.image}`],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  // Related posts ranked by shared-keyword overlap (topical), then recency.
  const otherPosts = blogPosts
    .filter((p) => p.slug !== slug)
    .map((p) => ({ post: p, score: p.keywords.filter((k) => post.keywords.includes(k)).length }))
    .sort((a, b) => b.score - a.score || new Date(b.post.date).getTime() - new Date(a.post.date).getTime())
    .slice(0, 3)
    .map((x) => x.post);

  // Contextual internal links: services derived from this post + key locations.
  const relatedLinks = [
    ...relatedServiceLinks(post),
    { href: "/locations/surrey", label: "Tow Truck Surrey" },
    { href: "/locations/langley", label: "Towing Langley" },
  ];

  // Publish/modified dates, never in the future. dateModified === datePublished
  // unless the post declares a real updatedDate.
  const published = toISODate(post.date);
  const modified = post.updatedDate ? toISODate(post.updatedDate) : published;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `https://www.towingno1.com${post.image}`,
    datePublished: published,
    dateModified: modified,
    author: {
      "@type": "Organization",
      name: "TowingNo.1",
      url: "https://www.towingno1.com",
    },
    publisher: {
      "@type": "Organization",
      name: "TowingNo.1",
      logo: {
        "@type": "ImageObject",
        url: "https://www.towingno1.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.towingno1.com/blog/${post.slug}`,
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".article-excerpt"],
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.towingno1.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.towingno1.com/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://www.towingno1.com/blog/${post.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <section className="relative min-h-[340px] md:min-h-[420px] flex items-end bg-navy-950 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover opacity-40"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent" />
        </div>
        <div className="relative z-10 container-custom pb-10 md:pb-14">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-amber-400 text-sm font-medium hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 rounded transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
            {post.category ? (
              <span className="inline-block bg-amber-500/15 text-amber-300 text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full">
                {post.category}
              </span>
            ) : null}
          </div>
          <p className="text-amber-400 text-sm font-medium mb-3">
            {post.date} · By the TowingNo.1 Team
            {post.updatedDate ? ` · Updated ${post.updatedDate}` : ""}
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-white max-w-3xl leading-tight">{post.title}</h1>
        </div>
      </section>

      {/* Article Body */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <p className="article-excerpt text-xl text-slate-500 leading-relaxed mb-10 border-l-4 border-amber-500 pl-6 italic">
              {post.excerpt}
            </p>

            <div className="prose prose-lg prose-slate max-w-none">
              {renderBody(post.content)}
            </div>

            {/* CTA */}
            <div className="mt-12 p-8 bg-navy-950 rounded-2xl text-white text-center">
              <h3 className="text-2xl font-bold mb-3">Need Roadside Help Right Now?</h3>
              <p className="text-slate-300 mb-6">Available 24/7 across the Lower Mainland — average response time under 15 minutes.</p>
              <a
                href="tel:+17788380014"
                className="inline-flex items-center gap-2 btn-amber text-lg py-4 px-10 !rounded-full"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (778) 838-0014
              </a>
            </div>

            {/* Internal links */}
            <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <h3 className="font-bold text-navy-900 mb-4 text-sm uppercase tracking-wide">Related Services & Areas</h3>
              <div className="grid sm:grid-cols-2 gap-2">
                {relatedLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 shrink-0" aria-hidden="true"><path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd"/></svg> {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {otherPosts.length > 0 && (
        <section className="section-padding bg-slate-50">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-navy-900 mb-8">More from Our Blog</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {otherPosts.map((related) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  className="group card hover:shadow-card-hover transition-all duration-300 overflow-hidden !p-0"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={related.image}
                      alt={related.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-amber-600 font-medium mb-2">{related.date}</p>
                    <h3 className="font-bold text-navy-900 leading-snug group-hover:text-amber-600 transition-colors">
                      {related.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
