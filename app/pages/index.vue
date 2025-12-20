<template>
  <UContainer class="py-2 space-y-2 dark:bg-gray-800">
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

const { getFullUrl, createPersonSchema, createOrganizationSchema, addStructuredData } = useStructuredData()
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl || 'https://codingtengahmalam.com'
const pageTitle = `${profile.name} - ${profile.username}`
const pageDescription = profile.bio || 'Saya Bantuin software engineer upgrade skill lebih cepat'
const pageImage = getFullUrl(profile.avatar)
const pageUrl = getFullUrl('/')

// SEO Meta Tags
useHead({
  title: pageTitle,
  meta: [
    { name: 'description', content: pageDescription },
    
    // Open Graph
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: pageDescription },
    { property: 'og:image', content: pageImage },
    { property: 'og:url', content: pageUrl },
    { property: 'og:type', content: 'profile' },
    
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: pageTitle },
    { name: 'twitter:description', content: pageDescription },
    { name: 'twitter:image', content: pageImage },
    { name: 'twitter:creator', content: profile.username }
  ]
})

// Structured Data
addStructuredData(createPersonSchema(profile))
addStructuredData(createOrganizationSchema(profile))
</script>
