import { Check, ImageIcon } from 'lucide-react'

import { Button, ChoiceList, KeyValueList, Modal } from '@/components/shared'
import { formatDay, formatNaira } from '@/lib/format'
import { toReasonOptions } from '../../shared/utils/reasons'
import type { OfflineCheck } from '../hooks/use-offline-check'
import { methodLabel, OFFLINE_REJECT_REASONS, purposeLabel } from '../utils/labels'
import type { Payment } from '@/types/domain'

function details(payment: Payment) {
  return [
    { label: 'Amount', value: formatNaira(payment.amount) },
    { label: 'For', value: purposeLabel(payment) },
    { label: 'How', value: methodLabel(payment.method) },
    { label: 'Reference', value: payment.reference },
    { label: 'Date', value: formatDay(payment.date) },
  ]
}

/** Proof + details; confirm, or switch to choosing a reject reason. */
export function OfflineCheckModal({ check }: { check: OfflineCheck }) {
  const payment = check.payment
  if (!payment) return null
  const rejecting = check.mode === 'reject'
  return (
    <Modal open onOpenChange={(open) => !open && check.close()} title={payment.groupName} actions={rejecting ? <RejectActions check={check} /> : <CheckActions check={check} />}>
      {rejecting
        ? <ChoiceList name="offline-reason" label="Reason" options={toReasonOptions(OFFLINE_REJECT_REASONS)} value={check.form.value.reason} onChange={check.form.setReason} />
        : <><ProofPlaceholder /><KeyValueList items={details(payment)} /></>}
    </Modal>
  )
}

function ProofPlaceholder() {
  return (
    <div className="dropzone mb-3 !cursor-default" aria-label="Proof of payment">
      <ImageIcon className="i i-lg" aria-hidden />
      <span className="small">Proof of payment</span>
    </div>
  )
}

function CheckActions({ check }: { check: OfflineCheck }) {
  return <><Button variant="danger" onClick={check.startReject}>Reject</Button><Button variant="primary" icon={Check} onClick={check.confirmPayment}>Confirm</Button></>
}

function RejectActions({ check }: { check: OfflineCheck }) {
  return <><Button onClick={check.close}>Cancel</Button><Button variant="danger-solid" disabled={!check.form.isValid} onClick={check.rejectPayment}>Reject</Button></>
}
