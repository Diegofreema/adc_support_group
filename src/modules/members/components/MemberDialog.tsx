import { ArrowRightLeft, Crown, UserMinus } from 'lucide-react'

import { Button, Modal } from '@/components/shared'
import type { MemberRecord } from '../types'
import { MemberDetails } from './MemberDetails'

interface MemberDialogProps {
  member: MemberRecord | null
  onClose: () => void
  onMakeExecutive: (member: MemberRecord) => void
  onMove: (member: MemberRecord) => void
  onRemove: (member: MemberRecord) => void
}

/** Member card with the three things a leader can do. */
export function MemberDialog({ member, onClose, onMakeExecutive, onMove, onRemove }: MemberDialogProps) {
  if (!member) return null
  const isExecutive = member.role === 'leader' || member.role === 'executive'
  return (
    <Modal open onOpenChange={(open) => !open && onClose()} title="Member">
      <MemberDetails member={member} />
      <div className="grid mt-4">
        {!isExecutive && <Button block icon={Crown} onClick={() => onMakeExecutive(member)}>Make executive</Button>}
        <Button block icon={ArrowRightLeft} onClick={() => onMove(member)}>Move chapter</Button>
        {member.role !== 'leader' && <Button block variant="danger" icon={UserMinus} onClick={() => onRemove(member)}>Remove</Button>}
      </div>
      <Button variant="ghost" block className="mt-2" onClick={onClose}>Close</Button>
    </Modal>
  )
}
