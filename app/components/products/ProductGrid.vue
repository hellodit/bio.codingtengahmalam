<template>
  <div>
    <ProductFilter @filter="handleFilter" />
    
    <div class="grid grid-cols-1">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.slug"
        :product="product"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductFilter from './ProductFilter.vue';
import ProductCard from './ProductCard.vue';

interface Product {
  title: string
  slug: string
  image: string
  price: number
  originalPrice: number
  category?: string
  order?: number
}

const props = defineProps<{
  products: Product[]
}>()

const selectedCategory = ref<string | null>(null)
const sortBy = ref('order')

const filteredProducts = computed(() => {
  let filtered = [...props.products]

  // Filter by category
  if (selectedCategory.value) {
    filtered = filtered.filter(p => p.category === selectedCategory.value)
  }

  // Sort
  switch (sortBy.value) {
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price)
      break
    case 'name-asc':
      filtered.sort((a, b) => (a.title || '').localeCompare(b.title || ''))
      break
    case 'order':
    default:
        filtered.sort((a, b) => (a.order || 0) - (b.order || 0))
      break
  }

  return filtered
})

function handleFilter(category: string | null, sort: string) {
  selectedCategory.value = category
  sortBy.value = sort
}
</script>
