import { AuthLayout } from '@/components/layout/AuthLayout'
import { AuthEntryLinks } from '../components/login/AuthEntryLinks'
import { LoginForm } from '../components/login/LoginForm'
import { LoginVisual } from '../components/login/LoginVisual'
import { StepHeading } from '../components/shared/StepHeading'

export function LoginPage() {
  return (
    <AuthLayout headline={<>Your group.<br /><span>All in one place.</span></>} visualFooter={<LoginVisual />}>
      <div className="mb-6"><StepHeading title="Welcome back" helper="Log in to your group." /></div>
      <LoginForm />
      <AuthEntryLinks />
    </AuthLayout>
  )
}
