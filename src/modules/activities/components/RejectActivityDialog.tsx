import { useState } from 'react'

import { Button, ChoiceList, Field, Modal, TextArea } from '@/components/shared'
import { REJECT_REASONS } from '../utils/reject-reasons'
import type { RejectInput, RejectReasonId } from '../types'

interface RejectActivityDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (input: RejectInput) => void
}

/** Pick why an activity goes back to the person who recorded it. */
export function RejectActivityDialog({ open, onOpenChange, onConfirm }: RejectActivityDialogProps) {
  const [reason, setReason] = useState<RejectReasonId>('unclear-photos')
  const [note, setNote] = useState('')
  const actions = (
    <>
      <Button onClick={() => onOpenChange(false)}>Cancel</Button>
      <Button variant="danger-solid" onClick={() => onConfirm({ reason, note: note.trim() || undefined })}>Send back</Button>
    </>
  )
  return (
    <Modal open={open} onOpenChange={onOpenChange} title="Send back" description="Tell them what to fix." actions={actions}>
      <ChoiceList name="reject-reason" label="Reason" options={REJECT_REASONS} value={reason} onChange={setReason} />
      <Field label="Note" htmlFor="reject-note" optional className="mt-4">
        <TextArea id="reject-note" value={note} onChange={(event) => setNote(event.target.value)} rows={3} />
      </Field>
    </Modal>
  )
}
