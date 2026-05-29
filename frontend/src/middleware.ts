import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes accessible without authentication
const PUBLIC_ROUTES = ['/login', '/register', '/forgot-password', '/reset-password'];

// Routes that authenticated users should not access (e.g. login page)
const AUTH_ROUTES = ['/login', '/register'];

// Default redirect after successful login
const DEFAULT_AUTHENTICATED_REDIRECT = '/dashboard';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = request.cookies.has('has_session');

  const isPublicRoute = PUBLIC_ROUTES.some((r) => pathname.startsWith(r));
  const isAuthRoute = AUTH_ROUTES.some((r) => pathname.startsWith(r));

  // Authenticated user hitting a login/register page → send to dashboard
  if (hasSession && isAuthRoute) {
    return NextResponse.redirect(new URL(DEFAULT_AUTHENTICATED_REDIRECT, request.url));
  }

  // Unauthenticated user hitting a protected route → send to login
  if (!hasSession && !isPublicRoute) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Skip Next.js internals, static files, and API routes
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
