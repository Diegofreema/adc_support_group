import { Link } from '@tanstack/react-router'

import { Modal, ResultHeader, buttonClassName } from '@/components/shared'
import { formatNaira } from '@/lib/format'
import type { Payment } from '@/types/domain'

/** Shown after Funz confirms the payment. */
export function PaymentSuccessDialog({ payment }: { payment?: Payment }) {
  if (!payment) return null
  return (
    <Modal open onOpenChange={() => undefined} title="Paid" centered>
      <ResultHeader title={formatNaira(payment.amount)} subtitle={<span className="num">{payment.reference}</span>} />
      <div className="dialog-actions">
        <Link to="/payments" className={buttonClassName('secondary')}>Done</Link>
        <Link to="/payments/$paymentId" params={{ paymentId: payment.id }} className={buttonClassName('primary')}>View receipt</Link>
      </div>
    </Modal>
  )
}
