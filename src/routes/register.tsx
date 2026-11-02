import { createFileRoute } from '@tanstack/react-router'

import { RegisterGroupPage } from '@/modules/auth/pages/RegisterGroupPage'

export const Route = createFileRoute('/register')({
  component: RegisterGroupPage,
})
