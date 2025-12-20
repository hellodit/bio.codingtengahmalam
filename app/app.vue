<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
// Force light mode
onMounted(() => {
  const colorMode = useColorMode()
  colorMode.preference = 'light'
  colorMode.value = 'light'
  
  // Remove dark class from html element
  if (process.client) {
    document.documentElement.classList.remove('dark')
    
    // Clear localStorage to remove any saved dark mode preference
    try {
      localStorage.removeItem('nuxt-color-mode')
    } catch (e) {
      // Ignore errors
    }
  }
})
</script>
