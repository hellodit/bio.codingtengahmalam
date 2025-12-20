<template>
  <nav class="border-b border-border py-2 px-4 md:sticky md:top-0 md:z-10 bg-white">
    <UContainer>
      <div class="flex items-center justify-between h-10">
        <div class="flex items-center gap-4">
          <UButton
            to="/"
            variant="ghost"
            color="neutral"
            class="font-medium"
          >
            Home
          </UButton>

        </div>
        
        <UButton
          :icon="isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'"
          variant="ghost"
          color="neutral"
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
