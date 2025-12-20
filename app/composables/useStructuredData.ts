import type { UseSeoMetaInput } from '#app'

export const useStructuredData = () => {
  const config = useRuntimeConfig()
  const route = useRoute()
  const siteUrl = config.public.siteUrl || 'https://codingtengahmalam.com'
  
  const getFullUrl = (path: string = '') => {
    const baseUrl = siteUrl.replace(/\/$/, '')
    const cleanPath = path.startsWith('/') ? path : `/${path}`
    return `${baseUrl}${cleanPath}`
  }

  const createPersonSchema = (profile: { name: string; username: string; bio: string; avatar: string; socialLinks?: Array<{ platform: string; url: string }> }) => {
    const sameAs = profile.socialLinks?.map(link => link.url) || []
    
    return {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: profile.name,
      alternateName: profile.username,
      description: profile.bio,
      image: getFullUrl(profile.avatar),
      url: getFullUrl(),
      sameAs
    }
  }

  const createOrganizationSchema = (profile: { name: string; username: string; bio: string; avatar: string }) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: profile.name,
      alternateName: profile.username,
      description: profile.bio,
      logo: getFullUrl(profile.avatar),
      url: getFullUrl()
    }
  }

  const createProductSchema = (product: {
    title: string
    name?: string
    summary?: string
    image: string
    price: number
    originalPrice?: number
    category?: string
    url?: string
    slug: string
  }) => {
    const productName = product.title || product.name || ''
    const description = product.summary || productName
    const productImage = product.image ? getFullUrl(product.image) : ''
    const productUrl = product.url || getFullUrl(`/products/${product.slug}`)
    
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: productName,
      description,
      image: productImage,
      category: product.category || 'Digital Product',
      offers: {
        '@type': 'Offer',
        price: product.price,
        priceCurrency: 'IDR',
        availability: 'https://schema.org/InStock',
        url: productUrl,
        ...(product.originalPrice && product.originalPrice > product.price ? {
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: product.price,
            priceCurrency: 'IDR',
            referenceQuantity: {
              '@type': 'QuantitativeValue',
              value: 1
            }
          }
        } : {})
      },
      url: productUrl
    }
  }

  const createBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: getFullUrl(item.url)
      }))
    }
  }

  const addStructuredData = (schema: object) => {
    useHead({
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(schema)
        }
      ]
    })
  }

  return {
    getFullUrl,
    createPersonSchema,
    createOrganizationSchema,
    createProductSchema,
    createBreadcrumbSchema,
    addStructuredData
  }
}

