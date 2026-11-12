import { useMutation, useQueryClient } from '@tanstack/react-query'

import { memberKeys } from './query-keys'
import { addExecutiveByQuery, addMember, makeExecutive, moveMember, removeMember, setMemberPowers } from '../services/members.service'
import type { MemberRecord, NewMemberInput } from '../types'
import { notify } from '@/lib/toast'
import type { Power } from '@/types/domain'

/** Shared mutation wiring: refresh the member list and toast on success (errors toast globally). */
function useMemberMutation<Input, Output>(mutationFn: (input: Input) => Promise<Output>, successMessage: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: memberKeys.all })
      notify(successMessage)
    },
  })
}

export function useAddMember() {
  return useMemberMutation((input: NewMemberInput) => addMember(input), 'Added')
}

export function useMakeExecutive() {
  return useMemberMutation((member: MemberRecord) => makeExecutive(member), 'Now an executive')
}

export function useAddExecutive(groupId: string) {
  return useMemberMutation(({ query, title }: { query: string; title: string }) => addExecutiveByQuery(groupId, query, title), 'Executive added')
}

export function useMoveMember() {
  return useMemberMutation(({ member, chapterId }: { member: MemberRecord; chapterId: string }) => moveMember(member, chapterId), 'Moved')
}

export function useRemoveMember() {
  return useMemberMutation(({ memberId, block }: { memberId: string; block: boolean }) => removeMember(memberId, block), 'Removed')
}

export function useSetMemberPowers() {
  return useMemberMutation(({ memberId, powers }: { memberId: string; powers: Power[] }) => setMemberPowers(memberId, powers), 'Powers saved')
}
