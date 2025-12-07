<template>
  <section class="space-y-4">
    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
      Cuplikan {{ productName || 'produk' }}
    </h3>

    <div v-if="hasImages" class="space-y-3">
      <div class="relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <img
          :src="activeImage"
          :alt="`${productName || 'Produk'} - halaman ${activeIndex + 1}`"
          class="w-full h-80 sm:h-[420px] object-cover"
          loading="lazy"
        />

        <div class="absolute inset-y-0 flex items-center justify-between px-2">
          <button
            type="button"
            class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-gray-800 shadow hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="Gambar sebelumnya"
            @click="previous"
          >
            ‹
          </button>
          <button
            type="button"
            class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-gray-800 shadow hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="Gambar selanjutnya"
            @click="next"
          >
            ›
          </button>
        </div>
      </div>

      <div class="flex gap-2 overflow-x-auto pb-2">
        <button
          v-for="(image, index) in images"
          :key="image"
          type="button"
          class="relative rounded-lg border"
          :class="[
            activeIndex === index
              ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800'
              : 'border-gray-200 dark:border-gray-800'
          ]"
          @click="goTo(index)"
          :aria-label="`Lihat gambar ${index + 1}`"
          :aria-current="activeIndex === index"
        >
          <img
            :src="image"
            :alt="`${productName || 'Produk'} - thumbnail ${index + 1}`"
            class="h-20 w-28 object-cover rounded-md"
            loading="lazy"
          />
        </button>
      </div>
    </div>

    <p v-else class="text-sm text-gray-600 dark:text-gray-400">
      Belum ada gambar untuk ditampilkan.
    </p>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, toRefs, watch } from 'vue'
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
const activeIndex = ref(0)

const hasImages = computed(() => images.value.length > 0)

const activeImage = computed(() => {
  if (!hasImages.value) return ''
  return images.value[activeIndex.value] ?? images.value[0]
})

watch(
  images,
  (newImages) => {
    if (!newImages.length) {
      activeIndex.value = 0
      return
    }

    if (activeIndex.value >= newImages.length) {
      activeIndex.value = 0
    }
  },
  { immediate: true }
)

const goTo = (index: number) => {
  if (!hasImages.value) return
  const boundedIndex = Math.max(0, Math.min(index, images.value.length - 1))
  activeIndex.value = boundedIndex
}

const next = () => {
  if (!hasImages.value) return
  activeIndex.value = (activeIndex.value + 1) % images.value.length
}

const previous = () => {
  if (!hasImages.value) return
  activeIndex.value =
    (activeIndex.value - 1 + images.value.length) % images.value.length
}
</script>
