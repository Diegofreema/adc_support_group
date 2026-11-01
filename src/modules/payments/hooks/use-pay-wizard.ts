import { useState } from 'react'

import { EMPTY_DRAFT, isStepComplete, payDraftSummary } from '../utils/pay-draft'
import { usePayLookups } from './use-pay-lookups'
import { usePayWithFunz } from './use-pay-mutation'
import { useWizard } from '@/hooks/use-wizard'
import { notify } from '@/lib/toast'
import type { PayDraft } from '../types'

const STEPS = 4

/** State for the 4-step "Pay as a group" flow. */
export function usePayWizard() {
  const wizard = useWizard(STEPS)
  const lookups = usePayLookups()
  const pay = usePayWithFunz()
  const [draft, setDraft] = useState<PayDraft>(EMPTY_DRAFT)

  const update = (changes: Partial<PayDraft>) => setDraft((current) => ({ ...current, ...changes }))
  const next = () => (isStepComplete(draft, wizard.step) ? wizard.next() : notify('Choose one first', 'error'))

  return {
    wizard,
    lookups,
    draft,
    update,
    next,
    summary: () => payDraftSummary(draft, lookups),
    submit: () => pay.mutate(draft),
    isPaying: pay.isPending,
    receipt: pay.data,
  }
}
