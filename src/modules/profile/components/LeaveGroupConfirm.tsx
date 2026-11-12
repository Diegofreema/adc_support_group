import { ConfirmDialog } from '@/components/shared'

interface LeaveGroupConfirmProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  groupName: string
  onConfirm: () => void
}

export function LeaveGroupConfirm({ open, onOpenChange, groupName, onConfirm }: LeaveGroupConfirmProps) {
  return (
    <ConfirmDialog
      open={open} onOpenChange={onOpenChange} title={`Leave ${groupName}?`} confirmLabel="Leave group" destructive onConfirm={onConfirm}
      description="You leave at once. Your past activities stay with the group."
    />
  )
}
