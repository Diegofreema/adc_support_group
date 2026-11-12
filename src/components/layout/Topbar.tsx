import { Link, useCanGoBack, useRouter } from '@tanstack/react-router'
import { ArrowLeft, Bell } from 'lucide-react'

import { Avatar } from '@/components/shared/display/Avatar'
import { BrandMark } from './BrandMark'

interface TopbarProps {
  title: string
  /** Show a back arrow (falls back to `backTo` when there's no history). */
  backTo?: string
  homePath: string
  /** No alerts page (the Directorate): no bell. */
  alertsPath?: string
  hasAlerts: boolean
  user: { name: string; profilePath: string }
}

export function Topbar({ title, backTo, homePath, alertsPath, hasAlerts, user }: TopbarProps) {
  return (
    <header className="topbar">
      <TopbarStart backTo={backTo} homePath={homePath} />
      <div className="topbar-title">{title}</div>
      {alertsPath && (
        <Link to={alertsPath} className="icon-btn" aria-label={hasAlerts ? 'Notifications, new' : 'Notifications'}>
          <Bell className="i i-lg" aria-hidden />
          {hasAlerts && <span className="badge-dot" />}
        </Link>
      )}
      <Link to={user.profilePath} className="icon-btn hide-mobile" aria-label="My profile">
        <Avatar name={user.name} size="sm" />
      </Link>
    </header>
  )
}

/**
 * Back arrow, or the brand on phones. Pages reached from the phone "More"
 * menu only get the arrow on phones; on desktop they're in the sidebar.
 */
function TopbarStart({ backTo, homePath }: { backTo?: string; homePath: string }) {
  if (!backTo) return <span className="hide-desktop"><BrandMark to={homePath} withName={false} /></span>
  if (backTo.endsWith('/more')) return <span className="hide-desktop"><BackButton fallback={backTo} /></span>
  return <BackButton fallback={backTo} />
}

function BackButton({ fallback }: { fallback: string }) {
  const router = useRouter()
  const canGoBack = useCanGoBack()
  const goBack = () => (canGoBack ? router.history.back() : router.navigate({ to: fallback }))
  return (
    <button type="button" className="icon-btn back" aria-label="Go back" onClick={goBack}>
      <ArrowLeft className="i i-lg" aria-hidden />
    </button>
  )
}
