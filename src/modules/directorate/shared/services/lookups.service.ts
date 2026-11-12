import { queryOptions } from '@tanstack/react-query'

import { directorateKeys } from '../query-keys'
import { supabase } from '@/lib/supabase'

export interface LookupItem {
  id: string
  name: string
}

/** Active group categories (staff can read the table directly). */
async function fetchCategories(): Promise<LookupItem[]> {
  const { data, error } = await supabase.from('support_group_categories').select('id, name').eq('is_active', true).order('sort').order('name')
  if (error) throw new Error(error.message)
  return data ?? []
}

/** Activity types by slug (the admin activity RPC filters on the slug). */
async function fetchActivityTypes(): Promise<LookupItem[]> {
  const { data, error } = await supabase.from('support_group_activity_types').select('slug, name').order('sort').order('name')
  if (error) throw new Error(error.message)
  return (data ?? []).map((row) => ({ id: row.slug as string, name: row.name as string }))
}

export const categoriesLookupQuery = queryOptions({ queryKey: directorateKeys.lookups('categories'), queryFn: fetchCategories, staleTime: 5 * 60_000 })

export const activityTypesLookupQuery = queryOptions({ queryKey: directorateKeys.lookups('activity-types'), queryFn: fetchActivityTypes, staleTime: 5 * 60_000 })
