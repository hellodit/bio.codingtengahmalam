// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
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
    '/products/**': { prerender: true }
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
  
  

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      script: [
        {
          innerHTML: `document.documentElement.classList.remove('dark'); try { localStorage.removeItem('nuxt-color-mode'); } catch(e) {}`,
          type: 'text/javascript'
        }
      ]
    }
  },
})
