import type { KeyValue } from '@/components/shared'
import type { RegisterGroupValues } from './schemas'

const LEVEL_LABEL: Record<RegisterGroupValues['level'], string> = {
  national: 'National', state: 'State', lga: 'LGA', ward: 'Ward',
}

/** "National · Lagos", "Ward · Ward 4, Surulere", "Abroad · London, United Kingdom" */
export function describeBase(values: RegisterGroupValues): string {
  if (values.location === 'abroad') return `Abroad · ${[values.city, values.country].filter(Boolean).join(', ')}`
  const place = [values.ward, values.lga, values.state].filter(Boolean).join(', ')
  return [LEVEL_LABEL[values.level], place].filter(Boolean).join(' · ')
}

/** Rows for the "Check" step. */
export function registerSummary(values: RegisterGroupValues): KeyValue[] {
  return [
    { label: 'Group', value: values.groupName },
    { label: 'Category', value: values.category },
    { label: 'Base', value: describeBase(values) },
    { label: 'Leader', value: values.fullName },
    { label: 'Phone', value: values.phone },
    { label: 'CAC', value: values.cacNumber || '—' },
  ]
}
