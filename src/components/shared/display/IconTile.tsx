import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

export type Tone = 'green' | 'red' | 'amber' | 'blue' | 'grey'

interface IconTileProps {
  icon: LucideIcon
  tone?: Tone
  className?: string
}

/** Small square icon holder used in list rows. */
export function IconTile({ icon: Icon, tone = 'green', className }: IconTileProps) {
  return (
    <span className={cn('icon-tile', tone !== 'green' && tone, className)} aria-hidden>
      <Icon className="i" />
    </span>
  )
}
