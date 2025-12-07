export default defineEventHandler(async (event) => {
  // Only allow POST requests
  if (getMethod(event) !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    })
  }

  try {
    // Get request body
    const body = await readBody(event)
    
    // Validate required fields
    const { customer_name, customer_phone, customer_email, variant_unique_id } = body

    if (!customer_name || !customer_phone || !customer_email || !variant_unique_id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required fields: customer_name, customer_phone, customer_email, variant_unique_id'
      })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(customer_email)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid email format'
      })
    }

    // Validate phone format (should start with 62 for Indonesia)
    const phoneRegex = /^62\d{9,12}$/
    if (!phoneRegex.test(customer_phone)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid phone format. Phone should start with 62 (Indonesia country code)'
      })
    }

    // Get environment variables
    const apiKey = useRuntimeConfig().scalevApiKey
    const storeUniqueId = useRuntimeConfig().scalevStoreUniqueId
    const apiBaseUrl = useRuntimeConfig().scalevApiBaseUrl || 'https://api.scalev.id'

    if (!apiKey || !storeUniqueId) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Scalev configuration is missing. Please check environment variables.'
      })
    }

    // Prepare payload for Scalev API
    const scalevPayload = {
      store_unique_id: storeUniqueId,
      customer_name,
      customer_phone,
      customer_email,
      ordervariants: [
        {
          quantity: 1,
          variant_unique_id: variant_unique_id
        }
      ],
      payment_method: 'invoice'
    }

    // Call Scalev API
    let response: any
    try {
      response = await $fetch(`${apiBaseUrl}/api/web/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: scalevPayload
      })
    } catch (fetchError: any) {
      // Handle $fetch errors
      const statusCode = fetchError.status || fetchError.statusCode || 500
      const statusMessage = fetchError.data?.message || fetchError.message || fetchError.statusText || 'Failed to create order with Scalev API'
      
      throw createError({
        statusCode,
        statusMessage
      })
    }

    // Extract secret_slug from response
    const secretSlug = response?.secret_slug || response?.data?.secret_slug

    if (!secretSlug) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to create order. No secret_slug returned from Scalev API.'
      })
    }

    // Return success response with secret_slug
    return {
      success: true,
      secret_slug: secretSlug,
      payment_url: `https://app.scalev.id/order/public/${secretSlug}/success`
    }
  } catch (error: any) {
    // Handle errors that are already createError instances
    if (error.statusCode) {
      throw error
    }

    // Generic error fallback
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Internal server error'
    })
  }
})
