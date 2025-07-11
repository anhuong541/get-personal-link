'use server'

import { cookies } from 'next/headers'

export const createCookie = async (name: string, value: string) => {
  ;(await cookies()).set(name, value)
}

export const removeCookie = async (name: string) => {
  ;(await cookies()).delete(name)
}

export const setCookie = async (name: string, value: string) => {
  ;(await cookies()).set(name, value)
}
