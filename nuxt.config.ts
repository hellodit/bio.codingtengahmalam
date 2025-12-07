// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: [
    '@nuxt/ui',
    '@nuxt/content'
  ],
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  
  // Static generation for optimal performance
  nitro: {
    prerender: {
      routes: ['/']
    }
  },
  
  // Content module configuration
  content: {
    highlight: {
      theme: 'github-dark'
    }
  },
  
  // Performance optimizations
  experimental: {
    payloadExtraction: false
  },
  
  // App configuration
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1'
    }
  }
})
