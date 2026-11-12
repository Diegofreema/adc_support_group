import { Send } from 'lucide-react'

import { EmptyState, IconTile, List, ListItem, SkeletonList, SkeletonRegion, Tag } from '@/components/shared'
import { formatDay, countLabel } from '@/lib/format'
import { useSentBroadcasts } from '../hooks/use-broadcast-data'
import type { SentBroadcast } from '../types'

const AUDIENCE_LABEL = { leaders: 'Leaders', members: 'Members' } as const

function meta(item: SentBroadcast): string {
  return [item.audience && AUDIENCE_LABEL[item.audience], item.state, countLabel(item.recipients, 'person', 'people'), formatDay(item.sentAt), item.status === 'failed' ? 'Failed' : undefined]
    .filter(Boolean).join(' · ')
}

export function SentBroadcastList() {
  const { sent, isLoading } = useSentBroadcasts()
  if (isLoading) return <SkeletonRegion label="Loading sent messages"><SkeletonList rows={5} /></SkeletonRegion>
  if (!sent.length) return <EmptyState icon={Send} title="Nothing sent yet" />
  return (
    <List>
      {sent.map((item) => (
        <ListItem key={item.id} leading={<IconTile icon={Send} tone="grey" />} title={item.text} meta={meta(item)} trailing={<Tag>{item.channel === 'sms' ? 'SMS' : 'App + email'}</Tag>} />
      ))}
    </List>
  )
}
