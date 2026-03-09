import { NextRequest, NextResponse } from 'next/server'
import type { MiddlewareConfig } from 'next/server'

const publicRoutes = [
  '/login',
  '/register',
  '/forgot-password',
  '/landing',
]

const REDIRECT_UNAUTHORIZED = '/login'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  console.log('middleware rodando:', request.nextUrl.pathname)

  // libera rotas públicas
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  /**
   * Better Auth usa cookies HttpOnly.
   * Se existe session_token, existe sessão.
   */
  const hasSession =
    request.cookies.has('better-auth.session_token') ||
    request.cookies.has('better-auth.session_data')

  if (!hasSession) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = REDIRECT_UNAUTHORIZED
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

export const config: MiddlewareConfig = {
  matcher: [
    '/((?!api|_next|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map|json)).*)',
  ],
}
