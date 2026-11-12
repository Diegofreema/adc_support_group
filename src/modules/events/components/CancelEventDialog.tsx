import { useState } from 'react'

import { Button, Field, Modal, TextArea } from '@/components/shared'

interface CancelEventDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  busy?: boolean
  onConfirm: (reason: string) => void
}

/** Why it's off; everyone coming gets this reason. */
export function CancelEventDialog({ open, onOpenChange, busy, onConfirm }: CancelEventDialogProps) {
  const [reason, setReason] = useState('')
  const ready = reason.trim().length > 0
  const actions = (
    <>
      <Button onClick={() => onOpenChange(false)}>Back</Button>
      <Button variant="danger-solid" disabled={!ready || busy} onClick={() => onConfirm(reason.trim())}>{busy ? 'Wait…' : 'Cancel event'}</Button>
    </>
  )
  return (
    <Modal open={open} onOpenChange={onOpenChange} title="Cancel this event?" description="People coming will get your reason." actions={actions}>
      <Field label="Reason" htmlFor="event-cancel-reason">
        <TextArea id="event-cancel-reason" rows={3} value={reason} placeholder="e.g. Moved to next week" onChange={(event) => setReason(event.target.value)} />
      </Field>
    </Modal>
  )
}
