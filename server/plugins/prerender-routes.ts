export default defineNitroPlugin(async (nitroApp) => {
  nitroApp.hooks.hook('prerender:routes', async (ctx) => {
    try {
      // Use serverQueryContent for server-side content access during prerender
      const { serverQueryContent } = await import('@nuxt/content/runtime/server')
      
      // Get all products from content collection
      const products = await serverQueryContent('products')
        .where({ _partial: false })
        .find()
      
      // Add routes for each product
      for (const product of products) {
        // Try slug first, then fallback to extracting from path
        const slug = product.slug || product._path?.split('/').pop()?.replace('.md', '') || product.id
        if (slug) {
          ctx.routes.add(`/products/${slug}`)
        }
      }
      
      console.log(`✅ Prerendering ${products.length} product routes`)
    } catch (error) {
      console.warn('⚠️ Could not generate product routes during prerender:', error)
      // This is OK - crawlLinks will discover routes from links on the homepage
    }
  })
})
