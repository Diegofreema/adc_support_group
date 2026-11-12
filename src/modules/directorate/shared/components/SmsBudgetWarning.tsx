import { useQuery } from '@tanstack/react-query'

import { Banner } from '@/components/shared'
import { smsBudgetQuery } from '../services/admin-settings'

/** Shown to staff when this month's SMS budget for important messages is used up. */
export function SmsBudgetWarning({ className }: { className?: string }) {
  const { data: budget } = useQuery(smsBudgetQuery)
  if (!budget || budget.left > 0) return null
  return (
    <Banner tone="warn" title="SMS budget used up" className={className}>
      Important messages to people without email are in-app only until next month or until the budget is raised.
    </Banner>
  )
}
