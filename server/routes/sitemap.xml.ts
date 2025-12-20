export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl || 'https://codingtengahmalam.com'
  const baseUrl = siteUrl.replace(/\/$/, '')
  
  // Get all products from content collection
  let products: any[] = []
  try {
    const { serverQueryContent } = await import('@nuxt/content/runtime/server')
    const productsData = await serverQueryContent('products')
      .where({ _partial: false })
      .find()
    
    products = productsData.map((item: any) => ({
      slug: item.slug || item._path?.split('/').pop()?.replace('.md', '') || item.id,
      updatedAt: item.updatedAt || item._file?.updatedAt || new Date().toISOString()
    }))
  } catch (error) {
    console.warn('Could not fetch products for sitemap:', error)
  }
  
  // Generate sitemap XML
  const urls = [
    {
      loc: baseUrl,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'daily',
      priority: '1.0'
    },
    ...products.map(product => ({
      loc: `${baseUrl}/products/${product.slug}`,
      lastmod: product.updatedAt ? new Date(product.updatedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: '0.8'
    }))
  ]
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`
  
  event.node.res.setHeader('Content-Type', 'application/xml')
  return sitemap
})

