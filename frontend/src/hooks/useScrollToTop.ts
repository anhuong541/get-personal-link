import { useEffect } from 'react'

export default function useScrollToTop(pathname: string) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
}
