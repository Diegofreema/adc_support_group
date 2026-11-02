import { ConfirmDialog } from '@/components/shared'
import type { MemberRecord } from '../types'

interface RemoveMemberDialogProps {
  member: MemberRecord | null
  onClose: () => void
  onConfirm: () => void
}

export function RemoveMemberDialog({ member, onClose, onConfirm }: RemoveMemberDialogProps) {
  if (!member) return null
  const firstName = member.fullName.split(' ')[0]
  return (
    <ConfirmDialog
      open
      onOpenChange={(open) => !open && onClose()}
      title={`Remove ${firstName}?`}
      description="Their account stays. They leave this group."
      confirmLabel="Remove"
      destructive
      onConfirm={onConfirm}
    />
  )
}
