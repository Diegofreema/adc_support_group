import { Send } from 'lucide-react'

import { Banner, Button, Card, CardHead, TextArea } from '@/components/shared'
import { formatDateTime } from '@/lib/format'
import { cn } from '@/lib/utils'
import { useAskInfoFlow } from '../hooks/use-decision-flows'
import type { ReviewGroup, ReviewMessage } from '../types'

export const ASK_INFO_INPUT_ID = 'ask-info'

function MessageBubble({ message }: { message: ReviewMessage }) {
  return (
    <li className={cn('max-w-[85%] rounded-lg border border-line px-3 py-2', message.fromStaff ? 'ml-auto bg-surface-muted' : 'mr-auto bg-primary-soft')}>
      <p className="tiny faint">{message.authorName} · {formatDateTime(message.createdAt)}</p>
      <p className="small mt-1 whitespace-pre-wrap">{message.body}</p>
    </li>
  )
}

/** The Directorate ↔ leader conversation, with "Ask for info" as the composer. */
export function ReviewThreadCard({ group }: { group: ReviewGroup }) {
  const ask = useAskInfoFlow(group.id)
  const last = group.messages.at(-1)
  const canAsk = group.status === 'pending' || group.status === 'rejected'
  if (!group.messages.length && !canAsk) return null
  return (
    <Card className="mt-4">
      <CardHead title="Messages with the leader" />
      {last && !last.fromStaff && <Banner tone="success" className="mb-3" title="Leader replied">{formatDateTime(last.createdAt)}</Banner>}
      {group.messages.length
        ? <ul className="stack [--stack:8px]">{group.messages.map((message) => <MessageBubble key={message.id} message={message} />)}</ul>
        : <p className="faint small">No messages yet.</p>}
      {canAsk && (
        <form className="mt-4" onSubmit={(event) => { event.preventDefault(); if (ask.canSend) ask.submit() }}>
          <TextArea
            id={ASK_INFO_INPUT_ID} aria-label="Ask for info" placeholder="e.g. Send your CAC certificate"
            value={ask.message} onChange={(event) => ask.setMessage(event.target.value)}
          />
          <Button type="submit" icon={Send} className="mt-2" disabled={!ask.canSend || ask.isSending}>Ask for info</Button>
        </form>
      )}
    </Card>
  )
}
