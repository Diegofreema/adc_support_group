import type { MemberActions } from '../hooks/use-member-actions'
import type { ChapterOption } from '../types'
import { MemberDialog } from './MemberDialog'
import { MoveChapterDialog } from './MoveChapterDialog'
import { RemoveMemberDialog } from './RemoveMemberDialog'

/** Renders whichever member dialog is active. */
export function MemberDialogs({ actions, chapters }: { actions: MemberActions; chapters: ChapterOption[] }) {
  const { member, dialog, close } = actions
  return (
    <>
      <MemberDialog
        member={dialog === 'details' ? member : null}
        onClose={close}
        onMakeExecutive={actions.makeExecutive}
        onMove={actions.askMove}
        onRemove={actions.askRemove}
      />
      <MoveChapterDialog key={member?.id} member={dialog === 'move' ? member : null} chapters={chapters} onClose={close} onMove={actions.moveTo} />
      <RemoveMemberDialog member={dialog === 'remove' ? member : null} onClose={close} onConfirm={actions.confirmRemove} />
    </>
  )
}
