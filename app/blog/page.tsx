import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { blogPosts } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Blog - Towing Tips & Road Safety | TowingNo.1 BC",
  description: "Read helpful articles about vehicle maintenance, road safety, and towing tips from the experts at TowingNo.1 in BC.",
  alternates: {
    canonical: "https://towing-no-1.com/blog",
  },
  openGraph: {
    type: "website",
    url: "https://towing-no-1.com/blog",
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

  return (
    <>
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
              <span>→</span>
            </Link>
          )}
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
                    className="text-amber-600 font-bold text-sm hover:gap-2 inline-flex items-center gap-1 transition-all"
                  >
                    Read More <span>→</span>
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
              href="tel:+17788591457"
              className="btn-primary inline-flex items-center gap-2 text-lg py-4 px-10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              (778) 859-1457
            </a>

          </div>
        </div>
      </section>
    </>
  );
}
