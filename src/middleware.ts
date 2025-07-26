import { NextRequest, NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';

type DecodedToken = {
  role: string;
};

// Middleware function to handle authentication and routing
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('access_token');

  if (!token && pathname.startsWith('/managerpage')) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (!token && pathname.startsWith('/userpage')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (token) {
    try {
      const decoded: DecodedToken = jwtDecode(token.value);
      const role = decoded.role;

      if (role === 'resident' && pathname.startsWith('/managerpage')) {
        return NextResponse.redirect(new URL('/userpage', request.url));
      }

      if (role === 'admin' && pathname.startsWith('/userpage')) {
        return NextResponse.redirect(new URL('/managerpage', request.url));
      }

      if (pathname === '/' || pathname === '/login') {
        if (role === 'resident') {
          return NextResponse.redirect(new URL('/userpage', request.url));
        }
        if (role === 'admin') {
          return NextResponse.redirect(new URL('/managerpage', request.url));
        }
      }
    } catch (error) {
      const response = NextResponse.redirect(new URL('/', request.url));
      response.cookies.delete('access_token');
      return response;
    }
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico|public).*)'],
};
