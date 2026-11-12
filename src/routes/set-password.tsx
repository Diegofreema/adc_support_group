import { createFileRoute } from '@tanstack/react-router'

import { SetPasswordPage } from '@/modules/auth/pages/SetPasswordPage'

interface SetPasswordSearch {
  phone?: string
  challenge?: string
}

export const Route = createFileRoute('/set-password')({
  validateSearch: (search: Record<string, unknown>): SetPasswordSearch => ({
    phone: typeof search.phone === 'string' ? search.phone : undefined,
    challenge: typeof search.challenge === 'string' ? search.challenge : undefined,
  }),
  component: SetPasswordPage,
})
