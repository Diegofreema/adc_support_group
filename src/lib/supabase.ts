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

interface SupabaseErrorLike {
  message: string
  code?: string
  status?: number
}

/**
 * An Error that keeps the server's code and status beside its message. The
 * message is the raw server text (logic may match on it); what people see
 * always goes through friendlyError (lib/errors.ts).
 */
export function serverError(error: SupabaseErrorLike): Error & { code?: string; status?: number } {
  return Object.assign(new Error(error.message), { code: error.code, status: error.status })
}

/** Throw the Supabase error (with its code) so hooks can react and screens can translate it. */
export function unwrap<T>({ data, error }: { data: T; error: SupabaseErrorLike | null }): T {
  if (error) throw serverError(error)
  return data
}

/** Call a Postgres function (RPC) and return its result, or throw its error. */
export async function rpc<T>(fn: string, args?: Record<string, unknown>): Promise<T> {
  const { data, error } = await supabase.rpc(fn, args)
  if (error) throw serverError(error)
  return data as T
}
