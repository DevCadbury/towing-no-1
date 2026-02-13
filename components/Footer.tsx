import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <Image
                src="/logo.png"
                alt="TowingNo.1 - Emergency & Roadside Services"
                width={200}
                height={55}
                className="h-12 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-gray-400 text-sm">
              Fast, reliable 24/7 emergency towing and roadside assistance serving Surrey, British Columbia.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-400 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-400">Emergency Towing</li>
              <li className="text-gray-400">Flat Tire Assistance</li>
              <li className="text-gray-400">Battery Boost</li>
              <li className="text-gray-400">Vehicle Recovery</li>
              <li className="text-gray-400">Lockout Services</li>
              <li className="text-gray-400">Long Distance Towing</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <strong className="text-white">Phone:</strong><br />
                <a href="tel:+16045551234" className="hover:text-primary transition-colors">
                  (604) 555-1234
                </a>
              </li>
              <li>
                <strong className="text-white">Email:</strong><br />
                <a href="mailto:info@towing-no-1.com" className="hover:text-primary transition-colors">
                  info@towing-no-1.com
                </a>
              </li>
              <li>
                <strong className="text-white">Address:</strong><br />
                Surrey, BC, Canada
              </li>
              <li>
                <strong className="text-white">Hours:</strong><br />
                24/7 - Always Available
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>© 2026 TowingNo.1 - All Rights Reserved</p>
          <p className="mt-1">
            <a href="https://www.towing-no-1.com" className="hover:text-primary transition-colors">
              www.towing-no-1.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
