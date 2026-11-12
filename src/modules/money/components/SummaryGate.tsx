import type { ReactNode } from 'react'

import { ErrorState, PageLoader } from '@/components/shared'
import { useMoneySummary } from '../hooks/use-money-summary'
import type { MoneySummary } from '../types'

/** Loads the money summary, then renders the screen with it. */
export function SummaryGate({ children }: { children: (summary: MoneySummary) => ReactNode }) {
  const { summary, error, retry } = useMoneySummary()
  if (error) return <ErrorState title="Could not load the money" error={error} onRetry={retry} />
  if (!summary) return <PageLoader />
  return <>{children(summary)}</>
}
