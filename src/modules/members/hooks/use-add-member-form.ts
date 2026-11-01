import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'

import { useAddMember } from './use-member-mutations'
import { EMPTY_MEMBER, newMemberSchema, type NewMemberForm } from '../utils/member-schema'
import type { PlaceValue } from '@/lib/geo/places'

/** Form state + submit for adding one person. */
export function useAddMemberForm(groupId: string) {
  const form = useForm<NewMemberForm>({ resolver: zodResolver(newMemberSchema), defaultValues: EMPTY_MEMBER })
  const addMember = useAddMember(groupId)
  const [state, lga, ward, chapterId] = useWatch({ control: form.control, name: ['state', 'lga', 'ward', 'chapterId'] })

  const setPlace = (next: PlaceValue) => {
    const options = { shouldValidate: form.formState.isSubmitted }
    form.setValue('state', next.state, options)
    form.setValue('lga', next.lga, options)
    form.setValue('ward', next.ward, options)
  }

  const onSubmit = form.handleSubmit((values) => {
    const input = { ...values, email: values.email || undefined, chapterId: values.chapterId || undefined }
    addMember.mutate(input, { onSuccess: () => form.reset(EMPTY_MEMBER) })
  })

  return {
    form, onSubmit, isSaving: addMember.isPending,
    place: { state, lga, ward }, setPlace,
    chapterId: chapterId ?? '', setChapterId: (value: string) => form.setValue('chapterId', value),
  }
}
