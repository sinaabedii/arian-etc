import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/dashboard/',
          '/auth/',
          '/checkout/',
          '/cart/',
          '/wishlist/',
          '/invoice/',
          '/_next/',
          '/private/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/dashboard/',
          '/auth/',
          '/checkout/',
          '/cart/',
          '/wishlist/',
          '/invoice/',
        ],
      },
    ],
    sitemap: 'https://akandchimi.com/sitemap.xml',
    host: 'https://akandchimi.com',
  }
}
