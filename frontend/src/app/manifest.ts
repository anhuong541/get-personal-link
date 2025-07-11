import type { MetadataRoute } from 'next'

// app manifest for pwa
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Personal Habit Tracking for ADHD',
    short_name: 'HabitTracking',
    description: 'Habit Tracking app for ADHD',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ff7043',
    icons: [
      {
        src: '/assets/logo/logo-light-192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/assets/logo/logo-light-512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  }
}
