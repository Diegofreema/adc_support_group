import { Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

import { useSessionUser } from '@/stores/session-store'
import { LoginLink } from './LoginLink'

/**
 * Top-right of join/register: "Log in" when signed out, "Back" to
 * /get-started for someone signed in without a group, nothing otherwise.
 */
export function EntryTopAction({ loginRedirect }: { loginRedirect?: string }) {
  const user = useSessionUser()
  if (!user) return <LoginLink redirect={loginRedirect} />
  if (user.activeGroupId || user.role === 'directorate') return null
  return (
    <Link to="/get-started" className="small bold inline-flex items-center gap-1">
      <ArrowLeft className="i" aria-hidden />Back
    </Link>
  )
}
