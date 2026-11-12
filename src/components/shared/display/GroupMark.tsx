import { useState } from 'react'

import { ThumbImage } from './ThumbImage'
import { initials } from '@/lib/format'
import { cn } from '@/lib/utils'

const TONES = ['', 'g2', 'g3', 'g4', 'g5']

function toneFor(name: string): string {
  const sum = [...name].reduce((total, char) => total + char.charCodeAt(0), 0)
  return TONES[sum % TONES.length]!
}

interface GroupMarkProps {
  name: string
  /** The group's photo; the monogram shows when there is none or it fails to load. */
  photoUrl?: string
  className?: string
}

/** Square photo, or monogram, for a group or chapter. */
export function GroupMark({ name, photoUrl, className }: GroupMarkProps) {
  const [broken, setBroken] = useState(false)
  if (photoUrl && !broken) {
    return <ThumbImage src={photoUrl} className={cn('group-mark object-cover', className)} aria-hidden onFallbackError={() => setBroken(true)} />
  }
  return <span className={cn('group-mark', toneFor(name), className)} aria-hidden>{initials(name)}</span>
}
