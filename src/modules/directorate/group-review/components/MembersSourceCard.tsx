import { Card, CardHead, HorizontalBars } from '@/components/shared'
import { formatNumber } from '@/lib/format'
import type { ReviewGroup } from '../types'

/** How members joined: link vs Excel upload (helps spot padded lists). */
export function MembersSourceCard({ group }: { group: ReviewGroup }) {
  const items = [
    { label: 'Join link', value: group.membersByLink },
    { label: 'Excel upload', value: group.membersByExcel },
  ]
  return (
    <Card className="mt-4">
      <CardHead title="Members" action={<span className="bold num">{formatNumber(group.memberCount)}</span>} />
      <HorizontalBars items={items} />
    </Card>
  )
}
