import { ArrowRightLeft, Crown, KeyRound, UserMinus } from 'lucide-react'

import { Button, Modal } from '@/components/shared'
import type { User } from '@/types/domain'
import type { MemberRecord } from '../types'
import { memberPermissions } from '../utils/powers'
import { MemberDetails } from './MemberDetails'

interface MemberDialogProps {
  member: MemberRecord | null
  viewer: User
  onClose: () => void
  onMakeExecutive: (member: MemberRecord) => void
  onMove: (member: MemberRecord) => void
  onPowers: (member: MemberRecord) => void
  onRemove: (member: MemberRecord) => void
}

/** Member card with what the viewer may do to them. */
export function MemberDialog({ member, viewer, onClose, onMakeExecutive, onMove, onPowers, onRemove }: MemberDialogProps) {
  if (!member) return null
  const can = memberPermissions(viewer, member)
  return (
    <Modal open onOpenChange={(open) => !open && onClose()} title="Member">
      <MemberDetails member={member} />
      <div className="grid mt-4">
        {can.canMakeExecutive && <Button block icon={Crown} onClick={() => onMakeExecutive(member)}>Make executive</Button>}
        {can.canEditPowers && <Button block icon={KeyRound} onClick={() => onPowers(member)}>Powers</Button>}
        {can.canMove && <Button block icon={ArrowRightLeft} onClick={() => onMove(member)}>Move chapter</Button>}
        {can.canRemove && <Button block variant="danger" icon={UserMinus} onClick={() => onRemove(member)}>Remove</Button>}
      </div>
      <Button variant="ghost" block className="mt-2" onClick={onClose}>Close</Button>
    </Modal>
  )
}
