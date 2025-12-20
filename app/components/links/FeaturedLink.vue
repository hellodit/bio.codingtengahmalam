<template>
  <UButton
    :to="link.url"
    target="_blank"
    block
    size="xl"
    variant="outline"
    trailing-icon="i-heroicons-arrow-top-right-on-square"
  >
    <p class="py-1 text-center">
      <span v-if="link.icon" class="text-xl text-gray-500 dark:text-gray-400 mr-2">{{ link.icon }}</span>
      <span>{{ link.title }}</span>
    </p>
  </UButton>
</template>

<script setup lang="ts">
interface Link {
  title: string
  url: string
  icon?: string
  order?: number
}

defineProps<{
  link: Link
}>()
</script>
