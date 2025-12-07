import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    products: defineCollection({
      type: 'page',
      source: 'products/**/*.md',
      schema: z.object({
        // New schema fields
        id: z.string().optional(),
        slug: z.string(),
        category: z.string(),
        type: z.string().optional(),
        name: z.string().optional(),
        thumbnail: z.string().optional(),
        coverImage: z.string().optional(),
        url: z.string().optional(),
        price: z.number(),
        original_price: z.number().optional(),
        is_featured: z.boolean().optional(),
        summary: z.string().optional(),
        position: z.number().optional(),
        ctaLabel: z.string().optional(),
        ctaHelperText: z.string().optional(),
        // Legacy fields for backward compatibility
        title: z.string().optional(),
        image: z.string().optional(),
        originalPrice: z.number().optional(),
        featured: z.boolean().optional(),
        order: z.number().optional(),
        purchaseUrl: z.string().optional(),
        bonus: z.string().optional()
      })
    }),
    links: defineCollection({
      type: 'page',
      source: 'links/**/*.md',
      schema: z.object({
        title: z.string(),
        url: z.string(),
        icon: z.string(),
        order: z.number()
      })
    })
  }
})
