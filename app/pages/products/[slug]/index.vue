<template>
  <UContainer class="py-8 dark:bg-gray-800">
    <!-- Product Content -->
    <template v-if="!pending && product">
      <div class="max-w-lg mx-auto space-y-8">
        <!-- Product Info -->
        <div class="space-y-3">
          <!-- Badge and Title -->
          <div class="space-y-2">
            <h1 class="text-2xl font-bold text-foreground">
              {{ product.title || product.name }}
            </h1>
            <!-- Harga dan Diskon -->
            <span
              v-if="product.price !== undefined && product.price !== null && product.price > 0"
              class=" text-xl md:text-sm font-bold text-foreground mb-1 bg-red-400 rounded-md px-1 py-1 text-white inline-block mr-2"
            >
              Rp{{ formatPrice(product.price) }}
            </span>
            <template v-if="product.originalPrice && product.originalPrice > product.price">
              <span class="text-sm text-muted-foreground line-through mb-1 mr-2">
                Rp {{ formatPrice(product.originalPrice) }}
              </span>
            </template>
            <span
              v-else-if="product.price === 0"
              class="block text-xl md:text-xl font-bold text-primary mb-1"
            >
              GRATIS
            </span>
          </div>
          <hr class="border-border dark:border-border/50"> 


          <!-- Description Content -->
          <div v-if="productData" class="prose prose-lg prose-gray dark:prose-invert max-w-none pb-24">
            <!-- Use ContentRenderer which supports MDC components -->
            <ContentRenderer :value="productData" />
          </div>
        </div>

        <!-- Floating CTA (Call To Action) Section -->
        <div class="fixed bottom-0 left-0 right-0 z-50 border-t border-border shadow-lg bg-white dark:bg-gray-800 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
          <div class="max-w-lg mx-auto px-4 py-4">
            <div class="grid grid-cols-[1fr_3fr] gap-3">
              <UButton
                variant="outline"
                icon="i-lucide-message-circle-more"
                size="xl"
                class="w-full justify-center"
                to="https://instagram.com/codingtengahmalam"
              >
              </UButton>
              
              <!-- CTA Button: Beli Sekarang -->
              <UButton
                color="primary"
                variant="solid"
                :to="product.url"
                size="xl"
                trailing-icon="i-heroicons-arrow-right"
                aria-label="Beli Sekarang"
                class=""
              >
               <p class="py-1 text-center w-full">
                Beli Sekarang
              </p>
              </UButton> 
            </div>
            <p
              v-if="product.ctaHelperText || product.bonus"
              class="text-center text-xs sm:text-sm text-muted-foreground mt-2"
            >
              {{ product.ctaHelperText || product.bonus }}
            </p>
          </div>
        </div>
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
// Set layout to use product layout
definePageMeta({
  layout: 'product'
})

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
