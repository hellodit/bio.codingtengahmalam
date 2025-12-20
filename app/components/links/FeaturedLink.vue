<template>
  <NuxtLink
    :to="link.url"
    target="_blank"
    class="block bg-card border-1 border-primary/30 hover:border-primary/60 shadow-sm hover:shadow-md transition-all duration-200 text-foreground hover:text-primary-foreground flex items-center justify-between rounded-lg px-4 py-3"
  >
    <div class="flex items-center">
      <span v-if="link.icon" class="text-sm text-muted-foreground mr-2">{{ link.icon }}</span>
      <span class="text-foreground">{{ link.title }}</span>
    </div>
    <UIcon name="i-heroicons-arrow-top-right-on-square" class="w-4 h-4 text-muted-foreground flex-shrink-0" />
  </NuxtLink>
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
