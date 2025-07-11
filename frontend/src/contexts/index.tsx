import { ReactNode } from 'react'

import ClientContextProvider from './ContextClient'

export default async function ContextProvider({ children }: { children: ReactNode }) {
  return <ClientContextProvider>{children}</ClientContextProvider>
}
