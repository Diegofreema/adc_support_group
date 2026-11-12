import { Tabs, type TabItem } from '@/components/shared'
import type { PaymentsTab } from '../types'

interface PaymentsTabsProps {
  value: PaymentsTab
  /** Counts are left off (undefined) until they have loaded, so no "0" flashes. */
  waiting?: number
  all?: number
  overLimit?: number
  onChange: (tab: PaymentsTab) => void
}

export function PaymentsTabs({ value, waiting, all, overLimit, onChange }: PaymentsTabsProps) {
  const tabs: TabItem<PaymentsTab>[] = [
    { value: 'to-confirm', label: 'To confirm', count: waiting },
    { value: 'all', label: 'All', count: all },
    { value: 'over-limit', label: 'Over the limit', count: overLimit },
    { value: 'by-cause', label: 'By cause' },
  ]
  return <Tabs label="Payments view" tabs={tabs} value={value} onChange={onChange} />
}
