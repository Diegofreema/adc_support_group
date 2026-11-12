import { createClient } from '@supabase/supabase-js'

/**
 * The one Supabase client. ADC shares the Rise Up project, so this is the
 * same URL and publishable (anon) key Rise Up's web app uses.
 */
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const key = (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? import.meta.env.VITE_SUPABASE_ANON_KEY) as string | undefined

if (!url || !key) {
  console.error('VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be set in .env')
}

export const supabase = createClient(url ?? 'http://localhost:54321', key ?? 'missing-key', {
  auth: { persistSession: true, autoRefreshToken: true, storageKey: 'adc-sg-auth' },
})

/** Throw the Supabase error message so hooks can show it as-is. */
export function unwrap<T>({ data, error }: { data: T; error: { message: string } | null }): T {
  if (error) throw new Error(error.message)
  return data
}

/** Call a Postgres function (RPC) and return its result, or throw its message. */
export async function rpc<T>(fn: string, args?: Record<string, unknown>): Promise<T> {
  const { data, error } = await supabase.rpc(fn, args)
  if (error) throw new Error(error.message)
  return data as T
}
