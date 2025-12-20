<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
    <AppNavbar />
    
    <!-- Full Width Header Image -->
    <template v-if="!pending && product && (product.coverImage || product.image)">
      <div class="max-w-xl mx-auto relative">
        <img
          :src="product.coverImage || product.image"
          :alt="product.title || product.name || 'Product Image'"
          class="w-full h-[400px] md:h-[500px] object-cover"
        />
        <!-- Optional overlay gradient for better text readability if needed -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>
    </template>
    
    <!-- Loading State for Header -->
    <div v-else-if="pending" class="w-full h-[400px] md:h-[500px] bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
    
    <!-- Placeholder when product not found or no image -->
    <div v-else class="w-full h-[400px] md:h-[500px] bg-gray-200 dark:bg-gray-700"></div>
    
    <!-- Main Content -->
    <main class="max-w-xl mx-auto flex-1">
      <div class="bg-white dark:bg-gray-800 border-x border-border">
        <slot />
      </div>
    </main>
    
    <AppFooter :name="profile.name" />
  </div>
</template>

<script setup lang="ts">
import AppFooter from '~/components/layouts/AppFooter.vue'
import AppNavbar from '~/components/layouts/AppNavbar.vue'

const profile = useProfile()
const route = useRoute()
const slug = route.params.slug as string

// Fetch product data for the header image
const { product, pending } = await useProduct(slug)
</script>

