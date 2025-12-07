<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
    <AppNavbar />
    <main class="flex-1 w-full">
      <div class="w-full max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8 border-x border-gray-200 dark:border-gray-800">
        <slot />
      </div>
    </main>
    <AppFooter :name="profile.name" />
  </div>
</template>

<script setup lang="ts">
import AppFooter from '~/components/layouts/AppFooter.vue';
import AppNavbar from '~/components/layouts/AppNavbar.vue';

const profile = useProfile()
</script>
