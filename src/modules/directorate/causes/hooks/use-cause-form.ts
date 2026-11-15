import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'

import { causeFormSchema, EMPTY_CAUSE, toFormValues } from '../utils/cause-form'
import type { CauseFormValues, DirectorateCause } from '../types'
import { useAppForm } from '@/hooks/use-app-form'

/** react-hook-form setup for a cause; refills whenever a different cause opens. */
export function useCauseForm(cause: DirectorateCause | null, open: boolean) {
  const form = useAppForm<CauseFormValues>({ resolver: zodResolver(causeFormSchema), defaultValues: EMPTY_CAUSE })
  const { reset } = form
  useEffect(() => {
    if (open) reset(cause ? toFormValues(cause) : EMPTY_CAUSE)
  }, [cause, open, reset])
  return form
}
