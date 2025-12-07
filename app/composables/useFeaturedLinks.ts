export const useFeaturedLinks = async () => {
  const { data: linksData } = await useAsyncData('links', () =>
    queryCollection('links').all()
  )

  const featuredLinks = computed(() => {
    return linksData.value?.map((item: any) => ({
      title: item.title,
      url: item.url,
      icon: item.icon,
      order: item.order || 0
    })) || []
  })

  return {
    featuredLinks,
    linksData
  }
}
