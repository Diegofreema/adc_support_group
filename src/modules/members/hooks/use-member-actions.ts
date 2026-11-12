import { useState } from 'react'

import { useMakeExecutive, useMoveMember, useRemoveMember, useSetMemberPowers } from './use-member-mutations'
import type { MemberRecord } from '../types'
import type { Power } from '@/types/domain'

type ActiveDialog = 'details' | 'move' | 'remove' | 'powers'

/** Which member is open, which dialog is showing, and what each button does. */
export function useMemberActions() {
  const [member, setMember] = useState<MemberRecord | null>(null)
  const [dialog, setDialog] = useState<ActiveDialog | null>(null)
  const makeExecutive = useMakeExecutive()
  const move = useMoveMember()
  const remove = useRemoveMember()
  const setPowers = useSetMemberPowers()

  const show = (next: ActiveDialog) => (target: MemberRecord) => {
    setMember(target)
    setDialog(next)
  }
  const close = () => setDialog(null)
  const runAndClose = (action: () => void) => {
    action()
    close()
  }

  return {
    member, dialog, close,
    open: show('details'),
    askMove: show('move'),
    askRemove: show('remove'),
    askPowers: show('powers'),
    makeExecutive: (target: MemberRecord) => runAndClose(() => makeExecutive.mutate(target)),
    moveTo: (chapterId: string) => member && runAndClose(() => move.mutate({ member, chapterId })),
    confirmRemove: (block: boolean) => member && runAndClose(() => remove.mutate({ memberId: member.id, block })),
    savePowers: (powers: Power[]) => member && runAndClose(() => setPowers.mutate({ memberId: member.id, powers })),
  }
}

export type MemberActions = ReturnType<typeof useMemberActions>
