import {
  Accessibility, Bike, Briefcase, Ellipsis, Globe, GraduationCap, HeartHandshake, House, Landmark, Store, Zap,
} from 'lucide-react'

import type { TileOption } from '@/components/shared'

/** Group categories (the Directorate can edit this list later). */
export const GROUP_CATEGORIES: TileOption<string>[] = [
  { value: 'Women', label: 'Women', icon: HeartHandshake },
  { value: 'Youth', label: 'Youth', icon: Zap },
  { value: 'Students', label: 'Students', icon: GraduationCap },
  { value: 'Transport', label: 'Transport', icon: Bike },
  { value: 'Traders', label: 'Traders', icon: Store },
  { value: 'Professionals', label: 'Professionals', icon: Briefcase },
  { value: 'Faith', label: 'Faith', icon: Landmark },
  { value: 'Diaspora', label: 'Diaspora', icon: Globe },
  { value: 'PWD', label: 'PWD', icon: Accessibility },
  { value: 'Community', label: 'Community', icon: House },
  { value: 'Other', label: 'Other', icon: Ellipsis },
]
