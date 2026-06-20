import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { blogPosts } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Blog - Towing Tips & Road Safety | TowingNo.1 BC",
  description: "Read helpful articles about vehicle maintenance, road safety, and towing tips from the experts at TowingNo.1 in BC.",
  alternates: {
    canonical: "https://www.towingno1.com/blog",
  },
  openGraph: {
    type: "website",
    url: "https://www.towingno1.com/blog",
    title: "Blog - Towing Tips & Road Safety | TowingNo.1 BC",
    description: "Expert advice on vehicle maintenance, road safety, and emergency preparedness from BC's trusted towing company.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - Towing Tips & Road Safety | TowingNo.1 BC",
    description: "Expert advice on vehicle maintenance, road safety, and emergency preparedness from BC's trusted towing company.",
  },
};

export default function Blog() {
  const featured = blogPosts.find((p) => p.featured);
  const rest = blogPosts.filter((p) => !p.featured);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.towingno1.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.towingno1.com/blog" },
    ],
  };

  const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "TowingNo.1 Blog — Towing Tips & Road Safety",
    url: "https://www.towingno1.com/blog",
    itemListElement: blogPosts.map((post, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://www.towingno1.com/blog/${post.slug}`,
      name: post.title,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }} />
      {/* Hero with Featured Post */}
      <section className="relative min-h-[500px] flex items-end bg-navy-950 overflow-hidden">
        <div className="absolute inset-0">
          {featured && (
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              className="object-cover opacity-30"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/40" />
          <div className="absolute bottom-0 left-[20%] w-[400px] h-[400px] bg-amber-500/8 blur-[100px] rounded-full" />
        </div>
        <div className="relative z-10 container-custom pb-16 pt-40">
          <span className="text-amber-400 font-semibold text-sm uppercase tracking-widest mb-4 block">Our Blog</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Tips, Advice & <span className="text-gradient-gold">Insights</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-xl mb-8">
            Expert road safety knowledge for BC drivers.
          </p>
          {featured && (
            <Link
              href={`/blog/${featured.slug}`}
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/15 text-white px-6 py-3 rounded-xl hover:bg-amber-500 hover:text-navy-900 hover:border-amber-500 transition-all duration-500 font-semibold"
            >
              Read Featured Post
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4" aria-hidden="true"><path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd"/></svg>
            </Link>
          )}
        </div>
      </section>

      {/* Blog Intro / Overview */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-3 block">What you&apos;ll find here</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy-900 leading-tight mb-5">
              Practical Road Safety &amp; Towing Advice for BC Drivers
            </h2>
            <div className="space-y-4 text-slate-600 text-base leading-relaxed">
              <p>
                The TowingNo.1 blog is where we share what we have learned from thousands of roadside calls across the Lower Mainland. Every article is written for real situations BC drivers actually face — a breakdown on a busy stretch of Highway 1, a battery that will not turn over on a frosty Surrey morning, or a tire that lets go far from the nearest shop. The goal is simple: help you stay safe, make good decisions under pressure, and avoid the small mistakes that turn a minor problem into an expensive one.
              </p>
              <p>
                You will find step-by-step safety guides for highway breakdowns, seasonal maintenance checklists tailored to British Columbia&apos;s wet winters and mountain routes, and clear explanations of how to recognise warning signs before they leave you stranded. We cover the everyday essentials too — what belongs in a vehicle emergency kit, how to tell when a battery is on its way out, and when a roadside fix is safe to attempt yourself versus when it is smarter to call a professional.
              </p>
              <p>
                We also demystify the towing itself. Knowing the difference between flatbed, wheel-lift, and heavy-duty towing — and why electric and all-wheel-drive vehicles need special handling — helps you ask the right questions and protect your vehicle when you do need help. Browse the articles below, and keep our number, (778) 838-0014, saved for the moment you need fast, local assistance.
              </p>
              <p>
                Much of what we write is shaped by the geography we work in. Driving in the Lower Mainland means dealing with the Trans-Canada climbing toward the SFU exit, the long rural section lines past Aldergrove, the flood-prone underpasses around Richmond, and the steep, switchback hills of Coquitlam and the North Shore that turn treacherous the moment temperatures drop. Each of these settings creates its own kind of breakdown, and our guides reflect the conditions you are most likely to meet rather than generic advice written for nowhere in particular.
              </p>
              <p>
                Seasonality matters here too. A wet October brings hydroplaning and dead wipers; the first cold snap of winter floods our lines with no-start batteries and snow-bank recoveries; spring road trips to the Interior expose cooling systems that limped through the off-season. Reading ahead of the season — fitting winter tires before the law requires them, testing a three-year-old battery before November, packing an emergency kit before the long weekend — is the cheapest insurance a driver can buy, and most of it takes only a few minutes in the driveway.
              </p>
              <p>
                If you are new here, a good place to start is our guide to what to do when your car breaks down on the highway, followed by the seasonal maintenance and emergency-kit articles. Together they cover the situations that account for the overwhelming majority of the roadside calls we answer every week. We update these posts as conditions, vehicles, and BC regulations change, so the advice stays accurate and genuinely useful for the way people actually drive across the region.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <article
                key={post.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1 border border-slate-100"
              >
                <div className="relative h-[220px] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-6">
                  <span className="inline-block text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full mb-3">{post.date}</span>
                  <h2 className="text-lg font-bold mb-3 leading-snug text-navy-900 group-hover:text-amber-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-slate-500 mb-4 leading-relaxed text-sm line-clamp-3">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-amber-600 font-bold text-sm inline-flex items-center gap-1.5 hover:gap-2.5 transition-all"
                  >
                    Read More
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true"><path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd"/></svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-padding bg-navy-950 text-white">
        <div className="container-custom max-w-2xl text-center">
          <span className="text-amber-400 font-semibold text-sm uppercase tracking-widest mb-4 block">Newsletter</span>
          <h2 className="text-3xl font-bold mb-4">Stay Informed</h2>
          <p className="text-slate-400 mb-8">
            Subscribe for road safety tips, maintenance advice, and company updates.
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-3.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
            />
            <button type="submit" className="btn-amber whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy-900 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Emergency Assistance?</h2>
          <p className="text-lg mb-8 text-slate-300">We&apos;re here 24/7 to help</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+17788380014"
              className="btn-primary inline-flex items-center gap-2 text-lg py-4 px-10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              (778) 838-0014
            </a>

          </div>
        </div>
      </section>
    </>
  );
}
