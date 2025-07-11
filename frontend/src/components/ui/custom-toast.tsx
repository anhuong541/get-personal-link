'use client'

import { useTheme } from 'next-themes'
import { Toaster as Sonner } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group relative flex max-w-md w-full cursor-pointer rounded-lg border border-border bg-background p-4 shadow-lg transition ' +
            'hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 ' +
            'dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100',
          title: 'mb-1 font-semibold text-lg text-foreground dark:text-gray-100',
          description: 'text-sm text-muted-foreground dark:text-gray-400',
          actionButton:
            'ml-4 rounded-md bg-primary px-3 py-1 text-sm font-medium text-primary-foreground transition ' +
            'hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1',
          cancelButton:
            'ml-2 rounded-md bg-muted px-3 py-1 text-sm font-medium text-muted-foreground transition ' +
            'hover:bg-muted/90 focus:outline-none focus:ring-2 focus:ring-muted focus:ring-offset-1',
          icon: 'mr-3 flex h-6 w-6 items-center justify-center text-primary'
        }
      }}
      {...props}
    />
  )
}

export { Toaster }
