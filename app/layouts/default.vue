<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
    <AppNavbar />
    <template v-if="$route.path !== '/'">
        <div class="pt-4 pb-4 px-4 flex justify-center">
          <NuxtLink
            to="/"
            class="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Kembali ke halaman utama
          </NuxtLink>
        </div>
      </template>
      
    <main class="flex-1 w-full">
      <div class="w-full max-w-xl mx-auto sm:py-8 border-x-1 border-y-1 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 rounded-lg">
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
