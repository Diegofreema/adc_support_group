import { CATEGORY_OPTIONS, STATE_OPTIONS } from '../../shared/constants/options'
import { FilterBar } from '../../shared/components/FilterBar'
import type { GroupFilterValues } from '../types'

interface GroupFiltersProps {
  filters: GroupFilterValues
  setFilter: <K extends keyof GroupFilterValues>(key: K) => (value: GroupFilterValues[K]) => void
}

export function GroupFilters({ filters, setFilter }: GroupFiltersProps) {
  return (
    <FilterBar
      search={filters.search}
      onSearch={setFilter('search')}
      placeholder="Search group or leader"
      selects={[
        { label: 'State', value: filters.state, options: STATE_OPTIONS, onChange: setFilter('state') },
        { label: 'Category', value: filters.category, options: CATEGORY_OPTIONS, onChange: setFilter('category') },
      ]}
    />
  )
}
