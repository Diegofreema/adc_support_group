import { ALL, STATE_OPTIONS } from '../../shared/constants/options'
import { FilterBar } from '../../shared/components/FilterBar'
import { NAMED_ACTIVITY_TYPE_LABELS } from '@/config/activity-types'
import type { ActivityFilterValues } from '../types'

const TYPE_OPTIONS = [{ value: ALL, label: 'All types' }, ...NAMED_ACTIVITY_TYPE_LABELS.map((type) => ({ value: type, label: type }))]

interface ActivityFiltersProps {
  filters: ActivityFilterValues
  setFilter: <K extends keyof ActivityFilterValues>(key: K) => (value: ActivityFilterValues[K]) => void
}

export function ActivityFilters({ filters, setFilter }: ActivityFiltersProps) {
  return (
    <FilterBar
      search={filters.search}
      onSearch={setFilter('search')}
      placeholder="Search group or place"
      selects={[
        { label: 'Type', value: filters.type, options: TYPE_OPTIONS, onChange: setFilter('type') },
        { label: 'State', value: filters.state, options: STATE_OPTIONS, onChange: setFilter('state') },
      ]}
    />
  )
}
