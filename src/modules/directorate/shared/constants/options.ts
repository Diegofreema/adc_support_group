import type { SelectOption } from '@/components/shared'
import { FILTER_STATES } from './geo'

/** "All" is represented by an empty string in every filter. */
export const ALL = ''

export const STATE_OPTIONS: SelectOption[] = [{ value: ALL, label: 'All states' }, ...FILTER_STATES.map((state) => ({ value: state, label: state }))]

export const CATEGORY_NAMES = ['Women', 'Youth', 'Students', 'Transport', 'Traders', 'Professionals', 'Faith', 'Diaspora', 'Community', 'PWD'] as const

export const CATEGORY_OPTIONS: SelectOption[] = [{ value: ALL, label: 'All categories' }, ...CATEGORY_NAMES.map((name) => ({ value: name, label: name }))]

export const PERIOD_OPTIONS: SelectOption[] = [
  { value: 'all', label: 'All time' },
  { value: 'month', label: 'This month' },
  { value: 'week', label: 'This week' },
]
