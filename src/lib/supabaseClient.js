import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Check if credentials exist
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey && supabaseUrl !== 'YOUR_SUPABASE_URL')

// Initialize client if credentials exist, otherwise export fallback dummy client
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

/**
 * Submit contact form payload to Supabase or handle graceful offline fallback
 */
export async function submitContactForm(payload) {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name: payload.name,
          email: payload.email,
          company: payload.company || null,
          service: payload.service || 'General Inquiry',
          message: payload.message,
        }
      ])

    if (error) {
      console.error('Supabase submission error:', error)
      throw error
    }
    return { success: true, data }
  } else {
    // Offline / Unconfigured fallback behavior for seamless local demoing
    console.warn(
      'Zaunlabs Notice: Supabase URL/Key not configured in environment variables. Simulating successful form submission.',
      payload
    )
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800))
    return { success: true, isDemo: true }
  }
}
