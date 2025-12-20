<template>
  <UContainer class="py-2 dark:bg-gray-800">
    <!-- Product Content -->
    <template v-if="!pending && product">
    
      <div class="max-w-lg mx-auto space-y-8">

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
            <h1 class="text-2xl font-bold text-foreground">
              {{ product.title || product.name }}
            </h1>
            <p v-if="product.summary" class="text-sm text-muted-foreground">
              {{ product.summary }}
            </p>
          </div>

          <!-- Price -->
          <div class="pb-6 border border-border rounded-lg p-4">
            <div class="grid grid-cols-2 items-baseline gap-4">
              <span class="text-sm text-muted-foreground">
                Harga:
              </span>
              <div class="flex items-baseline gap-2">
                <span
                  v-if="product.originalPrice > product.price"
                  class="text-sm text-muted-foreground line-through"
                >
                  Rp {{ formatPrice(product.originalPrice) }}
                </span>
                <span v-if="product.price > 0" class="text-2xl font-bold text-foreground">
                  Rp {{ formatPrice(product.price) }}
                </span>
                <span v-else class="text-2xl font-bold text-primary">
                  FREE
                </span>
              </div>
            </div>
          </div>

          <!-- Description Content -->
          <div v-if="productData" class="prose prose-lg prose-gray dark:prose-invert max-w-none pb-5">
            <!-- Use ContentRenderer which supports MDC components -->
            <ContentRenderer :value="productData" />
          </div>
        </div>
      </div>

      <!-- Floating CTA Button -->
      <div class="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-lg">
        <UContainer class="py-4">
          <div class="max-w-lg mx-auto">
            <a 
              class="mayar-button  block w-full text-center text-sm font-semibold py-3 px-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors"
              :href="product.url"
              data-padding-bottom="30%"
              data-scrolling="true"
            >
              <span></span>{{ product.ctaLabel || `Beli Sekarang` }}
            </a>
            <p v-if="product.ctaHelperText || product.bonus" class="text-center text-sm text-muted-foreground mt-2">
              {{ product.ctaHelperText || product.bonus }}
            </p>
          </div>
        </UContainer>
      </div>
    </template>

    <!-- Loading State -->
    <div v-else-if="pending" class="flex items-center justify-center min-h-[400px]">
      <div class="text-center space-y-4">
        <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 animate-spin text-primary-500" />
        <p class="text-muted-foreground">Memuat produk...</p>
      </div>
    </div>

    <!-- Not Found State -->
    <div v-else class="flex items-center justify-center min-h-[400px]">
      <UCard class="max-w-md text-center">
        <div class="space-y-4">
          <UIcon name="i-heroicons-exclamation-triangle" class="w-16 h-16 text-muted-foreground mx-auto" />
          <h2 class="text-2xl font-bold text-foreground">
            Produk Tidak Ditemukan
          </h2>
          <p class="text-muted-foreground">
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
  ],
  script: [
    {
      src: 'https://mayarembed.r2.mayar.id/mayar-new-min.js',
      type: 'text/javascript',
      defer: true
    }
  ]
})

function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID').format(price)
}
</script>
