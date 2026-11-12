import { useMutation, useQueryClient } from '@tanstack/react-query'

import { groupKeys } from './query-keys'
import { cancelRename, regenerateJoinCode, requestHandover, saveGroupEdits, type GroupEdits } from '../services/groups.service'
import type { Group } from '@/types/domain'
import { notify } from '@/lib/toast'

export function useRegenerateJoinCode(groupId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => regenerateJoinCode(groupId),
    onSuccess: (group) => {
      queryClient.setQueryData(groupKeys.detail(groupId), group)
      notify('New link ready')
    },
  })
}

export function useRequestHandover(groupId: string) {
  return useMutation({
    mutationFn: (newLeader: string) => requestHandover(groupId, newLeader),
    onSuccess: () => notify('Request sent'),
  })
}

/** "Edit details": description and photo now, the name after Directorate approval. */
export function useSaveGroupEdits(group: Group, onDone: () => void) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (edits: GroupEdits) => saveGroupEdits(group, edits),
    onSuccess: async ({ renameRequested }) => {
      await queryClient.invalidateQueries({ queryKey: groupKeys.detail(group.id) })
      notify(renameRequested ? 'Saved. The new name is waiting for the Directorate.' : 'Saved')
      onDone()
    },
  })
}

export function useCancelRename(groupId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: cancelRename,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: groupKeys.detail(groupId) })
      notify('Name change withdrawn')
    },
  })
}
