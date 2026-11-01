import { Mail, MessageSquare, Send } from 'lucide-react'

import { EmptyState, IconTile, List, ListItem } from '@/components/shared'
import { formatDay, formatNumber } from '@/lib/format'
import { CHANNEL_LABEL } from '../utils/channels'
import type { SentMessage } from '../types'

export function SentMessageList({ messages }: { messages: SentMessage[] }) {
  if (messages.length === 0) return <EmptyState icon={Send} title="Nothing sent yet" />
  return (
    <List>
      {messages.map((message) => (
        <ListItem
          key={message.id}
          leading={<IconTile icon={message.channel === 'sms' ? MessageSquare : Mail} tone="grey" />}
          title={message.subject}
          meta={`${message.audienceLabel} · ${CHANNEL_LABEL[message.channel]} · ${formatDay(message.sentAt)}`}
          trailing={<span className="faint small num">{formatNumber(message.recipients)}</span>}
        />
      ))}
    </List>
  )
}
