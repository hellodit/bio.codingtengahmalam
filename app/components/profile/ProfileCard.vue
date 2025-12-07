<template>
  <div class="flex flex-col items-center text-center space-y-4 py-6">
    <UAvatar
      :src="profile.avatar"
      :alt="profile.name"
      size="3xl"
      class="ring-4 ring-primary-500 dark:ring-primary-400"
    />
    
    <div class="space-y-2">
      <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
        {{ profile.username }}
      </p>
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
