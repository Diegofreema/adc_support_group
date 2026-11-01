import { useState } from 'react'

import { useMakeExecutive, useMoveMember, useRemoveMember } from './use-member-mutations'
import type { MemberRecord } from '../types'

type ActiveDialog = 'details' | 'move' | 'remove'

/** Which member is open, which dialog is showing, and what each button does. */
export function useMemberActions() {
  const [member, setMember] = useState<MemberRecord | null>(null)
  const [dialog, setDialog] = useState<ActiveDialog | null>(null)
  const makeExecutive = useMakeExecutive()
  const move = useMoveMember()
  const remove = useRemoveMember()

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
    makeExecutive: (target: MemberRecord) => runAndClose(() => makeExecutive.mutate(target.id)),
    moveTo: (chapterId: string) => member && runAndClose(() => move.mutate({ memberId: member.id, chapterId })),
    confirmRemove: () => member && runAndClose(() => remove.mutate(member.id)),
  }
}

export type MemberActions = ReturnType<typeof useMemberActions>
