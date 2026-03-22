import { NextRequest, NextResponse } from 'next/server'
import { locales, defaultLocale } from '@/i18n/locales'

function isBasicAuthRequired() {
  return Boolean(process.env.BASIC_AUTH_USER && process.env.BASIC_AUTH_PASSWORD)
}

function isAuthenticated(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization')
  if (!authHeader?.startsWith('Basic ')) return false

  const base64Credentials = authHeader.split(' ')[1]
  const credentials = atob(base64Credentials)
  const [user, password] = credentials.split(':')

  return user === process.env.BASIC_AUTH_USER && password === process.env.BASIC_AUTH_PASSWORD
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip admin, API, static files, and payload routes (no auth needed)
  const isSkippedRoute =
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/next') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/search') ||
    pathname.endsWith('sitemap.xml') ||
    pathname.includes('.')

  // Basic Auth gate — only if env vars are set and route is not skipped
  if (!isSkippedRoute && isBasicAuthRequired() && !isAuthenticated(request)) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Chantier Privé — Solutions d\'eau Bourgelas"',
      },
    })
  }

  // Skip locale logic for non-page routes
  if (isSkippedRoute) {
    return NextResponse.next()
  }

  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  if (pathnameHasLocale) {
    return NextResponse.next()
  }

  // Detect preferred locale from Accept-Language header
  const acceptLanguage = request.headers.get('accept-language') || ''
  const preferredLocale = acceptLanguage.includes('en') ? 'en' : defaultLocale

  // Redirect to the locale-prefixed path
  const url = request.nextUrl.clone()
  url.pathname = `/${preferredLocale}${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!_next|admin|api|next|favicon|sitemap|.*\\..*).*)'],
}
