import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'لومینا - فروشگاه جامع آنلاین',
    short_name: 'لومینا',
    description: 'فروشگاه جامع آنلاین برای خرید محصولات متنوع',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0066cc',
    icons: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['business', 'shopping', 'health'],
    lang: 'fa',
    dir: 'rtl',
  }
}
