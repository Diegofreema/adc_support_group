import { FilterPills, type PillOption } from '@/components/shared'
import type { NotificationFilter } from '../types/notification.types'

const FILTERS: PillOption<NotificationFilter>[] = [
  { value: 'all', label: 'All' },
  { value: 'activities', label: 'Activities' },
  { value: 'payments', label: 'Payments' },
  { value: 'members', label: 'Members' },
]

export function NotificationFilters({ value, onChange }: { value: NotificationFilter; onChange: (filter: NotificationFilter) => void }) {
  return <FilterPills options={FILTERS} value={value} onChange={onChange} label="Filter alerts" />
}
