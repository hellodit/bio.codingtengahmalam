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
    
    return {
      title: productData.value.title,
      slug: productData.value.slug,
      image: productData.value.image,
      price: productData.value.price || 0,
      originalPrice: productData.value.originalPrice || 0,
      category: productData.value.category,
      featured: productData.value.featured,
      order: productData.value.order || 0,
      body: productData.value.body,
      purchaseUrl: productData.value.purchaseUrl,
      bonus: productData.value.bonus
    }
  })

  return {
    product,
    productData,
    pending
  }
}
