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

const { getFullUrl, createProductSchema, createBreadcrumbSchema, addStructuredData } = useStructuredData()
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl || 'https://codingtengahmalam.com'

// SEO Meta Tags
const pageTitle = product.value 
  ? `${product.value.title || product.value.name} - ${profile.name}` 
  : 'Produk Tidak Ditemukan'
const pageDescription = product.value?.summary || 
  (product.value?.title 
    ? `${product.value.title} - Detail produk digital dari ${profile.name}` 
    : 'Detail produk')
const pageImage = product.value?.image ? getFullUrl(product.value.image) : getFullUrl(profile.avatar)
const pageUrl = getFullUrl(`/products/${slug}`)

useHead({
  title: pageTitle,
  meta: [
    { name: 'description', content: pageDescription },
    
    // Open Graph
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: pageDescription },
    { property: 'og:image', content: pageImage },
    { property: 'og:url', content: pageUrl },
    { property: 'og:type', content: 'product' },
    ...(product.value?.price ? [
      { property: 'product:price:amount', content: product.value.price.toString() },
      { property: 'product:price:currency', content: 'IDR' }
    ] : []),
    
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: pageTitle },
    { name: 'twitter:description', content: pageDescription },
    { name: 'twitter:image', content: pageImage }
  ],
  link: [
    { rel: 'canonical', href: pageUrl }
  ],
  script: [
    {
      src: 'https://mayarembed.r2.mayar.id/mayar-new-min.js',
      type: 'text/javascript',
      defer: true
    }
  ]
})

// Structured Data
if (product.value) {
  addStructuredData(createProductSchema({
    title: product.value.title || product.value.name || '',
    name: product.value.name,
    summary: product.value.summary,
    image: product.value.image,
    price: product.value.price,
    originalPrice: product.value.originalPrice,
    category: product.value.category,
    url: product.value.url,
    slug: product.value.slug
  }))
  
  // Breadcrumb Schema
  addStructuredData(createBreadcrumbSchema([
    { name: 'Beranda', url: '/' },
    { name: 'Produk', url: '/products' },
    { name: product.value.title || product.value.name || 'Detail Produk', url: `/products/${slug}` }
  ]))
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID').format(price)
}
</script>
