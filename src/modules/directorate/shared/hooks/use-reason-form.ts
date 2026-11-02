import { useState } from 'react'

import type { ReasonInput } from '../utils/reasons'

export interface ReasonForm {
  value: ReasonInput
  setReason: (reason: string) => void
  setNote: (note: string) => void
  isValid: boolean
  reset: () => void
}

/** State for "pick a reason + optional note" dialogs. */
export function useReasonForm(defaultReason = ''): ReasonForm {
  const [value, setValue] = useState<ReasonInput>({ reason: defaultReason, note: '' })
  return {
    value,
    setReason: (reason) => setValue((current) => ({ ...current, reason })),
    setNote: (note) => setValue((current) => ({ ...current, note })),
    isValid: Boolean(value.reason),
    reset: () => setValue({ reason: defaultReason, note: '' }),
  }
}
