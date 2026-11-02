import { useState } from 'react'

import { useSaveCause } from './use-causes'
import { toCauseInput } from '../utils/cause-form'
import type { CauseFormValues } from '../types'
import type { Cause } from '@/types/domain'

/** Which cause is being edited (null = new) and whether the form is open. */
export function useCauseEditor() {
  const [editing, setEditing] = useState<Cause | null | undefined>(undefined)
  const save = useSaveCause()
  const close = () => setEditing(undefined)
  const submit = (values: CauseFormValues) => save.mutate({ id: editing?.id, input: toCauseInput(values) }, { onSuccess: close })
  return { isOpen: editing !== undefined, cause: editing ?? null, openNew: () => setEditing(null), openEdit: setEditing, close, submit, saving: save.isPending }
}

export type CauseEditor = ReturnType<typeof useCauseEditor>
