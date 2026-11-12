import { useState } from 'react'

import { canSend, needsPoints, recipientsFor, smsText, withChapterCount } from '../utils/compose'
import { smsCost } from '../utils/sms-cost'
import { useAudiences, useChapterAudiences, usePointsBalance, useSendMessage } from './use-messages'
import { formatNumber } from '@/lib/format'
import { notify } from '@/lib/toast'
import { useRequiredUser } from '@/stores/session-store'
import type { Audience, Channel } from '../types'

/** New message form: choices, live SMS cost, and send. */
export function useComposeMessage() {
  const user = useRequiredUser()
  const audienceOptions = useAudiences().data ?? []
  const chapters = useChapterAudiences().data ?? []
  const balance = usePointsBalance().data ?? 0
  const send = useSendMessage()
  const [audience, setAudience] = useState<Audience>('all')
  const [chapterId, setChapterId] = useState('')
  const [channel, setChannel] = useState<Channel>('free')
  const [body, setBody] = useState('')

  const chapter = chapters.find((candidate) => candidate.id === chapterId) ?? chapters[0]
  const recipients = recipientsFor(audienceOptions, audience, chapter)
  const cost = smsCost(smsText(user.activeGroupName, body), recipients, balance)

  const submit = () => {
    if (!canSend(body, recipients)) return notify(body.trim() ? 'Nobody to send to yet' : 'Type a message first', 'error')
    send.mutate({ audience, channel, body, chapterId: chapter?.id }, {
      onSuccess: (result) => { setBody(''); notify(`Sent to ${formatNumber(result.recipients)}`) },
    })
  }

  return {
    audiences: withChapterCount(audienceOptions, chapter), audience, setAudience,
    chapters, chapterId: chapter?.id ?? '', setChapterId,
    channel, setChannel, body, setBody,
    balance, cost, needsPoints: needsPoints(channel, cost), submit, isSending: send.isPending,
  }
}
