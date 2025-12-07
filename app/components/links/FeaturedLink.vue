<template>
  <UButton
    :to="link.url"
    external
    block
    size="lg"
    variant="outline"
    class="justify-between group"
  >
    <span class="flex items-center gap-2">
      <span v-if="link.icon" class="text-xl">{{ link.icon }}</span>
      <span>{{ link.title }}</span>
    </span>
    <UIcon
      name="i-heroicons-arrow-top-right-on-square"
      class="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
    />
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
