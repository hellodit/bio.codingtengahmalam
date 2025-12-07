<template>
  <footer class="border-t border-gray-200 dark:border-gray-800 py-6 mt-12">
    <UContainer>
      <p class="text-center text-sm text-gray-600 dark:text-gray-400">
        © {{ currentYear }} {{ name }}. All rights reserved.
      </p>
    </UContainer>
  </footer>
</template>

<script setup lang="ts">
defineProps<{
  name: string
}>()

const currentYear = new Date().getFullYear()
</script>
