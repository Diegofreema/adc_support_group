import { AlertDialog } from 'radix-ui'
import type { ReactNode } from 'react'

import { buttonClassName } from '../actions/button-class'

interface ConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: ReactNode
  confirmLabel: string
  cancelLabel?: string
  /** Red confirm button for destructive actions. */
  destructive?: boolean
  onConfirm: () => void
  children?: ReactNode
}

/** "Are you sure?" dialog. Never use window.confirm. */
export function ConfirmDialog({ open, onOpenChange, title, description, confirmLabel, cancelLabel = 'Cancel', destructive, onConfirm, children }: ConfirmDialogProps) {
  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="dialog-backdrop open" />
        <AlertDialog.Content className="dialog fixed left-1/2 top-1/2 z-[101] -translate-x-1/2 -translate-y-1/2 w-[calc(100%-32px)]">
          <AlertDialog.Title className="h2">{title}</AlertDialog.Title>
          {description && <AlertDialog.Description className="muted mt-1">{description}</AlertDialog.Description>}
          {children && <div className="mt-5">{children}</div>}
          <div className="dialog-actions">
            <AlertDialog.Cancel className={buttonClassName('secondary')}>{cancelLabel}</AlertDialog.Cancel>
            <AlertDialog.Action className={buttonClassName(destructive ? 'danger-solid' : 'primary')} onClick={onConfirm}>{confirmLabel}</AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
