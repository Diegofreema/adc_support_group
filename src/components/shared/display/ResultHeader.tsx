import { Check, type LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

import { IconTile, type Tone } from './IconTile'

interface ResultHeaderProps {
  title: string
  subtitle?: ReactNode
  icon?: LucideIcon
  tone?: Tone
}

/** Stamped tick + short title for success screens. */
export function ResultHeader({ title, subtitle, icon = Check, tone = 'green' }: ResultHeaderProps) {
  return (
    <div className="result">
      <IconTile icon={icon} tone={tone} />
      <h2 className="h2">{title}</h2>
      {subtitle && <p className="muted mt-1">{subtitle}</p>}
    </div>
  )
}
