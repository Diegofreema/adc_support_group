import { FunctionsHttpError } from '@supabase/supabase-js'

import { supabase } from './supabase'

/**
 * Call one of the shared project's edge functions. Every ADC call says which
 * app it is (`app: 'adc'`), so SMS and emails carry ADC wording and new
 * accounts are tagged as ADC accounts.
 *
 * Edge functions answer errors as { error: "…" }; that message is thrown as
 * is, so forms can show it.
 */
export async function invokeFunction<T>(name: string, body: Record<string, unknown> = {}): Promise<T> {
  const { data, error } = await supabase.functions.invoke(name, { body: { ...body, app: 'adc' } })
  if (error) throw new Error(await errorMessage(error))
  if (data && typeof data === 'object' && 'error' in data && typeof data.error === 'string') {
    throw new Error(data.error)
  }
  return data as T
}

async function errorMessage(error: unknown): Promise<string> {
  if (error instanceof FunctionsHttpError) {
    try {
      const body = await (error.context as Response).json()
      if (body && typeof body.error === 'string') return body.error
    } catch {
      // not JSON
    }
  }
  return 'Something went wrong. Please try again.'
}
