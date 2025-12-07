// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: [
    '@nuxt/ui',
    '@nuxt/content'
  ],
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  
  // Route rules for prerendering (Vercel best practice)
  // These ensure content routes are discovered and prerendered during build
  routeRules: {
    // Prerender homepage
    '/': { prerender: true },
    // Prerender all product pages (content from content/products)
    '/products/**': { prerender: true },
    // Prerender link pages if they exist as routes (content from content/links)
    '/links/**': { prerender: true }
  },
  
  // Nitro configuration for static generation
  nitro: {
    prerender: {
      // Automatically discover and prerender linked pages
      crawlLinks: true,
      // Don't fail build if some routes can't be prerendered
      failOnError: false,
      // Explicitly include routes that may not be linked from the homepage
      // Add specific paths here if they're not discovered by crawlLinks
      routes: [
        // Example: '/blog/my-post', '/custom-page'
        // Currently relying on crawlLinks to discover product and link pages
      ]
    }
  },
  
  // Content module configuration
  content: {
    // Enable document-driven mode for content pages
    // This allows pages to be automatically generated from content files
    documentDriven: true,
    // Enable navigation generation from content structure
    // Useful for building menus and breadcrumbs from content hierarchy
    navigation: true,
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
