import { AuthLayout } from '@/components/layout/AuthLayout'
import { useRequiredUser } from '@/stores/session-store'
import { JoinGroupCard } from '../components/get-started/JoinGroupCard'
import { StartGroupCard } from '../components/get-started/StartGroupCard'
import { StepHeading } from '../components/shared/StepHeading'
import { useLogout } from '../hooks/use-logout'

/** Signed in but in no group yet: join one with a link, or start one. */
export function GetStartedPage() {
  const user = useRequiredUser()
  const logout = useLogout()
  const firstName = user.fullName.trim().split(/\s+/)[0]
  return (
    <AuthLayout
      headline={<>One last step.<br /><span>Find your group.</span></>}
      topAction={<button type="button" className="text-link !text-[var(--text-2)]" onClick={logout}>Log out</button>}
    >
      <StepHeading title={`Welcome, ${firstName}`} helper="Join the group that invited you, or start your own." />
      <div className="mt-6"><JoinGroupCard /></div>
      <p className="or-divider" aria-hidden>or</p>
      <StartGroupCard />
    </AuthLayout>
  )
}
