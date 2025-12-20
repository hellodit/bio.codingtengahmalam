<template>
  <div class="sneak-peek my-8">
    <div v-if="productName" class="mb-4">
      <h3 class="text-lg font-semibold text-foreground">
        {{ productName }}
      </h3>
    </div>
    
    <!-- Carousel Container -->
    <div class="relative w-full" v-if="imageList.length > 0">
      <!-- Carousel Wrapper -->
      <div 
        class="carousel-wrapper relative overflow-hidden rounded-lg shadow-lg"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
      >
        <!-- Images Container -->
        <div 
          class="carousel-track flex transition-transform duration-300 ease-in-out"
          :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
        >
          <div
            v-for="(image, index) in imageList"
            :key="index"
            class="carousel-slide flex-shrink-0 w-full relative aspect-video cursor-pointer"
            @click="openImageModal(image)"
          >
            <img
              :src="image"
              :alt="`Preview ${index + 1}`"
              class="w-full h-full object-cover"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all flex items-center justify-center">
              <UIcon name="i-heroicons-magnifying-glass-plus" class="w-8 h-8 text-white opacity-0 hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <button
          v-if="imageList.length > 1"
          @click="previousImage"
          class="carousel-nav carousel-nav-prev absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-card/80 hover:bg-card rounded-full p-2 shadow-lg transition-all border border-border"
          :disabled="currentIndex === 0"
        >
          <UIcon name="i-heroicons-chevron-left" class="w-6 h-6 text-foreground" />
        </button>
        <button
          v-if="imageList.length > 1"
          @click="nextImage"
          class="carousel-nav carousel-nav-next absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-card/80 hover:bg-card rounded-full p-2 shadow-lg transition-all border border-border"
          :disabled="currentIndex === imageList.length - 1"
        >
          <UIcon name="i-heroicons-chevron-right" class="w-6 h-6 text-foreground" />
        </button>
      </div>

      <!-- Dots Indicator -->
      <div v-if="imageList.length > 1" class="flex justify-center gap-2 mt-4">
        <button
          v-for="(image, index) in imageList"
          :key="index"
          @click="goToImage(index)"
          class="carousel-dot w-2 h-2 rounded-full transition-all"
          :class="currentIndex === index 
            ? 'bg-primary w-8' 
            : 'bg-muted hover:bg-muted/80'"
          :aria-label="`Go to image ${index + 1}`"
        />
      </div>

      <!-- Image Counter -->
      <div v-if="imageList.length > 1" class="text-center mt-2 text-sm text-muted-foreground">
        {{ currentIndex + 1 }} / {{ imageList.length }}
      </div>
    </div>
    
    <!-- Image Modal -->
    <UModal v-model="isModalOpen" :ui="{ width: 'max-w-4xl' }">
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">Preview</h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark"
              @click="isModalOpen = false"
            />
          </div>
        </template>
        <div class="flex justify-center">
          <img
            :src="selectedImage"
            alt="Preview"
            class="max-w-full h-auto rounded-lg"
          />
        </div>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
interface Props {
  productName?: string
  images?: string | string[]
}

const props = defineProps<Props>()

// Parse images - can be string (comma-separated) or array
const imageList = computed(() => {
  if (!props.images) return []
  if (Array.isArray(props.images)) {
    // Filter out empty values and return only valid images
    return props.images.filter(img => img && typeof img === 'string' && img.trim().length > 0)
  }
  if (typeof props.images === 'string') {
    // Split by comma and filter out empty strings
    const parsed = props.images
      .split(',')
      .map(img => img.trim())
      .filter(img => img.length > 0 && img !== 'undefined' && img !== 'null')
    return parsed
  }
  return []
})

const currentIndex = ref(0)
const isModalOpen = ref(false)
const selectedImage = ref('')

// Touch/swipe handling
const touchStartX = ref(0)
const touchEndX = ref(0)

function handleTouchStart(e: TouchEvent) {
  touchStartX.value = e.touches[0].clientX
}

function handleTouchMove(e: TouchEvent) {
  touchEndX.value = e.touches[0].clientX
}

function handleTouchEnd() {
  if (!touchStartX.value || !touchEndX.value) return
  
  const distance = touchStartX.value - touchEndX.value
  const minSwipeDistance = 50

  if (distance > minSwipeDistance) {
    // Swipe left - next image
    nextImage()
  } else if (distance < -minSwipeDistance) {
    // Swipe right - previous image
    previousImage()
  }
  
  // Reset
  touchStartX.value = 0
  touchEndX.value = 0
}

function nextImage() {
  if (currentIndex.value < imageList.value.length - 1) {
    currentIndex.value++
  } else {
    currentIndex.value = 0 // Loop back to first
  }
}

function previousImage() {
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    currentIndex.value = imageList.value.length - 1 // Loop to last
  }
}

function goToImage(index: number) {
  currentIndex.value = index
}

function openImageModal(image: string) {
  selectedImage.value = image
  isModalOpen.value = true
}

// Keyboard navigation
onMounted(() => {
  const handleKeyPress = (e: KeyboardEvent) => {
    if (imageList.value.length <= 1) return
    
    if (e.key === 'ArrowLeft') {
      previousImage()
    } else if (e.key === 'ArrowRight') {
      nextImage()
    }
  }
  
  window.addEventListener('keydown', handleKeyPress)
  
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyPress)
  })
})
</script>

<style scoped>
.sneak-peek {
  @apply w-full;
}

.carousel-wrapper {
  @apply relative;
  touch-action: pan-y pinch-zoom;
}

.carousel-track {
  @apply flex;
  will-change: transform;
}

.carousel-slide {
  @apply flex-shrink-0;
}

.carousel-nav {
  @apply disabled:opacity-50 disabled:cursor-not-allowed;
}

.carousel-nav:hover:not(:disabled) {
  @apply scale-110;
}

.carousel-dot {
  @apply cursor-pointer transition-all duration-200;
}
</style>
