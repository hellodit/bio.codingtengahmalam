<template>
  <NuxtLink 
    :to="`/products/${product.slug}`" 
    class="block bg-card rounded-lg border border-border hover:bg-accent transition-all duration-200 w-full overflow-hidden group shadow-sm hover:shadow-md"
  >
    <div class="flex flex-col">
      <!-- Image Section as Header -->
      <div class="w-full relative h-48 sm:h-56">
        <img
          :src="product.image"
          :alt="product.title"
          class="w-full h-full object-cover rounded-t-lg"
          loading="lazy"
        />
      </div>

      <!-- Content Section -->
      <div class="p-4 flex flex-col justify-between">
        <div>
          <h3 class="font-semibold text-card-foreground line-clamp-3 text-sm sm:text-base mb-2">
            {{ product.title }}
          </h3>
        </div>
        
        <div class="space-y-1">
          <div class="flex items-center gap-2 flex-wrap">
            <span v-if="product.price > 0" class="text-base sm:text-sm font-bold text-red-600 bg-red-100 rounded-md px-1 py-1">
              Rp{{ formatPrice(product.price) }}
            </span>
            <span v-else class="text-base sm:text-sm font-bold text-primary">
              FREE
            </span>
            
            <span
              v-if="product.originalPrice && product.originalPrice > product.price"
              class="text-xs sm:text-sm text-muted-foreground line-through text"
            >
              Rp{{ formatPrice(product.originalPrice) }}
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
