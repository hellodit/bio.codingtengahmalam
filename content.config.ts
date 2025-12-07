import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    products: defineCollection({
      type: 'page',
      source: 'products/**/*.md',
      schema: z.object({
        title: z.string(),
        slug: z.string(),
        image: z.string(),
        price: z.number(),
        originalPrice: z.number(),
        category: z.string(),
        featured: z.boolean(),
        order: z.number()
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
