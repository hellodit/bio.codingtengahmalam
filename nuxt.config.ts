// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore - process.env is available at build time
const siteUrl = process.env.NUXT_PUBLIC_SITE_URL ?? 'https://bio.codingtengahmalam.com'

export default defineNuxtConfig({
  ssr: true,
  // Removed sqliteConnector: 'native' to fix Vercel deployment
  // Native SQLite doesn't work in serverless environments
  // Content will use in-memory storage which works fine for prerendered pages
  compatibilityDate: '2025-07-15',
  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxtjs/mdc'
  ],
  
  colorMode: {
    preference: 'light',
    fallback: 'light',
    classSuffix: '',
    storageKey: 'nuxt-color-mode'
  },
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  
  routeRules: {
    '/': { prerender: true },
    '/products/**': { prerender: true },
    '/products/**/checkout': { prerender: true }
  },
  
  // Nitro configuration for static generation
  nitro: {
    alias: {
      '#content/server': '@nuxt/content/runtime/server'
    },
    prerender: {
      crawlLinks: true,
      failOnError: false
    }
  },
  
  // SEO Configuration
  runtimeConfig: {
    public: {
      siteUrl,
      siteName: 'Coding Tengah Malam',
      siteDescription: 'Saya Bantuin software engineer upgrade skill lebih cepat',
      siteLocale: 'id'
    }
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'id'
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ],
    }
  },
})
