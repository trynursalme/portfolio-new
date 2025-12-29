import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decrypt } from '@/lib/auth'

export async function middleware(request: NextRequest) {
    const currentUser = request.cookies.get('session')?.value

    // 1. Check if route is protected
    if (request.nextUrl.pathname.startsWith('/admin')) {
        if (!currentUser || !(await decrypt(currentUser))) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    // 2. Redirect /login to /admin if already logged in
    if (request.nextUrl.pathname.startsWith('/login')) {
        if (currentUser && (await decrypt(currentUser))) {
            return NextResponse.redirect(new URL('/admin', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin', '/admin/:path*', '/login'],
}
