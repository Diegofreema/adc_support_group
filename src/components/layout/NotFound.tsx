import { Link, useCanGoBack, useLocation, useRouter } from '@tanstack/react-router'
import { ArrowLeft, House, MapPinOff } from 'lucide-react'

import { Button, buttonClassName, IconTile } from '@/components/shared'
import { homePathFor } from '@/modules/auth'
import { useSessionUser } from '@/stores/session-store'
import { StatusLayout } from './StatusLayout'

/** Unknown URLs: say so plainly, show what was asked for, and offer the way home. */
export function NotFound() {
  const router = useRouter()
  const canGoBack = useCanGoBack()
  const path = useLocation({ select: (location) => location.pathname })
  const user = useSessionUser()
  const home = user ? homePathFor(user) : '/'
  return (
    <StatusLayout headline={<>Wrong turn.<br /><span>Let's get you back.</span></>}>
      <IconTile icon={MapPinOff} className="mb-4" />
      <p className="eyebrow">Error 404</p>
      <h1 className="h1 mt-2">This page doesn't exist</h1>
      <p className="muted mt-1">
        Nothing lives at <span className="mono break-all">{path}</span>. The link may be old or mistyped, or the page was moved.
      </p>
      <div className="mt-6 grid gap-2">
        <Link to={home} className={buttonClassName('primary', 'lg', true)}><House className="i" aria-hidden />{user ? 'Go to home' : 'Go to log in'}</Link>
        {canGoBack && <Button size="lg" block icon={ArrowLeft} onClick={() => router.history.back()}>Go back</Button>}
      </div>
    </StatusLayout>
  )
}
