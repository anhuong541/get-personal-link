import { useRef } from 'react'

export default function useReadFirstMount() {
  const isMountRef = useRef(false)
  isMountRef.current = true
  return { isMount: isMountRef.current }
}
