import {
  BarChart3, Banknote, Bell, CircleUserRound, ContactRound, FileSpreadsheet, House, LayoutGrid,
  Megaphone, Network, Send, Settings, ShieldCheck, Target, UsersRound, Wallet, type LucideIcon,
} from 'lucide-react'

import type { Role } from '@/types/domain'

export interface NavItem {
  to: string
  label: string
  icon: LucideIcon
  /** Paths that should also light this item up (e.g. /members under "Group"). */
  matches?: string[]
  badgeKey?: BadgeKey
}

export interface NavSection {
  title: string
  items: NavItem[]
}

/** Counts shown next to nav items; supplied by the shell's badge hook. */
export type BadgeKey = 'toReview' | 'notifications' | 'groupsToVerify' | 'activitiesToCheck' | 'offlineToConfirm'

export interface RoleNavigation {
  home: string
  sidebar: NavSection[]
  bottom: NavItem[]
}

const home: NavItem = { to: '/home', label: 'Home', icon: House }
const activities: NavItem = { to: '/activities', label: 'Activities', icon: Megaphone, badgeKey: 'toReview' }
const notifications: NavItem = { to: '/notifications', label: 'Alerts', icon: Bell, badgeKey: 'notifications' }
const profile: NavItem = { to: '/profile', label: 'Me', icon: CircleUserRound }

const leaderNav: RoleNavigation = {
  home: '/home',
  sidebar: [
    { title: 'Menu', items: [home, activities] },
    {
      title: 'My group',
      items: [
        { to: '/group', label: 'Group overview', icon: UsersRound },
        { to: '/members', label: 'Members', icon: ContactRound },
        { to: '/chapters', label: 'Chapters', icon: Network },
        { to: '/payments', label: 'Payments', icon: Wallet },
        { to: '/messages', label: 'Messages', icon: Send },
      ],
    },
    { title: 'Account', items: [{ ...notifications, label: 'Notifications' }, { ...profile, label: 'My profile' }] },
  ],
  bottom: [
    home,
    activities,
    { to: '/group', label: 'Group', icon: UsersRound, matches: ['/members', '/chapters'] },
    { to: '/payments', label: 'Payments', icon: Wallet },
    { to: '/more', label: 'More', icon: LayoutGrid, matches: ['/messages', '/notifications', '/profile'] },
  ],
}

const memberNav: RoleNavigation = {
  home: '/home',
  sidebar: [
    { title: 'Menu', items: [home, { ...activities, badgeKey: undefined }, { to: '/group', label: 'My group', icon: UsersRound }] },
    { title: 'Account', items: [{ ...notifications, label: 'Notifications' }, { ...profile, label: 'My profile' }] },
  ],
  bottom: [home, { ...activities, badgeKey: undefined }, { to: '/group', label: 'My group', icon: UsersRound }, notifications, profile],
}

const directorateNav: RoleNavigation = {
  home: '/admin',
  sidebar: [
    {
      title: 'Directorate',
      items: [
        { to: '/admin', label: 'Overview', icon: BarChart3 },
        { to: '/admin/groups', label: 'Groups to verify', icon: ShieldCheck, badgeKey: 'groupsToVerify' },
        { to: '/admin/activities', label: 'Activities', icon: Megaphone, badgeKey: 'activitiesToCheck' },
      ],
    },
    {
      title: 'Money',
      items: [
        { to: '/admin/payments', label: 'Payments', icon: Banknote, badgeKey: 'offlineToConfirm' },
        { to: '/admin/causes', label: 'Funding causes', icon: Target },
      ],
    },
    {
      title: 'Reach',
      items: [
        { to: '/admin/messages', label: 'Messages', icon: Send },
        { to: '/admin/reports', label: 'Reports & export', icon: FileSpreadsheet },
        { to: '/admin/settings', label: 'Settings', icon: Settings },
      ],
    },
  ],
  bottom: [
    { to: '/admin', label: 'Overview', icon: BarChart3 },
    { to: '/admin/groups', label: 'Groups', icon: ShieldCheck },
    { to: '/admin/activities', label: 'Activities', icon: Megaphone },
    { to: '/admin/payments', label: 'Money', icon: Banknote },
    { to: '/admin/more', label: 'More', icon: LayoutGrid, matches: ['/admin/causes', '/admin/messages', '/admin/reports', '/admin/settings'] },
  ],
}

const NAVIGATION: Record<Role, RoleNavigation> = {
  leader: leaderNav,
  member: memberNav,
  directorate: directorateNav,
}

export function navigationFor(role: Role): RoleNavigation {
  return NAVIGATION[role]
}

/** True when the current path belongs to this nav item. */
export function isNavItemActive(item: NavItem, pathname: string): boolean {
  const paths = [item.to, ...(item.matches ?? [])]
  return paths.some((path) => pathname === path || (path !== '/admin' && pathname.startsWith(`${path}/`)))
}
