import { Button, ChoiceList, Field, Modal, TextArea } from '@/components/shared'
import type { ReasonForm } from '../hooks/use-reason-form'
import { reasonMessage, toReasonOptions, type ReasonChoice } from '../utils/reasons'

interface ReasonModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  reasons: readonly ReasonChoice[]
  form: ReasonForm
  confirmLabel: string
  onConfirm: () => void
  /** Show what the other side will read. */
  showPreview?: boolean
}

/** Pick a reason + optional note, used for every reject/overturn decision. */
export function ReasonModal({ open, onOpenChange, title, reasons, form, confirmLabel, onConfirm, showPreview }: ReasonModalProps) {
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      actions={
        <>
          <Button onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button variant="danger-solid" disabled={!form.isValid} onClick={onConfirm}>{confirmLabel}</Button>
        </>
      }
    >
      <ChoiceList name="reason" label="Reason" options={toReasonOptions(reasons)} value={form.value.reason} onChange={form.setReason} />
      <Field label="Note" htmlFor="reason-note" optional className="mt-4">
        <TextArea id="reason-note" value={form.value.note} onChange={(event) => form.setNote(event.target.value)} />
      </Field>
      {showPreview && form.isValid && <MessagePreview text={reasonMessage(reasons, form.value)} />}
    </Modal>
  )
}

function MessagePreview({ text }: { text: string }) {
  return (
    <div className="mt-4">
      <span className="eyebrow">They will read</span>
      <p className="reason mt-2">{text}</p>
    </div>
  )
}
