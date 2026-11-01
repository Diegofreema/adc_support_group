import { Outlet } from '@tanstack/react-router'

import { navigationFor } from '@/config/navigation'
import { useRequiredUser } from '@/stores/session-store'
import { BottomNav } from './BottomNav'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { useNavBadges } from './use-nav-badges'
import { usePageMeta } from './use-page-meta'
import { userCaption } from './user-caption'

/** Authenticated frame: sidebar (desktop), top bar, page, bottom tabs (phone). */
export function AppShell() {
  const user = useRequiredUser()
  const navigation = navigationFor(user.role)
  const badges = useNavBadges()
  const meta = usePageMeta()
  const isDirectorate = user.role === 'directorate'
  const profilePath = isDirectorate ? '/admin/more' : '/profile'

  return (
    <div className={isDirectorate ? 'app directorate' : 'app'}>
      <Sidebar
        sections={navigation.sidebar}
        badges={badges}
        homePath={navigation.home}
        subtitle={isDirectorate ? 'Directorate' : undefined}
        user={{ name: user.fullName, caption: userCaption(user), profilePath }}
      />
      <div className="app-body">
        <Topbar
          title={meta.title ?? ''}
          backTo={meta.backTo}
          homePath={navigation.home}
          alertsPath={isDirectorate ? '/admin' : '/notifications'}
          hasAlerts={Boolean(badges.notifications)}
          user={{ name: user.fullName, profilePath }}
        />
        <main className="main">
          <Outlet />
        </main>
      </div>
      <BottomNav items={navigation.bottom} />
    </div>
  )
}
