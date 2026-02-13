import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found - TowingNo.1",
  description: "The page you're looking for doesn't exist. Return to TowingNo.1 homepage or contact us for emergency assistance.",
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center section-padding">
      <div className="container-custom text-center">
        <h1 className="text-6xl md:text-8xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Page Not Found</h2>
        <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-block bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 transition-colors"
          >
            Go Home
          </Link>
          <a
            href="tel:+16045551234"
            className="inline-block bg-black hover:bg-gray-800 text-white font-bold py-3 px-8 transition-colors"
          >
            Call for Help
          </a>
        </div>
      </div>
    </div>
  );
}
