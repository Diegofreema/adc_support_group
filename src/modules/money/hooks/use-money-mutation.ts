import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { notify } from '@/lib/toast'
import { moneyKeys } from '../utils/money-keys'

/** Save something, refresh every money screen, say so, and go back to /money. */
export function useMoneyMutation<T>(save: (input: T) => Promise<unknown>, done: string) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  return useMutation({
    mutationFn: save,
    onSuccess: () => {
      notify(done)
      void queryClient.invalidateQueries({ queryKey: moneyKeys.all })
      void navigate({ to: '/money' })
    },
  })
}
