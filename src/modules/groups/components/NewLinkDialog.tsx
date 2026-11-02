import { ConfirmDialog } from '@/components/shared'

interface NewLinkDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export function NewLinkDialog({ open, onOpenChange, onConfirm }: NewLinkDialogProps) {
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Make a new link?"
      description="The old link will stop working."
      confirmLabel="Make new link"
      onConfirm={onConfirm}
    />
  )
}
