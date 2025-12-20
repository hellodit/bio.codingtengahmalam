<template>
  <UContainer class="py-2 space-y-2">
    <ProfileCard :profile="profile" />
    
    <ProductGrid :products="products" />
    
    <FeaturedLinks :links="featuredLinks" />
  </UContainer>
</template>

<script setup lang="ts">
import ProfileCard from '~/components/profile/ProfileCard.vue';
import ProductGrid from '~/components/products/ProductGrid.vue';
import FeaturedLinks from '~/components/links/FeaturedLinks.vue';

const profile = useProfile()

const { products } = await useProducts()

const { featuredLinks } = await useFeaturedLinks()

useHead({
  title: `${profile.name} - ${profile.username}`,
  meta: [
    { name: 'description', content: profile.bio }
  ]
})
</script>
