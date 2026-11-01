import { useState } from 'react'

import { Banner, Button, Field, Modal, TextInput } from '@/components/shared'

interface HandoverDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (newLeader: string) => void
  pending?: boolean
}

export function HandoverDialog({ open, onOpenChange, onSubmit, pending }: HandoverDialogProps) {
  const [newLeader, setNewLeader] = useState('')
  const actions = (
    <>
      <Button onClick={() => onOpenChange(false)}>Cancel</Button>
      <Button variant="danger-solid" disabled={!newLeader.trim() || pending} onClick={() => onSubmit(newLeader)}>Send request</Button>
    </>
  )
  return (
    <Modal open={open} onOpenChange={onOpenChange} title="Hand over leadership" actions={actions}>
      <Field label="New leader" htmlFor="handover-leader">
        <TextInput id="handover-leader" placeholder="Name or phone" value={newLeader} onChange={(event) => setNewLeader(event.target.value)} />
      </Field>
      <Banner tone="warn" className="mt-4">You stay leader until approved.</Banner>
    </Modal>
  )
}
