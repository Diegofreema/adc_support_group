import { ArrowDownLeft, ArrowUpRight, ListChecks, UserCheck } from 'lucide-react'

import { QuickActions, type QuickAction } from '@/components/shared'
import type { MoneySummary } from '../types'

function actionsFor(summary: MoneySummary): QuickAction[] {
  const duesOn = summary.dues.enabled
  const actions: (QuickAction | false)[] = [
    summary.canManage && duesOn && { label: 'Record dues', icon: UserCheck, to: '/money/dues/new' },
    summary.canManage && { label: 'Record income', icon: ArrowDownLeft, to: '/money/income/new' },
    summary.canManage && { label: 'Record expense', icon: ArrowUpRight, to: '/money/expense/new' },
    summary.canManage && duesOn && { label: "Who hasn't paid", icon: ListChecks, to: '/money/dues-status' },
  ]
  return actions.filter((action): action is QuickAction => Boolean(action))
}

/** Treasurer shortcuts, most used first; nothing for members. Dues settings (rare) live on the My dues card. */
export function MoneyActions({ summary }: { summary: MoneySummary }) {
  const actions = actionsFor(summary)
  if (actions.length === 0) return null
  return <div className="mt-4"><QuickActions actions={actions} /></div>
}
