<template>
  <UContainer class="py-3 space-y-4">
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
const { products } = await useProducts()

// Fetch featured links from content
const { featuredLinks } = await useFeaturedLinks()

// Set page metadata
useHead({
  title: `${profile.name} - ${profile.username}`,
  meta: [
    { name: 'description', content: profile.bio }
  ]
})
</script>
