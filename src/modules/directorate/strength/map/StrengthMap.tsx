import { useCallback, useEffect, useMemo, useState } from 'react'

import { ExtrudedArea } from '@/components/map3d/ExtrudedArea'
import { MapCanvas } from '@/components/map3d/MapCanvas'
import { useNigeriaStates } from '@/components/map3d/useNigeriaStates'
import { inecToDisplayName, NIGERIA_MAP_BOUNDS } from '@/lib/geo/nigeria-map-3d'
import { VOTING_STATES } from '@/lib/geo/voting-area'
import type { Strength, StrengthArea, StrengthPoint } from '../types'
import { formatNumber, formatPer1000 } from '../utils/format'
import { hexCss, strengthHex } from '../utils/strength-colour'
import { loadMapUnits, sameLga, unitFrame, type MapUnit } from './coords'
import { UnitColumns } from './UnitColumns'

const NATION_FRAME = { cx: 0, cy: 0, width: NIGERIA_MAP_BOUNDS.width, height: NIGERIA_MAP_BOUNDS.height }
const MIN_DEPTH = 0.04
const EXTRA_DEPTH = 0.36
const NO_MEMBERS = 0x24312a

/** Map outline name ("Abuja") → polling-unit state ("FCT"). */
const DISPLAY_TO_STATE = new Map<string, string>(VOTING_STATES.map((s) => [inecToDisplayName(s), s]))

interface Props {
  strength: Strength
  points: StrengthPoint[]
  onOpenState: (state: string) => void
}

/** Nation view: states raised by members, coloured by members per 1,000 voters. State view: every unit. */
export default function StrengthMap({ strength, points, onOpenState }: Props) {
  const entries = useNigeriaStates()
  const [hoveredState, setHoveredState] = useState<string | null>(null)
  const [hoveredUnit, setHoveredUnit] = useState<MapUnit | null>(null)
  const [units, setUnits] = useState<MapUnit[]>([])
  const state = strength.level === 'state' ? null : strength.state

  useEffect(() => {
    if (!state) return
    let alive = true
    loadMapUnits(state, points).then((u) => alive && setUnits(u)).catch(() => alive && setUnits([]))
    return () => { alive = false }
  }, [state, points])

  const byName = useMemo(() => new Map(strength.areas.map((a) => [inecToDisplayName(a.area), a])), [strength.areas])
  const strongest = useMemo(() => Math.max(0.0001, ...strength.areas.map((a) => a.per1000 ?? 0)), [strength.areas])
  const mostMembers = useMemo(() => Math.max(1, ...strength.areas.map((a) => a.members)), [strength.areas])
  const lga = strength.lga
  const highlight = useCallback((u: MapUnit) => !lga || sameLga(u.lga, lga), [lga])
  const frame = useMemo(() => (state ? unitFrame(units) ?? NATION_FRAME : NATION_FRAME), [state, units])
  const entry = state ? entries.find((e) => e.name === inecToDisplayName(state)) : undefined

  return (
    <div className="strength-map">
      <div className="strength-map-card">
        {!state && hoveredState && <StateCard name={hoveredState} row={byName.get(hoveredState)} />}
        {state && hoveredUnit && <UnitCard unit={hoveredUnit} />}
      </div>
      <MapCanvas frame={frame} minDistance={state ? 0.05 : 2}>
        {state ? (
          <group>
            {entry && <ExtrudedArea shapes={entry.shapes} depth={0.002} color={0x1c2721} opacity={0.9} />}
            <UnitColumns units={units} highlight={highlight} onHover={setHoveredUnit} />
          </group>
        ) : (
          <group>
            {entries.map((e) => {
              const row = byName.get(e.name)
              const depth = row ? MIN_DEPTH + EXTRA_DEPTH * Math.sqrt(row.members / mostMembers) : MIN_DEPTH
              const color = row && row.members > 0 ? strengthHex((row.per1000 ?? 0) / strongest) : NO_MEMBERS
              return (
                <ExtrudedArea
                  key={e.name}
                  shapes={e.shapes}
                  depth={depth}
                  color={color}
                  active={hoveredState === e.name}
                  onHover={() => setHoveredState(e.name)}
                  onUnhover={() => setHoveredState((h) => (h === e.name ? null : h))}
                  onClick={() => {
                    const target = DISPLAY_TO_STATE.get(e.name)
                    if (target) onOpenState(target)
                  }}
                />
              )
            })}
          </group>
        )}
      </MapCanvas>
      <Legend nation={!state} />
    </div>
  )
}

function StateCard({ name, row }: { name: string; row: StrengthArea | undefined }) {
  return (
    <HoverCard title={name} rows={row ? [
      ['Members', formatNumber(row.members)],
      ['Per 1,000 voters', formatPer1000(row.per1000)],
      ['Units with none', `${formatNumber(row.unitsEmpty)} of ${formatNumber(row.units)}`],
    ] : [['Members', '0']]} />
  )
}

function UnitCard({ unit }: { unit: MapUnit }) {
  return <HoverCard title={unit.code} subtitle={unit.lga} rows={[['Members', formatNumber(unit.members)]]} />
}

function HoverCard({ title, subtitle, rows }: { title: string; subtitle?: string; rows: [string, string][] }) {
  return (
    <div className="strength-hover">
      <p className="strength-hover-title">{title}</p>
      {subtitle && <p className="strength-hover-sub">{subtitle}</p>}
      {rows.map(([label, value]) => <div key={label} className="row-between"><span>{label}</span><b>{value}</b></div>)}
    </div>
  )
}

function Legend({ nation }: { nation: boolean }) {
  return (
    <div className="strength-legend">
      <span style={{ background: hexCss(strengthHex(0)) }} />{nation ? 'Weakest' : 'Fewest'}
      <span style={{ background: hexCss(strengthHex(0.5)) }} />
      <span style={{ background: hexCss(strengthHex(1)) }} />{nation ? 'Strongest per 1,000 voters' : 'Most members'}
      {!nation && <><span style={{ background: '#3a4d3e' }} />No members</>}
    </div>
  )
}
