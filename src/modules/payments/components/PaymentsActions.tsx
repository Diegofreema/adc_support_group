import { Link } from '@tanstack/react-router'
import { HandCoins, Landmark } from 'lucide-react'

import { buttonClassName, PendingGroupNote } from '@/components/shared'

/** "Paid offline?" (only leaders record those) + the main Pay button; neither until the group is verified. */
export function PaymentsActions({ canRecordOffline, locked }: { canRecordOffline: boolean; locked: boolean }) {
  if (locked) return <PendingGroupNote />
  return (
    <>
      {canRecordOffline && <Link to="/payments/offline" className={buttonClassName('secondary')}><Landmark className="i" aria-hidden />Paid offline?</Link>}
      <Link to="/payments/new" className={buttonClassName('primary')}><HandCoins className="i" aria-hidden />Pay</Link>
    </>
  )
}
