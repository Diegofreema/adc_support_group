import { createFileRoute } from '@tanstack/react-router'

import { SetPasswordPage } from '@/modules/auth/pages/SetPasswordPage'

export const Route = createFileRoute('/set-password')({
  component: SetPasswordPage,
})
