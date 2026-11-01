import { useMutation, useQueryClient } from '@tanstack/react-query'

import { directorateKeys } from '../../shared/query-keys'
import { notify } from '@/lib/toast'

/** Mutation that refreshes one settings section and confirms with a toast. */
export function useSettingsMutation<Args>(section: string, fn: (args: Args) => Promise<unknown>, message: string | ((args: Args) => string)) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: fn,
    onSuccess: (_data, args) => {
      queryClient.invalidateQueries({ queryKey: directorateKeys.settings(section) })
      notify(typeof message === 'function' ? message(args) : message)
    },
  })
}
