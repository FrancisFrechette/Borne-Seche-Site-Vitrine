import { NextRequest, NextResponse } from 'next/server'
import { locales, defaultLocale } from '@/i18n/locales'

const BASIC_USER = process.env.BASIC_AUTH_USER || ''
const BASIC_PASS = process.env.BASIC_AUTH_PASSWORD || ''

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ── Basic Auth gate — FORCED on all matched routes ──
  // If env vars are set, require auth. If not, hardcode a fallback for testing.
  const user = BASIC_USER || 'admin'
  const pass = BASIC_PASS || 'admin'

  const authHeader = request.headers.get('authorization')
  let authenticated = false

  if (authHeader?.startsWith('Basic ')) {
    try {
      const decoded = atob(authHeader.split(' ')[1])
      const [u, p] = decoded.split(':')
      authenticated = u === user && p === pass
    } catch {
      authenticated = false
    }
  }

  if (!authenticated) {
    return new Response('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    })
  }

  // ── Locale routing (after auth passes) ──

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
  matcher: ['/((?!_next|api|admin|next|favicon\\.ico|sitemap\\.xml|.*\\..*).*)', '/'],
}
