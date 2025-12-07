<template>
  <nav class="border-b border-gray-200 dark:border-gray-800">
    <UContainer>
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center gap-4">
          <UButton
            to="/"
            variant="ghost"
            color="gray"
            class="font-medium"
          >
            Home
          </UButton>
          <UButton
            to="/articles"
            variant="ghost"
            color="gray"
            class="font-medium"
          >
            Artikel
          </UButton>
        </div>
        
        <UButton
          :icon="isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'"
          variant="ghost"
          color="gray"
          @click="toggleTheme"
          aria-label="Toggle theme"
        />
      </div>
    </UContainer>
  </nav>
</template>

<script setup lang="ts">
const colorMode = useColorMode()

const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: () => colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
})

function toggleTheme() {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
}
</script>
