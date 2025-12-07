<template>
  <UContainer class="py-3">
    <div v-if="!pending && product" class="max-w-4xl mx-auto space-y-8">
      <!-- Back Button with Avatar -->
      <NuxtLink to="/" class="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-6">
        <img
          :src="profile.avatar"
          :alt="profile.name"
          class="w-10 h-10 rounded-full object-cover"
        />
        <span class="font-medium">Kembali ke halaman utama</span>
      </NuxtLink>

      <!-- Product Image -->
      <div class="relative aspect-video overflow-hidden rounded-lg shadow-lg">
        <img
          :src="product.image"
          :alt="product.title"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Product Info -->
      <div class="space-y-6">
        <!-- Badge and Title -->
        <div class="space-y-3">
          <UBadge
            :label="product.category || 'Produk Digital'"
            color="primary"
            variant="solid"
            size="lg"
          />
          <h1 class="text-4xl font-bold text-gray-900 dark:text-white">
            {{ product.title || product.name }}
          </h1>
          <p v-if="product.summary" class="text-lg text-gray-600 dark:text-gray-400">
            {{ product.summary }}
          </p>
        </div>

        <!-- Price -->
        <div class="space-y-2 pb-6 border-b border-gray-200 dark:border-gray-700">
          <div class="text-sm font-medium text-gray-600 dark:text-gray-400">
            Harga:
          </div>
          <div class="flex items-center gap-3">
            <span
              v-if="product.originalPrice > product.price"
              class="text-2xl text-gray-500 line-through"
            >
              Rp {{ formatPrice(product.originalPrice) }}
            </span>
            <span v-if="product.price > 0" class="text-3xl font-bold text-primary-600 dark:text-primary-400">
              Rp {{ formatPrice(product.price) }}
            </span>
            <span v-else class="text-3xl font-bold text-green-600 dark:text-green-400">
              FREE
            </span>
          </div>
        </div>

        <!-- Description Content -->
        <div v-if="productData" class="prose prose-lg prose-gray dark:prose-invert max-w-none">
          <ContentRenderer :value="productData" />
        </div>

        <!-- CTA Button -->
        <div v-if="product" class="pt-8 border-t border-gray-200 dark:border-gray-700">
          <UButton
            :to="`/products/${product.slug}/checkout`"
            size="xl"
            color="primary"
            block
            class="text-lg font-semibold py-6"
          >
            {{ product.ctaLabel || `Dapatkan ${product.title || product.name}` }}
          </UButton>
          <p v-if="product.ctaHelperText || product.bonus" class="text-center text-sm text-gray-600 dark:text-gray-400 mt-3">
            {{ product.ctaHelperText || product.bonus }}
          </p>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else-if="pending" class="flex items-center justify-center min-h-[400px]">
      <div class="text-center space-y-4">
        <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 animate-spin text-primary-500" />
        <p class="text-gray-600 dark:text-gray-400">Memuat produk...</p>
      </div>
    </div>

    <!-- Not Found State -->
    <div v-else class="flex items-center justify-center min-h-[400px]">
      <UCard class="max-w-md text-center">
        <div class="space-y-4">
          <UIcon name="i-heroicons-exclamation-triangle" class="w-16 h-16 text-gray-400 mx-auto" />
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
            Produk Tidak Ditemukan
          </h2>
          <p class="text-gray-600 dark:text-gray-400">
            Produk yang Anda cari tidak ditemukan.
          </p>
          <UButton to="/" color="primary">
            Kembali ke Beranda
          </UButton>
        </div>
      </UCard>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const profile = useProfile()
const { product, productData, pending } = await useProduct(slug)

// Set page metadata
useHead({
  title: product.value ? `${product.value.title} - Products` : 'Produk Tidak Ditemukan',
  meta: [
    {
      name: 'description',
      content: product.value?.title 
        ? `${product.value.title} - Detail produk`
        : 'Detail produk'
    }
  ]
})

function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID').format(price)
}
</script>
