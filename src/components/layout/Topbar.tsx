import { Link, useCanGoBack, useRouter } from '@tanstack/react-router'
import { ArrowLeft, Bell } from 'lucide-react'

import { Avatar } from '@/components/shared/display/Avatar'
import { BrandMark } from './BrandMark'

interface TopbarProps {
  title: string
  /** Show a back arrow (falls back to `backTo` when there's no history). */
  backTo?: string
  homePath: string
  alertsPath: string
  hasAlerts: boolean
  user: { name: string; profilePath: string }
}

export function Topbar({ title, backTo, homePath, alertsPath, hasAlerts, user }: TopbarProps) {
  return (
    <header className="topbar">
      {backTo ? <BackButton fallback={backTo} /> : <span className="hide-desktop"><BrandMark to={homePath} withName={false} /></span>}
      <div className="topbar-title">{title}</div>
      <Link to={alertsPath} className="icon-btn" aria-label={hasAlerts ? 'Notifications, new' : 'Notifications'}>
        <Bell className="i i-lg" aria-hidden />
        {hasAlerts && <span className="badge-dot" />}
      </Link>
      <Link to={user.profilePath} className="icon-btn hide-mobile" aria-label="My profile">
        <Avatar name={user.name} size="sm" />
      </Link>
    </header>
  )
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
