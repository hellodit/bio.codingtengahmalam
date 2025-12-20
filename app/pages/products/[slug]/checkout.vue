<template>
  <UContainer class="py-6 dark:bg-gray-800">
    <div v-if="!pending && product" class="max-w-4xl mx-auto space-y-8">
      <!-- Back Button -->
      <NuxtLink 
        :to="`/products/${product.slug}`" 
        class="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <UIcon name="i-heroicons-arrow-left" class="w-5 h-5" />
        <span class="font-medium">Kembali ke Detail Produk</span>
      </NuxtLink>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Product Summary (Left Side) -->
        <div class="lg:col-span-1">
          <UCard>
            <div class="space-y-4">
              <h2 class="text-lg font-semibold text-foreground">
                Ringkasan Pesanan
              </h2>
              
              <!-- Product Image -->
              <div class="relative aspect-video overflow-hidden rounded-lg">
                <img
                  :src="product.image"
                  :alt="product.title"
                  class="w-full h-full object-cover"
                />
              </div>

              <!-- Product Info -->
              <div class="space-y-2">
                <h3 class="font-semibold text-foreground">
                  {{ product.title || product.name }}
                </h3>
                <div class="flex items-center gap-2">
                  <span
                    v-if="product.originalPrice > product.price"
                    class="text-sm text-muted-foreground line-through"
                  >
                    Rp {{ formatPrice(product.originalPrice) }}
                  </span>
                  <span v-if="product.price > 0" class="text-lg font-bold text-primary">
                    Rp {{ formatPrice(product.price) }}
                  </span>
                  <span v-else class="text-lg font-bold text-primary">
                    FREE
                  </span>
                </div>
              </div>

              <!-- Divider -->
              <div class="border-t border-border pt-4">
                <div class="flex items-center justify-between">
                  <span class="font-semibold text-foreground">Total</span>
                  <span v-if="product.price > 0" class="text-xl font-bold text-primary">
                    Rp {{ formatPrice(product.price) }}
                  </span>
                  <span v-else class="text-xl font-bold text-primary">
                    FREE
                  </span>
                </div>
              </div>
            </div>
          </UCard>
        </div>

        <!-- Checkout Form (Right Side) -->
        <div class="lg:col-span-2">
          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold text-foreground">
                Informasi Customer
              </h2>
            </template>

            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Customer Name -->
              <div>
                <label class="block text-sm font-medium text-foreground mb-2">
                  Nama Lengkap <span class="text-destructive">*</span>
                </label>
                <UInput
                  v-model="form.customer_name"
                  placeholder="Masukkan nama lengkap"
                  :disabled="loading"
                  size="lg"
                  :color="errors.customer_name ? 'error' : 'primary'"
                />
                <p v-if="errors.customer_name" class="mt-1 text-sm text-red-600 dark:text-red-400">
                  {{ errors.customer_name }}
                </p>
              </div>

              <!-- Customer Email -->
              <div>
                <label class="block text-sm font-medium text-foreground mb-2">
                  Email <span class="text-destructive">*</span>
                </label>
                <UInput
                  v-model="form.customer_email"
                  type="email"
                  placeholder="contoh@email.com"
                  :disabled="loading"
                  size="lg"
                  :color="errors.customer_email ? 'error' : 'primary'"
                />
                <p v-if="errors.customer_email" class="mt-1 text-sm text-red-600 dark:text-red-400">
                  {{ errors.customer_email }}
                </p>
              </div>

              <!-- Customer Phone -->
              <div>
                <label class="block text-sm font-medium text-foreground mb-2">
                  Nomor Telepon <span class="text-destructive">*</span>
                </label>
                <UInput
                  v-model="form.customer_phone"
                  type="tel"
                  placeholder="62812345678"
                  :disabled="loading"
                  size="lg"
                  :color="errors.customer_phone ? 'error' : 'primary'"
                />
                <p v-if="errors.customer_phone" class="mt-1 text-sm text-destructive">
                  {{ errors.customer_phone }}
                </p>
                <p class="mt-1 text-xs text-muted-foreground">
                  Format: 62xxxxxxxxxx (contoh: 62812345678)
                </p>
              </div>

              <!-- Error Message -->
              <UAlert
                v-if="errorMessage"
                color="error"
                variant="soft"
                :title="errorMessage"
                icon="i-heroicons-exclamation-triangle"
              />

              <!-- Submit Button -->
              <div class="pt-4">
                <UButton
                  type="submit"
                  color="primary"
                  block
                  :loading="loading"
                  :disabled="loading"
                  size="xl"
                  class="text-lg font-semibold py-6"
                >
                  {{ loading ? 'Memproses...' : 'Lanjutkan ke Pembayaran' }}
                </UButton>
                <p class="text-center text-sm text-muted-foreground mt-3">
                  Anda akan diarahkan ke halaman pembayaran Scalev
                </p>
              </div>
            </form>
          </UCard>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else-if="pending" class="flex items-center justify-center min-h-[400px]">
      <div class="text-center space-y-4">
        <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 animate-spin text-primary" />
        <p class="text-muted-foreground">Memuat halaman checkout...</p>
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
          <div class="flex gap-3 justify-center">
            <UButton v-if="slug" :to="`/products/${slug}`" color="neutral" variant="outline">
              Kembali ke Detail
            </UButton>
            <UButton to="/" color="primary">
              Kembali ke Beranda
            </UButton>
          </div>
        </div>
      </UCard>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import { z } from 'zod'

const slug = useRoute().params.slug as string
const { product, pending } = await useProduct(slug)

const loading = ref(false)
const errorMessage = ref('')

// Zod schema for form validation
const checkoutSchema = z.object({
  customer_name: z
    .string()
    .min(1, 'Nama lengkap wajib diisi')
    .trim(),
  customer_email: z
    .string()
    .min(1, 'Email wajib diisi')
    .email('Format email tidak valid')
    .trim(),
  customer_phone: z
    .string()
    .min(1, 'Nomor telepon wajib diisi')
    .regex(/^62\d{9,12}$/, 'Format nomor telepon tidak valid. Harus dimulai dengan 62')
    .trim()
})

type CheckoutForm = z.infer<typeof checkoutSchema>

const form = reactive<CheckoutForm>({
  customer_name: '',
  customer_email: '',
  customer_phone: ''
})

const errors = reactive<Partial<Record<keyof CheckoutForm, string>>>({})

// Set page metadata
useHead({
  title: product.value ? `Checkout - ${product.value.title}` : 'Checkout',
  meta: [
    {
      name: 'description',
      content: product.value?.title 
        ? `Checkout untuk ${product.value.title}`
        : 'Halaman checkout'
    }
  ]
})

function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID').format(price)
}

function validateForm(): boolean {
  // Reset errors
  errors.customer_name = ''
  errors.customer_email = ''
  errors.customer_phone = ''
  errorMessage.value = ''

  try {
    checkoutSchema.parse(form)
    return true
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.errors.forEach((err) => {
        const field = err.path[0] as keyof CheckoutForm
        if (field) {
          errors[field] = err.message
        }
      })
    }
    return false
  }
}

async function handleSubmit() {
  if (!validateForm()) {
    return
  }

  if (!product.value) {
    errorMessage.value = 'Produk tidak ditemukan'
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    // Parse with Zod to get validated and trimmed data
    const validatedData = checkoutSchema.parse(form)
    
    const response = await $fetch('/api/scalev/order', {
      method: 'POST',
      body: {
        customer_name: validatedData.customer_name,
        customer_email: validatedData.customer_email,
        customer_phone: validatedData.customer_phone,
        variant_unique_id: product.value.scalev_variant_id
      }
    })

    if (response.success && response.payment_url) {
      // Redirect to Scalev payment page
      window.location.href = response.payment_url
    } else {
      throw new Error('Failed to create order')
    }
  } catch (error: any) {
    console.error('Order creation error:', error)
    
    if (error.data?.statusMessage) {
      errorMessage.value = error.data.statusMessage
    } else if (error.message) {
      errorMessage.value = error.message
    } else {
      errorMessage.value = 'Terjadi kesalahan saat membuat order. Silakan coba lagi.'
    }
  } finally {
    loading.value = false
  }
}
</script>
