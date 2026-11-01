import {
  Award, BookOpen, Ellipsis, Footprints, Hammer, Megaphone, Mic, Package, Smartphone, Vote, type LucideIcon,
} from 'lucide-react'

import type { TileOption } from '@/components/shared'
import type { ActivityTypeId } from '../types'

export const ACTIVITY_TYPES: TileOption<ActivityTypeId>[] = [
  { value: 'rally', label: 'Rally', icon: Megaphone },
  { value: 'town-hall', label: 'Town hall', icon: Mic },
  { value: 'door-to-door', label: 'Door-to-door', icon: Footprints },
  { value: 'media', label: 'Media', icon: Smartphone },
  { value: 'endorsement', label: 'Endorsement', icon: Award },
  { value: 'voter-education', label: 'Voter education', icon: BookOpen },
  { value: 'materials', label: 'Materials', icon: Package },
  { value: 'community', label: 'Community project', icon: Hammer },
  { value: 'election-day', label: 'Election day', icon: Vote },
  { value: 'other', label: 'Other', icon: Ellipsis },
]

function findType(type: string): TileOption<ActivityTypeId> {
  return ACTIVITY_TYPES.find((option) => option.value === type) ?? ACTIVITY_TYPES[ACTIVITY_TYPES.length - 1]!
}

export function activityTypeLabel(type: string): string {
  return findType(type).label
}

export function activityTypeIcon(type: string): LucideIcon {
  return findType(type).icon
}
