<template>
  <div class="flex items-center justify-between mb-4">
    <h2 class="text-xl font-bold text-gray-900 dark:text-white">
      Produk Digital
    </h2>
    <UButton
      variant="ghost"
      icon="i-heroicons-funnel"
      @click="showFilter = !showFilter"
    >
      Filter & Sort
    </UButton>
  </div>

  <UCard v-if="showFilter" class="mb-4">
    <div class="space-y-4">
      <div>
        <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
          Kategori
        </label>
        <USelect
          v-model="selectedCategory"
          :options="categoryOptions"
          placeholder="Semua Kategori"
          @update:model-value="updateFilter"
        />
      </div>
      
      <div>
        <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
          Urutkan
        </label>
        <USelect
          v-model="sortBy"
          :options="sortOptions"
          @update:model-value="updateFilter"
        />
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
const showFilter = ref(false)
const selectedCategory = ref<string | null>(null)
const sortBy = ref('order')

const categoryOptions = [
  { label: 'Semua Kategori', value: null },
  { label: 'Course', value: 'course' },
  { label: 'Source Code', value: 'source-code' },
  { label: 'Tool', value: 'tool' },
  { label: 'Template', value: 'template' }
]

const sortOptions = [
  { label: 'Urutkan', value: 'order' },
  { label: 'Harga Terendah', value: 'price-asc' },
  { label: 'Harga Tertinggi', value: 'price-desc' },
  { label: 'Nama A-Z', value: 'name-asc' }
]

const emit = defineEmits<{
  filter: [category: string | null, sort: string]
}>()

function updateFilter() {
  emit('filter', selectedCategory.value, sortBy.value)
}
</script>
