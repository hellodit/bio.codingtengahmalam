<template>
  <div class="flex gap-3 justify-center">
    <UButton
      v-for="social in socialLinks"
      :key="social.platform"
      :to="social.url"
      external
      variant="ghost"
      :icon="social.icon"
      :aria-label="social.platform"
      size="lg"
      class="rounded-full"
    />
  </div>
</template>

<script setup lang="ts">
interface SocialLink {
  platform: string
  url: string
  icon: string
}

defineProps<{
  socialLinks: SocialLink[]
}>()
</script>
