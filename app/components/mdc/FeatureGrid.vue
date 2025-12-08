<template>
  <div class="feature-grid my-8">
    <div
      :class="[
        'grid gap-6',
        columns === 1 ? 'grid-cols-1' : '',
        columns === 2 ? 'grid-cols-1 md:grid-cols-2' : '',
        columns === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : '',
        columns === 4 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' : ''
      ]"
    >
      <!-- Render items from props -->
      <div
        v-for="(item, index) in parsedItems"
        :key="index"
        class="feature-item p-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow"
      >
        <div class="flex items-start gap-3">
          <div class="flex-shrink-0 mt-1">
            <div class="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <UIcon name="i-heroicons-check-circle" class="w-4 h-4 text-primary" />
            </div>
          </div>
          <div class="flex-1">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {{ item.title }}
            </h4>
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
      
      <!-- Render slot content if no items from props -->
      <div v-if="parsedItems.length === 0" class="col-span-full">
        <MDCSlot unwrap="p" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface FeatureItem {
  title: string
  description: string
}

interface Props {
  columns?: number | string
  items?: FeatureItem[] | string
}

const props = withDefaults(defineProps<Props>(), {
  columns: 2,
  items: () => []
})

// Parse columns - can be string or number
const columns = computed(() => {
  if (typeof props.columns === 'string') {
    return parseInt(props.columns) || 2
  }
  return props.columns || 2
})

// Parse items - can be array, JSON string, or empty
const parsedItems = computed(() => {
  if (!props.items) return []
  if (Array.isArray(props.items)) return props.items
  if (typeof props.items === 'string') {
    try {
      const parsed = JSON.parse(props.items)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }
  return []
})
</script>

<style scoped>
.feature-grid {
  @apply w-full;
}

.feature-item {
  @apply transition-all duration-200;
}

.feature-item:hover {
  border-color: hsl(var(--primary));
}
</style>
