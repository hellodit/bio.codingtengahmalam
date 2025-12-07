<template>
  <UCard
    :to="`/products/${product.slug}`"
    class="group hover:shadow-lg transition-shadow duration-200"
  >
    <template #header>
      <div class="relative aspect-video overflow-hidden rounded-t-lg">
        <img
          :src="product.image"
          :alt="product.title"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          loading="lazy"
        />
      </div>
    </template>

    <div class="space-y-2">
      <h3 class="font-semibold text-gray-900 dark:text-white line-clamp-2">
        {{ product.title }}
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
