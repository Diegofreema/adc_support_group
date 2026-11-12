import { FilterPills, SearchInput, type PillOption } from '@/components/shared'
import type { DuesFilter } from '../types'

const FILTERS: PillOption<DuesFilter>[] = [
  { value: 'unpaid', label: 'Not paid' },
  { value: 'paid', label: 'Paid' },
  { value: 'all', label: 'All' },
]

interface DuesStatusFiltersProps {
  filter: DuesFilter
  onFilter: (filter: DuesFilter) => void
  search: string
  onSearch: (search: string) => void
}

export function DuesStatusFilters({ filter, onFilter, search, onSearch }: DuesStatusFiltersProps) {
  return (
    <div className="stack">
      <FilterPills options={FILTERS} value={filter} onChange={onFilter} label="Show" />
      <SearchInput value={search} onChange={onSearch} placeholder="Search name or phone" />
    </div>
  )
}
