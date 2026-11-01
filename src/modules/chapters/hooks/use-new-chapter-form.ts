import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'

import { useCreateChapter } from './use-chapter-mutations'
import type { ChapterLevel } from '../types'
import { suggestChapterName } from '../utils/chapter-name'
import { EMPTY_CHAPTER, newChapterSchema, type NewChapterForm } from '../utils/chapter-schema'
import type { PlaceValue } from '@/modules/groups'

/** Keeps the name filled in from the place until the user types their own. */
function useSuggestedName(form: ReturnType<typeof useForm<NewChapterForm>>, groupName: string) {
  const [edited, setEdited] = useState(false)
  const [level, state, lga, ward] = useWatch({ control: form.control, name: ['level', 'state', 'lga', 'ward'] })
  useEffect(() => {
    if (!edited) form.setValue('name', suggestChapterName(groupName, level, { state, lga, ward }))
  }, [edited, form, groupName, level, state, lga, ward])
  return { markEdited: () => setEdited(true), reset: () => setEdited(false), place: { state, lga, ward }, level }
}

export function useNewChapterForm(groupId: string, groupName: string, onDone: () => void) {
  const form = useForm<NewChapterForm>({ resolver: zodResolver(newChapterSchema), defaultValues: EMPTY_CHAPTER })
  const name = useSuggestedName(form, groupName)
  const create = useCreateChapter(groupId)
  const validate = { shouldValidate: form.formState.isSubmitted }

  const setPlace = (next: PlaceValue) => (['state', 'lga', 'ward'] as const).forEach((key) => form.setValue(key, next[key], validate))
  const setLevel = (level: ChapterLevel) => form.setValue('level', level, validate)

  const onSubmit = form.handleSubmit((values) => {
    create.mutate(values, { onSuccess: () => { form.reset(EMPTY_CHAPTER); name.reset(); onDone() } })
  })

  return { form, onSubmit, isSaving: create.isPending, place: name.place, level: name.level, setPlace, setLevel, onNameEdit: name.markEdited }
}
