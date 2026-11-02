import { useState } from 'react'

import { Button, Field, Modal, TextInput } from '@/components/shared'

interface ChangeCoordinatorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (coordinator: string) => void
}

export function ChangeCoordinatorDialog({ open, onOpenChange, onSubmit }: ChangeCoordinatorDialogProps) {
  const [coordinator, setCoordinator] = useState('')
  const actions = (
    <>
      <Button onClick={() => onOpenChange(false)}>Cancel</Button>
      <Button variant="primary" disabled={!coordinator.trim()} onClick={() => onSubmit(coordinator)}>Change</Button>
    </>
  )
  return (
    <Modal open={open} onOpenChange={onOpenChange} title="Change coordinator" actions={actions}>
      <Field label="New coordinator" htmlFor="cc-person">
        <TextInput id="cc-person" placeholder="Name or phone" value={coordinator} onChange={(event) => setCoordinator(event.target.value)} />
      </Field>
    </Modal>
  )
}
