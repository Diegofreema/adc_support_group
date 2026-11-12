import type { SelectOption } from '@/components/shared'
import { STATE_OPTIONS } from '../../shared/constants/options'
import { FilterBar } from '../../shared/components/FilterBar'
import type { ActivityFilterValues } from '../types'

interface ActivityFiltersProps {
  filters: ActivityFilterValues
  setFilter: <K extends keyof ActivityFilterValues>(key: K) => (value: ActivityFilterValues[K]) => void
  typeOptions: SelectOption[]
}

export function ActivityFilters({ filters, setFilter, typeOptions }: ActivityFiltersProps) {
  return (
    <FilterBar
      search={filters.search}
      onSearch={setFilter('search')}
      placeholder="Search activity or group"
      selects={[
        { label: 'Type', value: filters.type, options: typeOptions, onChange: setFilter('type') },
        { label: 'State', value: filters.state, options: STATE_OPTIONS, onChange: setFilter('state') },
      ]}
    />
  )
}
