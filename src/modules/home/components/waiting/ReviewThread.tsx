import { useState, type FormEvent } from 'react'

import { Banner, Button, Card, CardHead, Field, TextArea } from '@/components/shared'
import { formatDateTime } from '@/lib/format'
import { cn } from '@/lib/utils'
import type { GroupReview, ReviewMessage } from '../../types/home.types'

interface ReviewThreadProps {
  review: GroupReview
  onReply: (message: string, done: () => void) => void
  sending: boolean
}

/** Messages with the Directorate, plus a reply box (highlighted when they asked something). */
export function ReviewThread({ review, onReply, sending }: ReviewThreadProps) {
  const [message, setMessage] = useState('')
  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (message.trim()) onReply(message, () => setMessage(''))
  }
  const asked = review.waitingForReply
  return (
    <Card className={cn('mt-6', asked && '!border-warning')}>
      <CardHead title="Messages with the Directorate" />
      {asked && <Banner tone="warn" title="The Directorate needs more information">Read their message and reply below.</Banner>}
      {review.messages.length === 0
        ? <p className="muted small mt-2">No messages yet. If the Directorate needs anything, it will show here.</p>
        : <ol className="mt-3 grid gap-3">{review.messages.map((item) => <MessageRow key={item.id} message={item} />)}</ol>}
      <form onSubmit={submit} noValidate className="mt-4">
        <Field label={asked ? 'Your reply' : 'Write to the Directorate'} htmlFor="review-reply" optional={!asked}>
          <TextArea id="review-reply" className="!min-h-[88px]" maxLength={2000} value={message} onChange={(event) => setMessage(event.target.value)} />
        </Field>
        <Button type="submit" variant={asked ? 'primary' : 'secondary'} block className="mt-3" disabled={sending || !message.trim()}>
          {sending ? 'Sending…' : 'Send reply'}
        </Button>
      </form>
    </Card>
  )
}

function MessageRow({ message }: { message: ReviewMessage }) {
  return (
    <li className={cn('rounded-md border border-line px-3.5 py-3', message.fromStaff ? 'bg-surface-muted' : 'bg-surface')}>
      <div className="row-between small">
        <b>{message.fromStaff ? 'The Directorate' : message.author}</b>
        <span className="faint">{formatDateTime(message.at)}</span>
      </div>
      <p className="mt-1 whitespace-pre-line">{message.body}</p>
    </li>
  )
}
