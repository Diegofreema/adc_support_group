import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { causeFormSchema, EMPTY_CAUSE, toFormValues } from '../utils/cause-form'
import type { CauseFormValues } from '../types'
import type { Cause } from '@/types/domain'

/** react-hook-form setup for a cause; refills whenever a different cause opens. */
export function useCauseForm(cause: Cause | null, open: boolean) {
  const form = useForm<CauseFormValues>({ resolver: zodResolver(causeFormSchema), defaultValues: EMPTY_CAUSE })
  const { reset } = form
  useEffect(() => {
    if (open) reset(cause ? toFormValues(cause) : EMPTY_CAUSE)
  }, [cause, open, reset])
  return form
}
