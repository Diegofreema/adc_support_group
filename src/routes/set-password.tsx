import { createFileRoute } from '@tanstack/react-router'

import { SetPasswordPage } from '@/modules/auth/pages/SetPasswordPage'

interface SetPasswordSearch {
  phone?: string
  challenge?: string
  /** Where the code went ("email" or "sms"). */
  via?: 'email' | 'sms'
  /** From the welcome email/SMS an imported member gets. */
  welcome?: boolean
}

export const Route = createFileRoute('/set-password')({
  validateSearch: (search: Record<string, unknown>): SetPasswordSearch => ({
    phone: typeof search.phone === 'string' || typeof search.phone === 'number' ? String(search.phone) : undefined,
    challenge: typeof search.challenge === 'string' ? search.challenge : undefined,
    via: search.via === 'email' || search.via === 'sms' ? search.via : undefined,
    welcome: search.welcome === 1 || search.welcome === '1' || search.welcome === true || search.welcome === 'true' ? true : undefined,
  }),
  component: SetPasswordPage,
})
