import { FileCheck } from 'lucide-react'

import { Card, CardHead, KeyValueList, type KeyValue } from '@/components/shared'
import { formatDateTime } from '@/lib/format'
import { groupPlace } from '../utils/group-filters'
import type { ReviewGroup } from '../types'

const LEVEL_LABEL: Record<ReviewGroup['level'], string> = { national: 'National', state: 'State', lga: 'LGA', ward: 'Ward', abroad: 'Abroad' }

function detailRows(group: ReviewGroup): KeyValue[] {
  return [
    { label: 'Category', value: group.category },
    { label: 'Level', value: LEVEL_LABEL[group.level] },
    { label: 'Location', value: groupPlace(group) },
    { label: 'CAC', value: group.cacNumber ? <CacChip number={group.cacNumber} /> : 'None' },
    { label: 'Sent', value: formatDateTime(group.submittedAt) },
  ]
}

function CacChip({ number }: { number: string }) {
  return <span className="chip chip-verified"><FileCheck className="i" aria-hidden />{number}</span>
}

export function GroupDetailsCard({ group }: { group: ReviewGroup }) {
  return (
    <Card className="mt-4">
      <CardHead title="Details" />
      <KeyValueList items={detailRows(group)} />
    </Card>
  )
}
