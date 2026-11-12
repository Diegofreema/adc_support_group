import { ConfirmDialog } from '@/components/shared'

interface DeleteDetailsConfirmProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

/** Plain words: what goes, when, and that it can be cancelled. */
export function DeleteDetailsConfirm({ open, onOpenChange, onConfirm }: DeleteDetailsConfirmProps) {
  return (
    <ConfirmDialog open={open} onOpenChange={onOpenChange} title="Delete my details?" confirmLabel="Delete my details" destructive onConfirm={onConfirm}>
      <ul className="small list-disc pl-5 grid gap-1">
        <li>In 7 days, your name, phone and email are deleted.</li>
        <li>After that, you can't log in to ADC or Rise Up Naija.</li>
        <li>Your group keeps your activities as "Former member".</li>
        <li>You can cancel before then.</li>
      </ul>
    </ConfirmDialog>
  )
}
