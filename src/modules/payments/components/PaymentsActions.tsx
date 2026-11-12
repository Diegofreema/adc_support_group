import { Link } from '@tanstack/react-router'
import { HandCoins, Landmark } from 'lucide-react'

import { buttonClassName } from '@/components/shared'

/** "Paid offline?" (only leaders record those) + the main Pay button. */
export function PaymentsActions({ canRecordOffline }: { canRecordOffline: boolean }) {
  return (
    <>
      {canRecordOffline && <Link to="/payments/offline" className={buttonClassName('secondary')}><Landmark className="i" aria-hidden />Paid offline?</Link>}
      <Link to="/payments/new" className={buttonClassName('primary')}><HandCoins className="i" aria-hidden />Pay</Link>
    </>
  )
}
