import { ReactNode, Suspense } from 'react'

import ContextProvider from '@/contexts'

import ClientProvider from './ClientProvider'

export default function Provider({ children }: { children: ReactNode }) {
  return (
    <Suspense>
      <ContextProvider>
        <ClientProvider>{children}</ClientProvider>
      </ContextProvider>
    </Suspense>
  )
}
