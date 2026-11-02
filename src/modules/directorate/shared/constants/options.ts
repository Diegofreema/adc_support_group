import type { SelectOption } from '@/components/shared'
import { NAMED_GROUP_CATEGORIES } from '@/config/group-categories'
import { NIGERIAN_STATES } from '@/lib/geo/places'

/** "All" is represented by an empty string in every filter. */
export const ALL = ''

export const STATE_OPTIONS: SelectOption[] = [{ value: ALL, label: 'All states' }, ...NIGERIAN_STATES.map((state) => ({ value: state, label: state }))]

export const CATEGORY_OPTIONS: SelectOption[] = [{ value: ALL, label: 'All categories' }, ...NAMED_GROUP_CATEGORIES.map((name) => ({ value: name, label: name }))]

export const PERIOD_OPTIONS: SelectOption[] = [
  { value: 'all', label: 'All time' },
  { value: 'month', label: 'This month' },
  { value: 'week', label: 'This week' },
]
