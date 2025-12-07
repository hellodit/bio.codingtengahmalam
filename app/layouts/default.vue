<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
    <AppNavbar />
    <main class="flex-1 w-full">
      <div class="w-full max-w-xl mx-auto sm:py-8 border-x bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 rounded-lg">
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
