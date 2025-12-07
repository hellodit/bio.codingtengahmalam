export default defineNitroPlugin(async (nitroApp) => {
  nitroApp.hooks.hook('prerender:routes', async (ctx) => {
    try {
      // Use the content module's server utilities
      const { serverQueryContent } = await import('#content/server')
      
      // Get all products
      const products = await serverQueryContent('products')
        .where({ _partial: false })
        .find()
      
      // Add routes for each product
      for (const product of products) {
        const slug = product.slug || product._path?.split('/').pop()?.replace('.md', '')
        if (slug) {
          ctx.routes.add(`/products/${slug}`)
        }
      }
      
      console.log(`✅ Added ${products.length} product routes for prerendering`)
    } catch (error) {
      console.warn('⚠️ Could not generate product routes (this is OK if content is not available during build):', error)
    }
  })
})
