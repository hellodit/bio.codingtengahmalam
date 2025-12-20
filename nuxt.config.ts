// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2025-07-15',
  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxtjs/mdc'
  ],
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  
  // Route rules for prerendering (Vercel best practice)
  routeRules: {
    // Prerender homepage
    '/': { prerender: true },
    // Prerender all product pages
    '/products/**': { prerender: true }
  },
  
  // Nitro configuration for static generation
  nitro: {
    // Alias configuration for server-side imports
    alias: {
      '#content/server': '@nuxt/content/runtime/server'
    },
    prerender: {
      // Automatically discover and prerender linked pages
      crawlLinks: true,
      // Don't fail build if some routes can't be prerendered
      failOnError: false
    }
  },
  
  // Content module configuration
  content: {
    highlight: {
      theme: 'github-dark'
    }
  },
  
  // MDC configuration
  mdc: {
    components: {
      prose: true,
      map: {
        // Custom component mapping
      }
    },
    highlight: {
      theme: 'github-dark'
    }
  },
  
  // Global components registration for MDC
  components: {
    global: true,
    path: './app/components'
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
  },
  
  // Runtime config for environment variables
  runtimeConfig: {
    scalevApiKey: process.env.SCALEV_API_KEY,
    scalevStoreUniqueId: process.env.SCALEV_STORE_UNIQUE_ID,
    scalevApiBaseUrl: process.env.SCALEV_API_BASE_URL || 'https://api.scalev.id',
    public: {
      // Public runtime config (exposed to client) can go here if needed
    }
  }
})
