import type { SelectOption } from '@/components/shared'
import { STATE_OPTIONS } from '../../shared/constants/options'
import { FilterBar } from '../../shared/components/FilterBar'
import type { GroupFilterValues } from '../types'

interface GroupFiltersProps {
  filters: GroupFilterValues
  setFilter: <K extends keyof GroupFilterValues>(key: K) => (value: GroupFilterValues[K]) => void
  categoryOptions: SelectOption[]
}

export function GroupFilters({ filters, setFilter, categoryOptions }: GroupFiltersProps) {
  return (
    <FilterBar
      search={filters.search}
      onSearch={setFilter('search')}
      placeholder="Search groups"
      selects={[
        { label: 'State', value: filters.state, options: STATE_OPTIONS, onChange: setFilter('state') },
        { label: 'Category', value: filters.category, options: categoryOptions, onChange: setFilter('category') },
      ]}
    />
  )
}
