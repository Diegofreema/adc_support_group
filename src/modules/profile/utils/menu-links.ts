import { Banknote, Bell, CalendarDays, CircleUserRound, ContactRound, Network, Send } from 'lucide-react'

import type { Power } from '@/types/domain'
import type { MenuLink } from '../components/MenuSection'

interface Counts {
  members?: number
  chapters?: number
  notifications?: number
}

/** Group screens, limited to what the user's powers open. */
export function groupLinks(counts: Counts, powers: Power[]): MenuLink[] {
  return [
    { label: 'Events', icon: CalendarDays, to: '/events' },
    { label: 'Group money', icon: Banknote, to: '/money' },
    ...(powers.includes('members') ? [{ label: 'Members', icon: ContactRound, to: '/members', count: counts.members }] : []),
    { label: 'Chapters', icon: Network, to: '/chapters', count: counts.chapters },
    ...(powers.includes('messages') ? [{ label: 'Messages', icon: Send, to: '/messages' }] : []),
  ]
}

export function accountLinks(counts: Counts): MenuLink[] {
  return [
    { label: 'Notifications', icon: Bell, to: '/notifications', count: counts.notifications, alert: true },
    { label: 'Profile', icon: CircleUserRound, to: '/profile' },
  ]
}
