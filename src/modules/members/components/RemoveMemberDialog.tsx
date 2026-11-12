import { useState } from 'react'

import { Checkbox, ConfirmDialog } from '@/components/shared'
import type { MemberRecord } from '../types'

interface RemoveMemberDialogProps {
  member: MemberRecord | null
  onClose: () => void
  onConfirm: (block: boolean) => void
}

export function RemoveMemberDialog({ member, onClose, onConfirm }: RemoveMemberDialogProps) {
  if (!member) return null
  return <RemoveMember key={member.id} member={member} onClose={onClose} onConfirm={onConfirm} />
}

function RemoveMember({ member, onClose, onConfirm }: { member: MemberRecord; onClose: () => void; onConfirm: (block: boolean) => void }) {
  const [block, setBlock] = useState(false)
  const firstName = member.fullName.split(' ')[0]
  return (
    <ConfirmDialog
      open
      onOpenChange={(open) => !open && onClose()}
      title={`Remove ${firstName}?`}
      description="Their account stays. They leave this group."
      confirmLabel={block ? 'Remove and block' : 'Remove'}
      destructive
      onConfirm={() => onConfirm(block)}
    >
      <Checkbox checked={block} onChange={(event) => setBlock(event.target.checked)}>
        Don't let them rejoin (they won't be told they're blocked)
      </Checkbox>
    </ConfirmDialog>
  )
}
