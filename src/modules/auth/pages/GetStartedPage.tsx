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
      topAction={<button type="button" className="small bold" onClick={logout}>Log out</button>}
    >
      <StepHeading title={`Welcome, ${firstName}`} helper="Join the group that invited you, or start your own." />
      <div className="mt-6"><JoinGroupCard /></div>
      <div className="my-4 flex items-center gap-3" aria-hidden>
        <span className="h-px flex-1 bg-line" />
        <span className="label !mb-0">or</span>
        <span className="h-px flex-1 bg-line" />
      </div>
      <StartGroupCard />
    </AuthLayout>
  )
}
