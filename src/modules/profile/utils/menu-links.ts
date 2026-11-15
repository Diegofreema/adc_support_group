import { Banknote, Bell, CalendarDays, ContactRound, Network, Send, Trophy } from 'lucide-react'

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
    // Most-used first (frequency of use); rarer screens lower down.
    { label: 'Events', icon: CalendarDays, to: '/events' },
    ...(powers.includes('members') ? [{ label: 'Members', icon: ContactRound, to: '/members', count: counts.members }] : []),
    ...(powers.includes('messages') ? [{ label: 'Messages', icon: Send, to: '/messages' }] : []),
    { label: 'Group money', icon: Banknote, to: '/money' },
    { label: 'Chapters', icon: Network, to: '/chapters', count: counts.chapters },
    { label: 'Leaderboard', icon: Trophy, to: '/leaderboard' },
  ]
}

export function accountLinks(counts: Counts): MenuLink[] {
  return [
    // Profile isn't listed: the name card at the top of the menu opens it.
    { label: 'Notifications', icon: Bell, to: '/notifications', count: counts.notifications, alert: true },
  ]
}
