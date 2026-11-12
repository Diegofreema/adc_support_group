import { useState } from 'react'

import { EMPTY_DRAFT, isStepComplete, payDraftSummary } from '../utils/pay-draft'
import { usePayLookups } from './use-pay-lookups'
import { usePayWithFunz } from './use-pay-mutation'
import { useWizard } from '@/hooks/use-wizard'
import { notify } from '@/lib/toast'
import type { PayDraft } from '../types'

const STEPS = 3

/** State for the 3-step "Pay" flow: for what, how much, check. */
export function usePayWizard() {
  const wizard = useWizard(STEPS)
  const lookups = usePayLookups()
  const pay = usePayWithFunz()
  const [draft, setDraft] = useState<PayDraft>(EMPTY_DRAFT)

  const update = (changes: Partial<PayDraft>) => setDraft((current) => ({ ...current, ...changes }))
  const next = () => (isStepComplete(draft, wizard.step) ? wizard.next() : notify(stepHint(wizard.step), 'error'))

  return {
    wizard,
    lookups,
    draft,
    update,
    next,
    summary: () => payDraftSummary(draft, lookups),
    submit: () => pay.mutate(draft),
    // Stays busy while the browser leaves for Funz.
    isPaying: pay.isPending || pay.isSuccess,
  }
}

function stepHint(step: number): string {
  return step === 1 ? 'Enter between ₦100 and ₦10,000,000' : 'Choose one first'
}
