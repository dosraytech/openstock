// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  typescript: {
    typeCheck: true,
  },
  modules: ['@nuxt/fonts', '@nuxt/icon', '@nuxtjs/tailwindcss', '@pinia/nuxt'],
  plugins: ['~/plugins/apexcharts.client.ts'],
  components: {
    global: true,
    dirs: [
      '~/components',
      '~/components/dashboard',
      '~/components/layout/dashboard',
    ],
  },
  app: {
    head: {
      title: 'OpenStock',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'An open source inventory management system built with Nuxt 3 and PocketBase',
        },
      ],
    },
  },
  nitro: {
    // Security headers and configurations
    routeRules: {
      '/**': {
        headers: {
          // Content Security Policy - XSS protection
          'Content-Security-Policy':
            process.env.NODE_ENV === 'production'
              ? "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self';"
              : "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' ws: wss:;",
          // Clickjacking protection
          'X-Frame-Options': 'DENY',
          // MIME sniffing protection
          'X-Content-Type-Options': 'nosniff',
          // XSS protection
          'X-XSS-Protection': '1; mode=block',
          // HTTPS enforcement (only in production)
          ...(process.env.NODE_ENV === 'production' && {
            'Strict-Transport-Security':
              'max-age=31536000; includeSubDomains; preload',
          }),
          // Referrer policy - prevent information leakage
          'Referrer-Policy': 'strict-origin-when-cross-origin',
          // Permissions policy - restrict sensitive APIs
          'Permissions-Policy':
            'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()',
          // Cross-Origin policies
          'Cross-Origin-Embedder-Policy': 'require-corp',
          'Cross-Origin-Opener-Policy': 'same-origin',
          'Cross-Origin-Resource-Policy': 'same-origin',
        },
      },
    },
  },
  // Enhanced SSR security
  ssr: true,
  experimental: {
    payloadExtraction: false, // Prevent payload extraction vulnerabilities
  },
});
