<template>
  <footer class="py-4 px-4">
    <UContainer>
      <p class="text-center text-sm text-muted-foreground">
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
