<template>
  <UContainer class="py-6 space-y-8">
    <ProfileCard :profile="profile" />
    
    <ProductGrid :products="products" />
    
    <FeaturedLinks :links="featuredLinks" />
  </UContainer>
</template>

<script setup lang="ts">
import ProfileCard from '~/components/profile/ProfileCard.vue';
import ProductGrid from '~/components/products/ProductGrid.vue';
import FeaturedLinks from '~/components/links/FeaturedLinks.vue';

// Fetch profile data
const profile = useProfile()

// Fetch products from content
const { data: productsData } = await useAsyncData('products', () => 
  queryContent('/products')
    .where({ _type: 'markdown' })
    .find()
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

// Fetch featured links from content
const { data: linksData } = await useAsyncData('links', () =>
  queryContent('/links')
    .where({ _type: 'markdown' })
    .find()
)

const featuredLinks = computed(() => {
  return linksData.value?.map((item: any) => ({
    title: item.title,
    url: item.url,
    icon: item.icon,
    order: item.order || 0
  })) || []
})

// Set page metadata
useHead({
  title: `${profile.name} - ${profile.username}`,
  meta: [
    { name: 'description', content: profile.bio }
  ]
})
</script>
