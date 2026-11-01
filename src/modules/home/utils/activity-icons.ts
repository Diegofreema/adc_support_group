import {
  Award, BookOpen, Ellipsis, Footprints, Hammer, Megaphone, Mic, Package, Smartphone, Vote, type LucideIcon,
} from 'lucide-react'

const ACTIVITY_ICONS: Record<string, LucideIcon> = {
  rally: Megaphone,
  'town-hall': Mic,
  'door-to-door': Footprints,
  media: Smartphone,
  endorsement: Award,
  'voter-education': BookOpen,
  materials: Package,
  'community-project': Hammer,
  'election-day': Vote,
}

/** Icon for an activity type; "other" and unknown types get a neutral icon. */
export function activityIcon(type: string): LucideIcon {
  return ACTIVITY_ICONS[type] ?? Ellipsis
}
