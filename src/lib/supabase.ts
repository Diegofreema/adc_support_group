import { createClient } from '@supabase/supabase-js'

/**
 * The one Supabase client. ADC shares the Rise Up project, so these are the
 * same URL and publishable key Rise Up's web app uses.
 */
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined

/** False until .env.local has the project URL and key; services then fall back to mocks. */
export const isSupabaseConfigured = Boolean(url && key)

export const supabase = createClient(url ?? 'http://localhost:54321', key ?? 'missing-key', {
  auth: { persistSession: true, autoRefreshToken: true, storageKey: 'adc-sg-auth' },
})

/** Throw the Supabase error message so hooks can show it as-is. */
export function unwrap<T>({ data, error }: { data: T; error: { message: string } | null }): T {
  if (error) throw new Error(error.message)
  return data
}
