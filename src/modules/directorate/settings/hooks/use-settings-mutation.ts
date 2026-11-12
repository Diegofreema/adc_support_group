import { useMutation, useQueryClient } from '@tanstack/react-query'

import { directorateKeys } from '../../shared/query-keys'
import { notify } from '@/lib/toast'

/** Mutation that refreshes the given query keys and confirms with a toast. */
export function useSettingsMutation<Args>(sections: string[], fn: (args: Args) => Promise<unknown>, message: string | ((args: Args) => string)) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: fn,
    onSuccess: (_data, args) => {
      sections.forEach((section) => queryClient.invalidateQueries({ queryKey: directorateKeys.settings(section) }))
      notify(typeof message === 'function' ? message(args) : message)
    },
  })
}
