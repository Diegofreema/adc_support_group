import { useState } from 'react'

import { usePoints, useSendBroadcast } from './use-broadcast-data'
import { ALL } from '../../shared/constants/options'
import { placeLabel, recipientCount } from '../utils/audience'
import { smsPages, smsPoints } from '@/lib/sms'
import type { BroadcastDraft } from '../types'

const EMPTY: BroadcastDraft = { audience: 'leaders', state: ALL, category: ALL, group: '', channels: { app: true, sms: false }, text: '' }

/** Draft state + everything derived from it (recipients, pages, cost). */
export function useBroadcastComposer() {
  const [draft, setDraft] = useState<BroadcastDraft>(EMPTY)
  const balance = usePoints()
  const send = useSendBroadcast()
  const update = <K extends keyof BroadcastDraft>(key: K) => (value: BroadcastDraft[K]) => setDraft((current) => ({ ...current, [key]: value }))
  const recipients = recipientCount(draft)
  const pages = smsPages(draft.text)
  const cost = draft.channels.sms ? smsPoints(recipients, pages) : 0
  const hasChannel = draft.channels.app || draft.channels.sms
  const submit = () => send.mutate(
    { message: { text: draft.text, audience: draft.audience, place: placeLabel(draft), recipients, channels: draft.channels }, cost },
    { onSuccess: () => setDraft(EMPTY) },
  )
  return { draft, update, recipients, pages, cost, balance, enoughPoints: cost <= balance, canSend: Boolean(draft.text.trim()) && hasChannel, submit, sending: send.isPending }
}

export type BroadcastComposer = ReturnType<typeof useBroadcastComposer>
