import { Send } from 'lucide-react'

import { EmptyState, IconTile, List, ListItem, Tag } from '@/components/shared'
import { formatDay, formatNumber } from '@/lib/format'
import { useSentBroadcasts } from '../hooks/use-broadcast-data'
import type { SentBroadcast } from '../types'

const AUDIENCE_LABEL = { leaders: 'Leaders', members: 'Members' } as const

function meta(item: SentBroadcast): string {
  return [item.audience && AUDIENCE_LABEL[item.audience], `${formatNumber(item.recipients)} people`, formatDay(item.sentAt), item.status === 'failed' ? 'Failed' : undefined]
    .filter(Boolean).join(' · ')
}

export function SentBroadcastList() {
  const sent = useSentBroadcasts()
  if (!sent.length) return <EmptyState icon={Send} title="Nothing sent yet" />
  return (
    <List>
      {sent.map((item) => (
        <ListItem key={item.id} leading={<IconTile icon={Send} tone="grey" />} title={item.text} meta={meta(item)} trailing={<Tag>{item.channel === 'sms' ? 'SMS' : 'App + email'}</Tag>} />
      ))}
    </List>
  )
}
