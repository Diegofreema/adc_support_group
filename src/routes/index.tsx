import { createFileRoute } from '@tanstack/react-router'

import { redirectIfLoggedIn } from '@/lib/route-guards'
import { LoginPage } from '@/modules/auth/pages/LoginPage'

export const Route = createFileRoute('/')({
  beforeLoad: redirectIfLoggedIn,
  component: LoginPage,
})
