import { FilterPills, SearchInput, type PillOption } from '@/components/shared'
import type { AttendanceFilter } from '../types'

const FILTERS: PillOption<AttendanceFilter>[] = [
  { value: 'all', label: 'All' },
  { value: 'coming', label: 'Coming' },
  { value: 'present', label: 'Present' },
]

interface AttendanceFiltersProps {
  filter: AttendanceFilter
  onFilter: (filter: AttendanceFilter) => void
  search: string
  onSearch: (search: string) => void
}

export function AttendanceFilters({ filter, onFilter, search, onSearch }: AttendanceFiltersProps) {
  return (
    <div className="stack">
      <FilterPills options={FILTERS} value={filter} onChange={onFilter} label="Show" />
      <SearchInput value={search} onChange={onSearch} placeholder="Search name or phone" />
    </div>
  )
}
