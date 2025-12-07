<template>
  <NuxtLink 
    :to="`/products/${product.slug}`" 
    class="block bg-white dark:bg-gray-800 mb-3 rounded-lg  border-1 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition-all duration-200 w-full overflow-hidden group"
  >
    <div class="flex min-h-[130px]">
      <!-- Image Section -->
      <div class="w-1/2 relative">
        <img
          :src="product.image"
          :alt="product.title"
          class="w-full h-full object-cover rounded-l-lg"
          loading="lazy"
        />
      </div>

      <!-- Content Section -->
      <div class="w-1/2 p-4 flex flex-col justify-between">
        <div>
          <h3 class="font-semibold text-gray-900 dark:text-white line-clamp-3 text-sm sm:text-base mb-2">
            {{ product.title }}
          </h3>
        </div>
        
        <div class="space-y-1">
          <div class="text-xs text-gray-500 dark:text-gray-400 font-medium">
            Price
          </div>
          <div class="flex items-center gap-2 flex-wrap">
            <span v-if="product.price > 0" class="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
              Rp {{ formatPrice(product.price) }}
            </span>
            <span v-else class="text-base sm:text-lg font-bold text-green-600 dark:text-green-400">
              FREE
            </span>
            
            <span
              v-if="product.originalPrice && product.originalPrice > product.price"
              class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-through"
            >
              Rp {{ formatPrice(product.originalPrice) }}
            </span>
          </div>
        </div>
      </div>
    </div>
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
