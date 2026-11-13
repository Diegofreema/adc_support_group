import { ChevronRight } from 'lucide-react'

import { inecToDisplayName } from '@/lib/geo/nigeria-map-3d'
import type { Strength, StrengthScope } from '../types'

interface Props {
  strength: Strength
  /** A state admin can't step above their state. */
  nationwide: boolean
  onGo: (scope: StrengthScope) => void
}

/** Nigeria › Lagos › Agege › Ward: every step but the last goes back up. */
export function StrengthBreadcrumb({ strength, nationwide, onGo }: Props) {
  const { state, lga, ward } = strength
  const steps: { label: string; scope: StrengthScope }[] = []
  if (nationwide) steps.push({ label: 'Nigeria', scope: {} })
  if (state) steps.push({ label: inecToDisplayName(state), scope: { state } })
  if (state && lga) steps.push({ label: lga, scope: { state, lga } })
  if (state && lga && ward) steps.push({ label: ward, scope: { state, lga, ward } })
  return (
    <nav aria-label="Area" className="row flex-wrap gap-1 muted">
      {steps.map((step, index) => {
        const last = index === steps.length - 1
        return (
          <span key={step.label} className="row gap-1">
            {last ? <b className="text-foreground">{step.label}</b> : <button type="button" className="link" onClick={() => onGo(step.scope)}>{step.label}</button>}
            {!last && <ChevronRight className="i i-sm" aria-hidden />}
          </span>
        )
      })}
    </nav>
  )
}
