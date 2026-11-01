import { Link } from '@tanstack/react-router'
import { HandCoins, Landmark } from 'lucide-react'

import { buttonClassName } from '@/components/shared'

/** "Paid offline?" + the main Pay button. */
export function PaymentsActions() {
  return (
    <>
      <Link to="/payments/offline" className={buttonClassName('secondary')}><Landmark className="i" aria-hidden />Paid offline?</Link>
      <Link to="/payments/new" className={buttonClassName('primary')}><HandCoins className="i" aria-hidden />Pay</Link>
    </>
  )
}
