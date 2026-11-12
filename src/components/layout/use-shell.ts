import { navigationFor, type RoleNavigation } from '@/config/navigation'
import { useRequiredUser } from '@/stores/session-store'
import type { User } from '@/types/domain'
import { useDraftSync } from './use-draft-sync'
import { useNavBadges, type NavBadges } from './use-nav-badges'
import { usePageMeta, type PageMeta } from './use-page-meta'

export interface ShellState {
  user: User
  navigation: RoleNavigation
  badges: NavBadges
  meta: PageMeta
  isDirectorate: boolean
  profilePath: string
  alertsPath?: string
}

/** Everything the app frame needs, derived from the logged-in user and current route. */
export function useShell(): ShellState {
  const user = useRequiredUser()
  const isDirectorate = user.role === 'directorate'
  useDraftSync(!isDirectorate)
  return {
    user,
    navigation: navigationFor(user.role, user.activeGroupStatus, user.powers),
    badges: useNavBadges(),
    meta: usePageMeta(),
    isDirectorate,
    profilePath: isDirectorate ? '/admin/more' : '/profile',
    // Staff have no notifications page, so no bell.
    alertsPath: isDirectorate ? undefined : '/notifications',
  }
}
