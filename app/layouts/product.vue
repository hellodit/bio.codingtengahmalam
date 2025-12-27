<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
    <AppNavbar />
    
  
    
    
    <!-- Main Content -->
    <main class="max-w-xl mx-auto flex-1">
      <div class="bg-white dark:bg-gray-800 border-x border-border">
        <slot />
      </div>
    </main>
    
    <AppFooter :name="profile.name" />
  </div>
  <Analytics />
</template>

<script setup lang="ts">
  import { Analytics } from '@vercel/analytics/nuxt'

import AppFooter from '~/components/layouts/AppFooter.vue'
import AppNavbar from '~/components/layouts/AppNavbar.vue'

const profile = useProfile()
const route = useRoute()
const slug = route.params.slug as string

// Fetch product data for the header image
</script>

