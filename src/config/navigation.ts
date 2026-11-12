import {
  BarChart3, Banknote, Bell, CalendarDays, CircleUserRound, ContactRound, FileSpreadsheet, House, LayoutGrid,
  Megaphone, Network, Send, Settings, ShieldCheck, Target, UsersRound, Wallet, type LucideIcon,
} from 'lucide-react'

import type { GroupStatus, Power, Role } from '@/types/domain'

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
const events: NavItem = { to: '/events', label: 'Events', icon: CalendarDays }
const notifications: NavItem = { to: '/notifications', label: 'Alerts', icon: Bell, badgeKey: 'notifications' }
const profile: NavItem = { to: '/profile', label: 'Me', icon: CircleUserRound }

const leaderNav: RoleNavigation = {
  home: '/home',
  sidebar: [
    { title: 'Menu', items: [home, activities, events] },
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
    { to: '/more', label: 'More', icon: LayoutGrid, matches: ['/events', '/messages', '/notifications', '/profile'] },
  ],
}

const memberNav: RoleNavigation = {
  home: '/home',
  sidebar: [
    { title: 'Menu', items: [home, { ...activities, badgeKey: undefined }, events, { to: '/group', label: 'My group', icon: UsersRound }] },
    { title: 'Account', items: [{ ...notifications, label: 'Notifications' }, { ...profile, label: 'My profile' }] },
  ],
  // Alerts stay one tap away in the top bar.
  bottom: [home, { ...activities, badgeKey: undefined }, events, { to: '/group', label: 'My group', icon: UsersRound }, { ...profile, matches: ['/notifications'] }],
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

/**
 * A group that isn't verified (pending, rejected, suspended) can't invite,
 * add members, pay, message, run chapters or record activities: the backend
 * refuses. Only what still works is shown. No group at all: home and account.
 */
const waitingNav: RoleNavigation = {
  home: '/home',
  sidebar: [
    { title: 'Menu', items: [home, { to: '/group', label: 'My group', icon: UsersRound }] },
    { title: 'Account', items: [{ ...notifications, label: 'Notifications' }, { ...profile, label: 'My profile' }] },
  ],
  bottom: [home, { to: '/group', label: 'My group', icon: UsersRound }, notifications, profile],
}

const noGroupNav: RoleNavigation = {
  home: '/home',
  sidebar: [
    { title: 'Menu', items: [home] },
    { title: 'Account', items: [{ ...notifications, label: 'Notifications' }, { ...profile, label: 'My profile' }] },
  ],
  bottom: [home, notifications, profile],
}

/**
 * Executives and coordinators: the member menu plus the group screens their
 * powers open (Members, Payments' offline record, Messages, the review tab).
 */
function executiveNav(powers: Power[]): RoleNavigation {
  const can = (power: Power) => powers.includes(power)
  const acts = can('approvals') ? activities : { ...activities, badgeKey: undefined }
  const group: NavItem = { to: '/group', label: 'Group overview', icon: UsersRound }
  const members: NavItem[] = can('members') ? [{ to: '/members', label: 'Members', icon: ContactRound }] : []
  const payments: NavItem[] = can('money') ? [{ to: '/payments', label: 'Payments', icon: Wallet }] : []
  const messages: NavItem[] = can('messages') ? [{ to: '/messages', label: 'Messages', icon: Send }] : []
  return {
    home: '/home',
    sidebar: [
      { title: 'Menu', items: [home, acts, events] },
      { title: 'My group', items: [group, ...members, { to: '/chapters', label: 'Chapters', icon: Network }, ...payments, ...messages] },
      { title: 'Account', items: [{ ...notifications, label: 'Notifications' }, { ...profile, label: 'My profile' }] },
    ],
    bottom: [
      home,
      acts,
      { to: '/group', label: 'Group', icon: UsersRound, matches: ['/members', '/chapters'] },
      ...payments,
      { to: '/more', label: 'More', icon: LayoutGrid, matches: ['/events', '/messages', '/notifications', '/profile'] },
    ],
  }
}

/** groupStatus: the active group's status; undefined means no group (ignored for the Directorate). */
export function navigationFor(role: Role, groupStatus?: GroupStatus, powers: Power[] = []): RoleNavigation {
  if (role === 'directorate') return directorateNav
  if (!groupStatus) return noGroupNav
  if (groupStatus !== 'verified') return waitingNav
  if (role === 'leader') return leaderNav
  return powers.length > 0 ? executiveNav(powers) : memberNav
}

/** True when the current path belongs to this nav item. */
export function isNavItemActive(item: NavItem, pathname: string): boolean {
  const paths = [item.to, ...(item.matches ?? [])]
  return paths.some((path) => pathname === path || (path !== '/admin' && pathname.startsWith(`${path}/`)))
}
