import { notify } from '@/lib/toast'
import { formatNaira } from '@/lib/format'
import type { Payment } from '@/types/domain'

function receiptText(payment: Payment): string {
  return `ADC Support Groups receipt ${payment.reference}: ${formatNaira(payment.amount)} from ${payment.groupName}`
}

/** Share uses the phone's share sheet when available; download uses print-to-PDF. */
export function useReceiptActions(payment: Payment | undefined) {
  const share = async () => {
    if (!payment) return
    if (navigator.share) await navigator.share({ title: 'Receipt', text: receiptText(payment) }).catch(() => undefined)
    else { await navigator.clipboard.writeText(receiptText(payment)); notify('Copied') }
  }
  return { share: () => void share(), download: () => window.print() }
}
