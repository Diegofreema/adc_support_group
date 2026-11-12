import { useQuery } from '@tanstack/react-query'

import { ALL } from '../constants/options'
import { activityTypesLookupQuery, categoriesLookupQuery, type LookupItem } from '../services/lookups.service'
import type { SelectOption } from '@/components/shared'

function toOptions(items: LookupItem[], allLabel: string): SelectOption[] {
  return [{ value: ALL, label: allLabel }, ...items.map((item) => ({ value: item.id, label: item.name }))]
}

export function useCategories(): LookupItem[] {
  return useQuery(categoriesLookupQuery).data ?? []
}

/** "All categories" + every active category, valued by id. */
export function useCategoryOptions(): SelectOption[] {
  return toOptions(useCategories(), 'All categories')
}

/** "All types" + every activity type, valued by slug. */
export function useActivityTypeOptions(): SelectOption[] {
  return toOptions(useQuery(activityTypesLookupQuery).data ?? [], 'All types')
}
