import { Dialog } from 'radix-ui'
import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface ModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: ReactNode
  /** Buttons row at the bottom. */
  actions?: ReactNode
  centered?: boolean
  children?: ReactNode
}

/** Accessible dialog (Radix) in the Ledger style. */
export function Modal({ open, onOpenChange, title, description, actions, centered, children }: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-backdrop open" />
        <Dialog.Content className={cn('dialog fixed left-1/2 top-1/2 z-[101] -translate-x-1/2 -translate-y-1/2 w-[calc(100%-32px)]', centered && 'center')}>
          <Dialog.Title className="h2">{title}</Dialog.Title>
          {description ? <Dialog.Description className="muted mt-1">{description}</Dialog.Description> : <Dialog.Description className="sr-only">{title}</Dialog.Description>}
          {children && <div className="mt-5">{children}</div>}
          {actions && <div className="dialog-actions">{actions}</div>}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
