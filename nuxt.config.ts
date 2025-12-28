export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2025-07-15',
  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxtjs/mdc'
  ],
  content: {
    database: {
        type: 'd1',
        bindingName: process.env.NUXT_PUBLIC_DATABASE_BINDING_NAME ?? 'DATABASE'
    }
  },
  colorMode: {
    preference: 'light',
    fallback: 'light',
    classSuffix: '',
    storageKey: 'nuxt-color-mode'
  },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL ?? 'https://bio.codingtengahmalam.com',
      siteName: process.env.NUXT_PUBLIC_SITE_NAME ?? 'Coding Tengah Malam',
      siteDescription: process.env.NUXT_PUBLIC_SITE_DESCRIPTION ?? 'Saya Bantuin software engineer upgrade skill lebih cepat',
      siteLocale: 'id_ID'
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
  }
})
