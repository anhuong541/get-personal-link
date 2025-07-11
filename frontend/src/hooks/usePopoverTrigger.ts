import { useCallback, useState } from 'react'

export default function usePopoverTrigger() {
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [trigger, setTrigger] = useState('hover')

  const handleMouseEvent = useCallback(() => {
    setTrigger('hover')
  }, [])

  const handleClickEvent = useCallback(() => {
    setTrigger('click')
  }, [])

  const handlePopoverChange = useCallback(
    (tooltipShown: boolean) => {
      if (trigger === 'click' && popoverOpen) return
      setPopoverOpen(tooltipShown)
    },
    [popoverOpen, trigger]
  )
  return {
    trigger,
    popoverOpen,
    handleMouseEvent,
    handleClickEvent,
    handlePopoverChange
  }
}
