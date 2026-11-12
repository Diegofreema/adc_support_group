import { Banner } from '@/components/shared'
import type { PaymentCheck } from '../types'

interface PaymentCheckBannerProps {
  check?: PaymentCheck
  isChecking: boolean
  failed: boolean
}

/** What Funz said when the payer came back. */
export function PaymentCheckBanner({ check, isChecking, failed }: PaymentCheckBannerProps) {
  if (failed) return <Banner tone="warn" className="mb-4">We could not confirm this payment yet. It updates on its own soon.</Banner>
  if (!check) return isChecking ? <Banner className="mb-4">Checking with Funz…</Banner> : null
  if (check.status === 'paid') return <Banner tone="success" className="mb-4">Paid. Thank you.</Banner>
  if (check.status === 'failed') return <Banner tone="danger" className="mb-4">{check.expired ? 'This payment expired.' : 'This payment did not go through.'} You were not charged.</Banner>
  return <Banner className="mb-4">Your bank is still confirming. This page updates on its own.</Banner>
}
