import { StatGrid } from '@/components/shared'
import { formatNumber } from '@/lib/format'

interface ImportCountsProps {
  items: { label: string; value: number; tone?: 'green' | 'red' }[]
}

/** Three-up count row (rows/ready/errors or new/linked/not added). */
export function ImportCounts({ items }: ImportCountsProps) {
  const stats = items.map((item) => ({ label: item.label, value: <span className={item.tone}>{formatNumber(item.value)}</span> }))
  return <StatGrid stats={stats} columns={3} />
}
