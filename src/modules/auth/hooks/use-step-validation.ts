import type { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form'

import type { Wizard } from '@/hooks/use-wizard'

/** Validate only this step's fields before moving on. */
export function useStepValidation<Values extends FieldValues>(form: UseFormReturn<Values>, wizard: Wizard) {
  return async (fields: FieldPath<Values>[], onValid?: () => Promise<unknown> | void): Promise<void> => {
    const valid = await form.trigger(fields)
    if (!valid) return
    await onValid?.()
    wizard.next()
  }
}
