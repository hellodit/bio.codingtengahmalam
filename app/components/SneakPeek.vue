<template>
  <section class="space-y-4">
    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
      Cuplikan {{ productName || 'produk' }}
    </h3>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <figure
        v-for="(image, index) in images"
        :key="image"
        class="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
      >
        <img
          :src="image"
          :alt="`${productName || 'Produk'} - halaman ${index + 1}`"
          class="w-full h-full object-cover"
          loading="lazy"
        />
      </figure>
    </div>
  </section>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import type { PropType } from 'vue'

const props = defineProps({
  productName: {
    type: String,
    default: ''
  },
  images: {
    type: Array as PropType<string[]>,
    default: () => []
  }
})

const { productName, images } = toRefs(props)
</script>
