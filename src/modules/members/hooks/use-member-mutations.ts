import { useMutation, useQueryClient } from '@tanstack/react-query'

import { memberKeys } from './query-keys'
import { addExecutiveByQuery, addMember, makeExecutive, moveMember, removeMember } from '../services/members.service'
import type { NewMemberInput } from '../types'
import { notify } from '@/lib/toast'

/** Shared mutation wiring: refresh the member list, toast on success or error. */
function useMemberMutation<Input, Output>(mutationFn: (input: Input) => Promise<Output>, successMessage: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: memberKeys.all })
      notify(successMessage)
    },
    onError: (error) => notify(error.message, 'error'),
  })
}

export function useAddMember(groupId: string) {
  return useMemberMutation((input: NewMemberInput) => addMember(groupId, input), 'Added · password sent')
}

export function useMakeExecutive() {
  return useMemberMutation((memberId: string) => makeExecutive(memberId), 'Now an executive')
}

export function useAddExecutive(groupId: string) {
  return useMemberMutation(({ query, title }: { query: string; title: string }) => addExecutiveByQuery(groupId, query, title), 'Executive added')
}

export function useMoveMember() {
  return useMemberMutation(({ memberId, chapterId }: { memberId: string; chapterId: string }) => moveMember(memberId, chapterId), 'Moved')
}

export function useRemoveMember() {
  return useMemberMutation((memberId: string) => removeMember(memberId), 'Removed')
}
