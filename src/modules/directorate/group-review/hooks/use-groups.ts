import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { askForInfo, groupQuery, groupsQuery, rejectGroup, restoreGroup, suspendGroup, verifyGroup } from '../services/groups.service'
import { directorateKeys } from '../../shared/query-keys'
import { notify } from '@/lib/toast'

export function useGroups() {
  return useQuery(groupsQuery)
}

export function useGroup(id: string) {
  return useQuery(groupQuery(id))
}

/** Wrap a group mutation: refresh lists + toast on success. */
function useGroupMutation<Args>(fn: (args: Args) => Promise<unknown>, message: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: fn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: directorateKeys.groups() })
      notify(message)
    },
  })
}

export function useGroupDecisions(id: string) {
  return {
    verify: useGroupMutation(() => verifyGroup(id), 'Group verified'),
    reject: useGroupMutation((reason: string) => rejectGroup(id, reason), 'Group rejected'),
    askInfo: useGroupMutation((message: string) => askForInfo(id, message), 'Message sent'),
    suspend: useGroupMutation((reason: string) => suspendGroup(id, reason), 'Group suspended'),
    restore: useGroupMutation(() => restoreGroup(id), 'Group restored'),
  }
}

export function useRestoreGroup() {
  return useGroupMutation((id: string) => restoreGroup(id), 'Group restored')
}
