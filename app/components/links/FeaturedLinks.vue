<template>
  <div class="space-y-4">
    <h2 class="text-xl font-bold text-gray-900 dark:text-white">
      Featured Link
    </h2>
    <div class="space-y-3">
      <FeaturedLink
        v-for="link in sortedLinks"
        :key="link.url"
        :link="link"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import FeaturedLink from './FeaturedLink.vue';

interface Link {
  title: string
  url: string
  icon?: string
  order?: number
}

const props = defineProps<{
  links: Link[]
}>()

const sortedLinks = computed(() => {
  return [...props.links].sort((a, b) => (a.order || 0) - (b.order || 0))
})
</script>
