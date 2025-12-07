export const useProducts = async () => {
  const { data: productsData } = await useAsyncData('products', () =>
    queryCollection('products').all()
  )

  const products = computed(() => {
    return productsData.value?.map((item: any) => {
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
        type: item.type || 'product'
      }
    }) || []
  })

  return {
    products,
    productsData
  }
}
