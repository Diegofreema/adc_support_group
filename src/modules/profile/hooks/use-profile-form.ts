import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { updateProfile } from '../services/profile.service'
import type { Profile } from '../types/profile.types'
import { profileSchema, toProfileValues, type ProfileValues } from '../utils/schemas'
import { profileQuery } from './use-profile'
import { notify } from '@/lib/toast'
import { useRequiredUser } from '@/stores/session-store'

/** Edit personal details. */
export function useProfileForm(profile: Profile) {
  const user = useRequiredUser()
  const queryClient = useQueryClient()
  const form = useForm<ProfileValues>({ resolver: zodResolver(profileSchema), defaultValues: toProfileValues(profile) })
  const mutation = useMutation({
    mutationFn: (values: ProfileValues) => updateProfile(user.id, values),
    onSuccess: (updated) => {
      queryClient.setQueryData(profileQuery(user.id).queryKey, updated)
      notify('Saved')
    },
  })
  return { form, onSubmit: form.handleSubmit((values) => mutation.mutate(values)), isPending: mutation.isPending }
}
