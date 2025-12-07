<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <AppNavbar />
    <main class="pb-8">
      <slot />
    </main>
    <AppFooter :name="profile.name" />
  </div>
</template>

<script setup lang="ts">
import AppFooter from '~/components/layouts/AppFooter.vue';
import AppNavbar from '~/components/layouts/AppNavbar.vue';

const profile = useProfile()
</script>
