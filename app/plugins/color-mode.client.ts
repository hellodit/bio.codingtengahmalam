export default defineNuxtPlugin(() => {
  const colorMode = useColorMode()
  
  // Force light mode immediately
  colorMode.preference = 'light'
  colorMode.value = 'light'
  
  // Remove dark class from html element on client
  if (process.client) {
    document.documentElement.classList.remove('dark')
    
    // Force remove dark class periodically to ensure it stays removed
    const observer = new MutationObserver(() => {
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark')
      }
    })
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
  }
  
  // Watch for any changes and force back to light
  watch(() => colorMode.preference, (newValue) => {
    if (newValue !== 'light') {
      colorMode.preference = 'light'
    }
    if (process.client) {
      document.documentElement.classList.remove('dark')
    }
  }, { immediate: true })
  
  watch(() => colorMode.value, (newValue) => {
    if (newValue !== 'light') {
      colorMode.value = 'light'
    }
    if (process.client) {
      document.documentElement.classList.remove('dark')
    }
  }, { immediate: true })
})
