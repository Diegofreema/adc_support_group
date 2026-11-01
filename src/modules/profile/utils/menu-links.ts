import { Bell, CircleUserRound, ContactRound, LifeBuoy, Network, Send } from 'lucide-react'

import type { MenuLink } from '../components/MenuSection'

interface Counts {
  members?: number
  chapters?: number
  notifications?: number
}

export function groupLinks(counts: Counts): MenuLink[] {
  return [
    { label: 'Members', icon: ContactRound, to: '/members', count: counts.members },
    { label: 'Chapters', icon: Network, to: '/chapters', count: counts.chapters },
    { label: 'Messages', icon: Send, to: '/messages' },
  ]
}

export function accountLinks(counts: Counts): MenuLink[] {
  return [
    { label: 'Notifications', icon: Bell, to: '/notifications', count: counts.notifications, alert: true },
    { label: 'Profile', icon: CircleUserRound, to: '/profile' },
    { label: 'Help', icon: LifeBuoy, to: '/more' },
  ]
}
