<template>
  <div class="flex flex-col items-center text-center space-y-2 py-3 gap-2">
    <div class="flex items-center justify-center">
      <img
        :src="profile.avatar"
        :alt="profile.name"
        class="w-25 h-25 rounded-full object-cover"
      />
    </div>
    
    <div class="space-y-2">
      <UBadge color="neutral" size="sm" variant="outline">
        @{{ profile.username }}
      </UBadge>
      <h1 class="text-2xl font-bold text-foreground">
        {{ profile.name }}
      </h1>
      <p class="text-sm text-muted-foreground max-w-sm">
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
