import { FilterPills, type PillOption } from '@/components/shared'
import { ZONE_NAMES } from '../../shared/constants/geo'
import type { ZoneFilter } from '../utils/states'

const OPTIONS: PillOption<ZoneFilter>[] = [{ value: 'All', label: 'All' }, ...ZONE_NAMES.map((zone) => ({ value: zone, label: zone }))]

export function ZonePills({ value, onChange }: { value: ZoneFilter; onChange: (zone: ZoneFilter) => void }) {
  return <FilterPills label="Zone" options={OPTIONS} value={value} onChange={onChange} />
}
