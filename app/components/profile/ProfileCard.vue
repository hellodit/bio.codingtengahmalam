<template>
  <div class="flex flex-col items-center text-center space-y-4 py-6">
    <img
      :src="profile.avatar"
      :alt="profile.name"
      class="w-32 h-32 rounded-full object-cover"
    />
    
    <div class="space-y-2">
      <UBadge color="neutral" size="lg" variant="subtle">
        {{ profile.username }}
      </UBadge>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        {{ profile.name }}
      </h1>
      <p class="text-base text-gray-600 dark:text-gray-300 max-w-md">
        {{ profile.bio }}
      </p>
    </div>

    <SocialLinks :social-links="profile.socialLinks" />
  </div>
</template>

<script setup lang="ts">
import SocialLinks from './SocialLinks.vue';

interface SocialLink {
  platform: string
  url: string
  icon: string
}

interface Profile {
  name: string
  username: string
  bio: string
  avatar: string
  socialLinks: SocialLink[]
}

defineProps<{
  profile: Profile
}>()
</script>
