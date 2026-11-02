import {
  Award, BookOpen, Ellipsis, Footprints, Hammer, Megaphone, Mic, Package, Smartphone, Vote, type LucideIcon,
} from 'lucide-react'

/** The kinds of support activity a group can record. Super admin can rename/disable them later. */
export type ActivityTypeId =
  | 'rally' | 'town-hall' | 'door-to-door' | 'media' | 'endorsement'
  | 'voter-education' | 'materials' | 'community' | 'election-day' | 'other'

export interface ActivityTypeDef {
  value: ActivityTypeId
  label: string
  icon: LucideIcon
}

export const ACTIVITY_TYPES: ActivityTypeDef[] = [
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

const OTHER = ACTIVITY_TYPES[ACTIVITY_TYPES.length - 1]!

function findActivityType(type: string): ActivityTypeDef {
  return ACTIVITY_TYPES.find((option) => option.value === type) ?? OTHER
}

export function activityTypeLabel(type: string): string {
  return findActivityType(type).label
}

/** Icon for an activity type; "other" and unknown types get a neutral icon. */
export function activityTypeIcon(type: string): LucideIcon {
  return findActivityType(type).icon
}

/** Labels of the named types (without "Other"), for admin lists and filters. */
export const NAMED_ACTIVITY_TYPE_LABELS: string[] = ACTIVITY_TYPES.filter((type) => type !== OTHER).map((type) => type.label)
