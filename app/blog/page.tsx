import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Towing Tips & Road Safety | TowingNo.1 Surrey BC",
  description: "Read helpful articles about vehicle maintenance, road safety, and towing tips from the experts at TowingNo.1 in Surrey, BC.",
  openGraph: {
    title: "TowingNo.1 Blog - Road Safety & Towing Tips",
    description: "Expert advice on vehicle maintenance, road safety, and emergency preparedness from Surrey's trusted towing company.",
  },
};

const blogPosts = [
  {
    id: 1,
    title: "What to Do When Your Car Breaks Down on the Highway",
    excerpt: "A step-by-step guide to staying safe when your vehicle breaks down on busy roads. Learn the essential safety measures every driver should know.",
    date: "February 10, 2026",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=800",
    slug: "what-to-do-car-breaks-down-highway"
  },
  {
    id: 2,
    title: "How to Prepare Your Vehicle for Winter in BC",
    excerpt: "Winter driving in British Columbia requires preparation. Discover essential maintenance tips to keep your vehicle running smoothly during cold weather.",
    date: "February 5, 2026",
    image: "https://images.unsplash.com/photo-1511994714008-b6d68a8b32c2?q=80&w=800",
    slug: "prepare-vehicle-winter-bc"
  },
  {
    id: 3,
    title: "5 Signs Your Car Battery is Dying",
    excerpt: "Don't get caught with a dead battery. Learn to recognize the warning signs that your car battery needs replacement before it fails.",
    date: "January 28, 2026",
    image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=800",
    slug: "signs-car-battery-dying"
  },
  {
    id: 4,
    title: "Emergency Kit Essentials Every Driver Needs",
    excerpt: "Be prepared for any roadside emergency with these must-have items. A well-stocked emergency kit can make all the difference.",
    date: "January 20, 2026",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=800",
    slug: "emergency-kit-essentials"
  },
  {
    id: 5,
    title: "When to Call for a Tow vs. Fix it Yourself",
    excerpt: "Some roadside issues can be handled yourself, while others require professional help. Learn when it's safe to DIY and when to call for assistance.",
    date: "January 12, 2026",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=800",
    slug: "when-call-tow-vs-fix-yourself"
  },
  {
    id: 6,
    title: "Understanding Different Types of Towing Services",
    excerpt: "Not all towing is the same. Explore the different types of towing services available and when each one is appropriate for your situation.",
    date: "January 5, 2026",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=800",
    slug: "understanding-towing-services"
  }
];

export default function Blog() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center bg-gray-900">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2000"
            alt="TowingNo.1 blog"
            fill
            className="object-cover opacity-40"
          />
        </div>
        <div className="relative z-10 container-custom text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
          <p className="text-xl text-gray-200">
            Tips, advice, and insights for Surrey drivers
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-white shadow-md hover:shadow-lg transition-shadow">
                <div className="relative h-[250px]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                  <h2 className="text-xl font-bold mb-3 leading-tight">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-primary font-bold hover:underline"
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Informed</h2>
          <p className="text-gray-600 mb-8">
            Subscribe to our newsletter for road safety tips, maintenance advice, and company updates delivered to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 focus:outline-none focus:border-primary"
            />
            <button type="submit" className="btn-primary">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-black text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need Emergency Assistance?
          </h2>
          <p className="text-xl mb-8">
            We're here 24/7 to help
          </p>
          <a
            href="tel:+16045551234"
            className="inline-block bg-primary hover:bg-primary-dark text-white font-bold py-4 px-12 text-lg transition-colors"
          >
            Call (604) 555-1234
          </a>
        </div>
      </section>
    </>
  );
}
