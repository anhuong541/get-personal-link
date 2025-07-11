import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { AUTH_COOKIE } from './constants/cookies'

import type { NextRequest } from 'next/server'

const listRoute = ['/', '/login', '/register', '/habits', '/financial']
const authRoute = ['/login', '/register']

const checkUser = async () => {
  const cookie = await cookies()
  return cookie.get(AUTH_COOKIE)?.value
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const firstpathname = '/' + pathname.split('/')[1]
  if (!listRoute.includes(firstpathname)) {
    return NextResponse.next()
  }
  const userToken = await checkUser()
  if (userToken && authRoute.includes(firstpathname)) {
    return NextResponse.redirect(new URL('/', request.url))
  } else if (!userToken && !authRoute.includes(firstpathname)) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/login', '/register', '/habits', '/financial']
}
