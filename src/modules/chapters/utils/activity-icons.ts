import { Footprints, Megaphone, Mic, Smartphone, type LucideIcon } from 'lucide-react'

import type { ChapterActivity } from '../types'

const ICONS: Record<ChapterActivity['type'], LucideIcon> = {
  rally: Megaphone,
  door: Footprints,
  townhall: Mic,
  media: Smartphone,
}

export function activityIcon(type: ChapterActivity['type']): LucideIcon {
  return ICONS[type]
}
