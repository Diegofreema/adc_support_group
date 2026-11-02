import { AuthLayout } from '@/components/layout/AuthLayout'
import { SetPasswordForm } from '../components/SetPasswordForm'

export function SetPasswordPage() {
  return (
    <AuthLayout headline={<>One last step.<br /><span>Make it yours.</span></>}>
      <SetPasswordForm />
    </AuthLayout>
  )
}
