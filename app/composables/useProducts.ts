export const useProducts = async () => {
  const { data: productsData } = await useAsyncData('products', () =>
    queryCollection('products').all()
  )

  const products = computed(() => {
    return productsData.value?.map((item: any) => ({
      title: item.title,
      slug: item.slug,
      image: item.image,
      price: item.price || 0,
      originalPrice: item.originalPrice || 0,
      category: item.category,
      order: item.order || 0
    })) || []
  })

  return {
    products,
    productsData
  }
}
