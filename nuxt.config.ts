// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  content: {
    experimental: {
      sqliteConnector: 'native',
    },
  },
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
    '/products/**/checkout': { index: false, prerender: true }
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
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://bio.codingtengahmalam.com',
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
