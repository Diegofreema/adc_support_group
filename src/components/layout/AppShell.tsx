import { Outlet } from '@tanstack/react-router'

import { BottomNav } from './BottomNav'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { useShell } from './use-shell'
import { userCaption } from './user-caption'

/** Authenticated frame: sidebar (desktop), top bar, page, bottom tabs (phone). */
export function AppShell() {
  const { user, navigation, badges, meta, isDirectorate, profilePath, alertsPath } = useShell()
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
          alertsPath={alertsPath}
          hasAlerts={Boolean(badges.notifications)}
          user={{ name: user.fullName, profilePath }}
        />
        <main className="main"><Outlet /></main>
      </div>
      <BottomNav items={navigation.bottom} />
    </div>
  )
}
