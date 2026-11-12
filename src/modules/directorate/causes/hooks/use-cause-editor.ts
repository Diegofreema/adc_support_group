import { useState } from 'react'

import { useSaveCause } from './use-causes'
import { useCategories } from '../../shared/hooks/use-lookups'
import { toCauseInput } from '../utils/cause-form'
import { KEEP, visibilityKey, visibilityOptions } from '../utils/visibility'
import type { CauseFormValues, DirectorateCause } from '../types'

/** Which cause is being edited (null = new), whether the form is open, and who it can be shown to. */
export function useCauseEditor() {
  const [editing, setEditing] = useState<DirectorateCause | null | undefined>(undefined)
  const save = useSaveCause()
  const categories = useCategories()
  const cause = editing ?? null
  const keepLabel = cause && visibilityKey({ states: cause.visibleStates, categoryIds: cause.visibleCategoryIds }) === KEEP ? cause.visibleTo : undefined
  const close = () => setEditing(undefined)
  const submit = (values: CauseFormValues) => save.mutate({ id: cause?.id, input: toCauseInput(values, cause) }, { onSuccess: close })
  return {
    isOpen: editing !== undefined, cause, openNew: () => setEditing(null), openEdit: setEditing, close, submit,
    saving: save.isPending, visibleToOptions: visibilityOptions(categories, keepLabel),
  }
}

export type CauseEditor = ReturnType<typeof useCauseEditor>
