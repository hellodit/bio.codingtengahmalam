export const useProduct = async (slug: string) => {
  const { data: productData, pending } = await useAsyncData(`product-${slug}`, async () => {
    // Get all products (same as useProducts)
    const products = await queryCollection('products').all()
    
    // Find product by slug
    const found = products.find((item: any) => item.slug === slug)
    
    return found || null
  })

  const product = computed(() => {
    if (!productData.value) return null
    
    const item = productData.value
    
    // Support both new and legacy field names
    return {
      id: item.id,
      slug: item.slug,
      title: item.name || item.title || '',
      name: item.name || item.title || '',
      image: item.coverImage || item.image || item.thumbnail || '',
      thumbnail: item.thumbnail || item.image || '',
      coverImage: item.coverImage || item.image || '',
      price: item.price || 0,
      originalPrice: item.original_price || item.originalPrice || 0,
      category: item.category || '',
      featured: item.is_featured !== undefined ? item.is_featured : (item.featured || false),
      order: item.position || item.order || 0,
      position: item.position || item.order || 0,
      summary: item.summary || '',
      body: item.body,
      purchaseUrl: item.url || item.purchaseUrl || '',
      url: item.url || item.purchaseUrl || '',
      ctaLabel: item.ctaLabel || '',
      ctaHelperText: item.ctaHelperText || item.bonus || '',
      bonus: item.ctaHelperText || item.bonus || '',
      type: item.type || 'product',
      scalev_variant_id: item.scalev_variant_id ?? ''
    }
  })

  return {
    product,
    productData,
    pending
  }
}
