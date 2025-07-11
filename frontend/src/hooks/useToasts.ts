import { ReactNode } from 'react'

import { ExternalToast, toast } from 'sonner'

type ToastType = 'success' | 'error' | 'info' | 'loading'

const defaultExter: ExternalToast = {
  duration: 2000,
  richColors: true
}

export default function useAppToast() {
  const showToast = (
    message: string | ReactNode,
    type: ToastType = 'info',
    external?: ExternalToast
  ) => {
    const externalData = { ...defaultExter, ...external } as ExternalToast

    switch (type) {
      case 'success':
        return toast.success(message, externalData)
      case 'error':
        return toast.error(message, externalData)
      case 'loading':
        return toast.loading(message, externalData)
      case 'info':
      default:
        return toast(message, externalData)
    }
  }

  return {
    showToast,
    success: (msg: string, external?: ExternalToast) => showToast(msg, 'success', external),
    error: (msg: string, external?: ExternalToast) => showToast(msg, 'error', external),
    info: (msg: string, external?: ExternalToast) => showToast(msg, 'info', external),
    loading: (msg: string, external?: ExternalToast) => showToast(msg, 'loading', external)
  }
}
