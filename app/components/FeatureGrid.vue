<template>
  <section class="space-y-6">
    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
      Apa yang kamu dapatkan
    </h3>

    <div :class="['grid gap-4', columnClass]">
      <article
        v-for="item in items"
        :key="item.title"
        class="h-full p-4 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 shadow-sm"
      >
        <h4 class="text-lg font-semibold text-gray-900 dark:text-white">
          {{ item.title }}
        </h4>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {{ item.description }}
        </p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue'
import type { PropType } from 'vue'

type FeatureItem = {
  title: string
  description: string
}

const props = defineProps({
  columns: {
    type: Number,
    default: 2
  },
  items: {
    type: Array as PropType<FeatureItem[]>,
    default: () => []
  }
})

const { columns, items } = toRefs(props)

const columnClass = computed(() => {
  const size = Math.min(Math.max(columns.value || 1, 1), 3)

  if (size === 3) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
  if (size === 2) return 'grid-cols-1 sm:grid-cols-2'
  return 'grid-cols-1'
})
</script>
