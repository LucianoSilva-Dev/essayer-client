import { type MiddlewareConfig, type NextRequest, NextResponse } from 'next/server'

const publicRoutes = [
  '/login',
  '/register',
  '/landing',
]

const protectedRoutes: Record<string, string[]> = {
  '/admin': ['admin'],
  '/criar_turma': ['admin', 'professor'],
  '/adicionar': ['admin', 'professor', 'aluno'],
  '/turmas_professor': ['admin', 'professor'],
  '/entrar_turma': ['admin', 'professor', 'aluno'],
  '/turma_aberta_prof': ['admin', 'professor'],
}

const REDIRECT_UNAUTHORIZED = '/login'
const REDIRECT_FORBIDDEN = '/home'

function parseJwt(token: string) {
  try {
    const base64Payload = token.split('.')[1]
    const payload = Buffer.from(base64Payload, 'base64').toString('utf-8')
    return JSON.parse(payload)
  } catch {
    return null
  }
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const token = request.cookies.get('accessToken')?.value


  if (publicRoutes.includes(pathname)) return NextResponse.next()

  if (!token) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = REDIRECT_UNAUTHORIZED
    return NextResponse.redirect(redirectUrl)
  }

  const payload = parseJwt(token)
  const userRole = payload?.cargo ?? null

  for (const route in protectedRoutes) {
    if (pathname.startsWith(route)) {
      if (!protectedRoutes[route].includes(userRole)) {
        const redirectUrl = request.nextUrl.clone()
        redirectUrl.pathname = REDIRECT_FORBIDDEN
        return NextResponse.redirect(redirectUrl)
      }
    }
  }

  return NextResponse.next()
}

export const config: MiddlewareConfig = {
  matcher: [
    '/((?!api|_next|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map|json)).*)',
  ],
}
