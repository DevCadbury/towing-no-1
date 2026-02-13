import Link from "next/link";

export default function Custom404() {
  return (
    <div style={{minHeight: '60vh'}} className="flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <p className="text-lg mt-4">Page not found.</p>
        <div className="mt-6">
          <Link href="/" className="text-primary underline">
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}
