import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
export { default } from 'next-auth/middleware';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  console.log('Token:', token);

  if (token) {
    if (
      url.pathname.startsWith('/sign-in') ||
      url.pathname.startsWith('/sign-up') ||
      url.pathname.startsWith('/verify') ||
      url.pathname === '/'
    ) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  } else {
    // Redirect to sign-in if token is missing and trying to access protected pages
    if (url.pathname.startsWith('/dashboard') || url.pathname.startsWith('/verify')) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  }

  // Default behavior if nothing matches
  return NextResponse.next();
}

// Config to match paths
export const config = {
  matcher: ['/sign-in', '/sign-up', '/', '/dashboard/:path*', '/verify/:path*'],
};
