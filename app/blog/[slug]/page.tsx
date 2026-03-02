import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { blogPosts, getPostBySlug } from "@/lib/blog-posts";

interface Props {
  params: Promise<{ slug: string }>;
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
      canonical: `https://towing-no-1.com/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      url: `https://towing-no-1.com/blog/${post.slug}`,
      title: post.title,
      description: post.excerpt,
      publishedTime: new Date(post.date).toISOString(),
      images: [
        {
          url: post.image,
          width: 800,
          height: 600,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const otherPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  // Parse markdown-ish content into paragraphs/headings
  const lines = post.content.trim().split("\n");

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: new Date(post.date).toISOString(),
    author: {
      "@type": "Organization",
      name: "TowingNo.1",
      url: "https://towing-no-1.com",
    },
    publisher: {
      "@type": "Organization",
      name: "TowingNo.1",
      logo: {
        "@type": "ImageObject",
        url: "https://towing-no-1.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://towing-no-1.com/blog/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[360px] flex items-end bg-navy-950 overflow-hidden">
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
        <div className="relative z-10 container-custom pb-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-amber-400 text-sm font-medium mb-4 hover:text-amber-300 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
          <p className="text-amber-400 text-sm font-medium mb-3">{post.date}</p>
          <h1 className="text-3xl md:text-5xl font-bold text-white max-w-3xl leading-tight">{post.title}</h1>
        </div>
      </section>

      {/* Article Body */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <p className="text-xl text-slate-500 leading-relaxed mb-10 border-l-4 border-amber-500 pl-6 italic">
              {post.excerpt}
            </p>

            <div className="prose prose-lg prose-slate max-w-none">
              {lines.map((line, i) => {
                if (line.startsWith("## ")) {
                  return (
                    <h2 key={i} className="text-2xl font-bold text-navy-900 mt-10 mb-4">
                      {line.replace("## ", "")}
                    </h2>
                  );
                }
                if (line.startsWith("**") && line.endsWith("**")) {
                  return (
                    <p key={i} className="font-bold text-navy-900 mt-6 mb-2">
                      {line.replace(/\*\*/g, "")}
                    </p>
                  );
                }
                if (line.startsWith("- ")) {
                  return (
                    <li key={i} className="text-slate-600 ml-6 list-disc mb-1">
                      {line.replace("- ", "")}
                    </li>
                  );
                }
                if (line.startsWith("---")) {
                  return (
                    <div key={i} className="mt-10 p-6 bg-amber-50 border border-amber-200 rounded-2xl">
                      <p className="text-slate-700 font-medium text-sm">
                        {lines[i + 1] || ""}
                      </p>
                    </div>
                  );
                }
                if (line.trim() === "" || (i > 0 && lines[i - 1]?.startsWith("---"))) {
                  return null;
                }
                return (
                  <p key={i} className="text-slate-600 leading-relaxed mb-5">
                    {line}
                  </p>
                );
              })}
            </div>

            {/* CTA */}
            <div className="mt-12 p-8 bg-navy-950 rounded-2xl text-white text-center">
              <h3 className="text-2xl font-bold mb-3">Need Roadside Help Right Now?</h3>
              <p className="text-slate-300 mb-6">Available 24/7 across the Lower Mainland — average response time under 15 minutes.</p>
              <a
                href="tel:+17788591457"
                className="inline-flex items-center gap-2 btn-amber text-lg py-4 px-10 !rounded-full"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (778) 859-1457
              </a>
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
