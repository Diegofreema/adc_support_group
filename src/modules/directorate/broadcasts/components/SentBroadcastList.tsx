import { Send } from 'lucide-react'

import { EmptyState, IconTile, List, ListItem, Tag } from '@/components/shared'
import { formatDay, formatNumber } from '@/lib/format'
import { useSentBroadcasts } from '../hooks/use-broadcast-data'
import type { SentBroadcast } from '../types'

function meta(item: SentBroadcast): string {
  return [item.audience === 'leaders' ? 'Leaders' : 'Members', item.place, formatNumber(item.recipients), formatDay(item.sentAt)].join(' · ')
}

export function SentBroadcastList() {
  const sent = useSentBroadcasts()
  if (!sent.length) return <EmptyState icon={Send} title="Nothing sent yet" />
  return (
    <List>
      {sent.map((item) => (
        <ListItem key={item.id} leading={<IconTile icon={Send} tone="grey" />} title={item.text} meta={meta(item)} trailing={<Tag>{item.channels.sms ? 'SMS' : 'App'}</Tag>} />
      ))}
    </List>
  )
}
