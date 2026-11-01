import { Link } from '@tanstack/react-router'
import { useState } from 'react'

import { SectionTitle } from '@/components/shared'
import { statesInZone, type ZoneFilter } from '../utils/states'
import type { StateRow } from '../types'
import { StateTable } from './StateTable'
import { ZonePills } from './ZonePills'

/** Numbers by state, filtered by zone. */
export function StatesSection({ rows }: { rows: StateRow[] }) {
  const [zone, setZone] = useState<ZoneFilter>('All')
  return (
    <section>
      <SectionTitle title="By state" action={<Link to="/admin/reports">Export</Link>} />
      <div className="mb-3"><ZonePills value={zone} onChange={setZone} /></div>
      <StateTable rows={statesInZone(rows, zone)} />
    </section>
  )
}
