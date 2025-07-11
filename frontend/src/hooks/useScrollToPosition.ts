import { useEffect, useState } from 'react'

export default function useScrollPosition(ref: React.RefObject<HTMLElement>) {
  const [scrollPosition, setScrollPosition] = useState({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  })

  useEffect(() => {
    const updatePosition = () => {
      if (!ref?.current) return
      setScrollPosition(ref?.current?.getBoundingClientRect?.())
    }

    window.addEventListener('scroll', updatePosition)
    updatePosition()

    return () => window.removeEventListener('scroll', updatePosition)
  }, [ref])

  return scrollPosition
}
