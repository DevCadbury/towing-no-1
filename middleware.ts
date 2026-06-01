import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';
  
  // Canonical domain
  const canonicalDomain = 'www.towingno1.com';
  
  // Check if we need to redirect
  const needsRedirect = 
    hostname !== canonicalDomain && 
    (hostname === 'towingno1.com' || 
     hostname === 'towing-no-1.com' || 
     hostname === 'www.towing-no-1.com');
  
  if (needsRedirect) {
    url.host = canonicalDomain;
    url.protocol = 'https:';
    return NextResponse.redirect(url, { status: 301 });
  }
  
  // Ensure HTTPS
  if (url.protocol === 'http:' && process.env.NODE_ENV === 'production') {
    url.protocol = 'https:';
    return NextResponse.redirect(url, { status: 301 });
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
