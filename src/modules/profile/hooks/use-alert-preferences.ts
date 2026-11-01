import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateAlerts } from '../services/profile.service'
import type { AlertPreferences, Profile } from '../types/profile.types'
import { profileQuery } from './use-profile'
import { useRequiredUser } from '@/stores/session-store'

/** Toggle email/SMS alerts; the switch moves straight away. */
export function useAlertPreferences(current: AlertPreferences) {
  const user = useRequiredUser()
  const queryClient = useQueryClient()
  const key = profileQuery(user.id).queryKey
  const mutation = useMutation({
    mutationFn: (alerts: AlertPreferences) => updateAlerts(user.id, alerts),
    onMutate: (alerts) => queryClient.setQueryData(key, (profile: Profile | undefined) => profile && { ...profile, alerts }),
  })
  const toggle = (channel: keyof AlertPreferences) => (checked: boolean) => mutation.mutate({ ...current, [channel]: checked })
  return { toggle }
}
