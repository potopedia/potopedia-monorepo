import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicRoutes = ['/', '/login', '/register', '/forgot-password', '/reset-password']
const authRoutes = ['/login', '/register']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if route is public
  const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith(route))
  const isAuthRoute = authRoutes.some(route => pathname === route || pathname.startsWith(route))

  // Get auth token from cookie
  const token = request.cookies.get('auth-token')?.value

  // Redirect logic
  if (!token && !isPublicRoute) {
    // No auth + protected route → redirect to login
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (token && isAuthRoute) {
    // Authenticated + auth page → redirect to dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ]
}
