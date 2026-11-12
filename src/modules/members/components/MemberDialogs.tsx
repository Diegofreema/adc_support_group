import type { MemberActions } from '../hooks/use-member-actions'
import type { ChapterOption } from '../types'
import type { User } from '@/types/domain'
import { MemberDialog } from './MemberDialog'
import { MoveChapterDialog } from './MoveChapterDialog'
import { PowersDialog } from './PowersDialog'
import { RemoveMemberDialog } from './RemoveMemberDialog'

interface MemberDialogsProps {
  actions: MemberActions
  chapters: ChapterOption[]
  viewer: User
}

/** Renders whichever member dialog is active. */
export function MemberDialogs({ actions, chapters, viewer }: MemberDialogsProps) {
  const { member, dialog, close } = actions
  return (
    <>
      <MemberDialog
        member={dialog === 'details' ? member : null}
        viewer={viewer}
        onClose={close}
        onMakeExecutive={actions.makeExecutive}
        onMove={actions.askMove}
        onPowers={actions.askPowers}
        onRemove={actions.askRemove}
      />
      <MoveChapterDialog key={member?.id} member={dialog === 'move' ? member : null} chapters={chapters} onClose={close} onMove={actions.moveTo} />
      <PowersDialog key={`powers-${member?.id}`} member={dialog === 'powers' ? member : null} onClose={close} onSave={actions.savePowers} />
      <RemoveMemberDialog member={dialog === 'remove' ? member : null} onClose={close} onConfirm={actions.confirmRemove} />
    </>
  )
}
