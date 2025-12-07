<template>
  <NuxtLink :to="`/products/${product.slug}`" class="block">
    <UCard
      class="group hover:shadow-lg transition-shadow duration-200 overflow-hidden cursor-pointer h-full"
    >
      <template #header>
        <div class="relative aspect-video overflow-hidden -m-4 sm:-m-6 mb-0">
          <img
            :src="product.image || product.coverImage || product.thumbnail"
            :alt="product.title || product.name"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            loading="lazy"
          />
        </div>
      </template>

      <div class="space-y-2">
        <h3 class="font-semibold text-gray-900 dark:text-white line-clamp-2">
          {{ product.title || product.name }}
        </h3>
        
        <div class="flex items-center gap-2">
          <span v-if="product.price > 0" class="text-lg font-bold text-primary-600 dark:text-primary-400">
            Rp {{ formatPrice(product.price) }}
          </span>
          <span v-else class="text-lg font-bold text-green-600 dark:text-green-400">
            FREE
          </span>
          
          <span
            v-if="product.originalPrice > product.price"
            class="text-sm text-gray-500 line-through"
          >
            Rp {{ formatPrice(product.originalPrice) }}
          </span>
        </div>
      </div>
    </UCard>
  </NuxtLink>
</template>

<script setup lang="ts">
interface Product {
  title: string
  slug: string
  image: string
  price: number
  originalPrice: number
  category?: string
}

const props = defineProps<{
  product: Product
}>()

function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID').format(price)
}
</script>
