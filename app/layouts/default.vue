<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
    <AppNavbar />
      
    <main class="max-w-xl mx-auto">
      <div class="bg-white dark:bg-gray-800 border-x border-border">
        <slot />
      </div>
    </main>
    <AppFooter :name="profile.name" />
  </div>
</template>

<script setup lang="ts">
import AppFooter from '~/components/layouts/AppFooter.vue';
import AppNavbar from '~/components/layouts/AppNavbar.vue';

const profile = useProfile()
const route = useRoute()
const config = useRuntimeConfig()
const { getFullUrl } = useStructuredData()

const siteUrl = config.public.siteUrl || 'https://codingtengahmalam.com'
const currentUrl = getFullUrl(route.path)
const siteName = config.public.siteName || 'Coding Tengah Malam'
const defaultDescription = config.public.siteDescription || profile.bio
const defaultImage = getFullUrl(profile.avatar)

// Default SEO meta tags
useHead({
  meta: [
    // Open Graph
    { property: 'og:site_name', content: siteName },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: currentUrl },
    { property: 'og:image', content: defaultImage },
    { property: 'og:locale', content: 'id_ID' },
    
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:image', content: defaultImage },
    
    // Theme color for mobile browsers
    { name: 'theme-color', content: '#ffffff' }
  ],
  link: [
    { rel: 'canonical', href: currentUrl }
  ]
})
</script>
