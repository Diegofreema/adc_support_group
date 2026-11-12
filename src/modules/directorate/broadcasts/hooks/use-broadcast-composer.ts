import { useState } from 'react'

import { useSendBroadcast } from './use-broadcast-data'
import { useRecipientCount } from './use-broadcast-reach'
import { ALL } from '../../shared/constants/options'
import { useCategories, useCategoryOptions } from '../../shared/hooks/use-lookups'
import { audienceLabel } from '../utils/audience'
import { smsPages } from '@/lib/sms'
import type { BroadcastDraft } from '../types'

const EMPTY: BroadcastDraft = { audience: 'leaders', state: ALL, category: ALL, group: null, channel: 'free', text: '' }

/** Draft state + what's derived from it (who it goes to and how many, SMS pages). */
export function useBroadcastComposer() {
  const [draft, setDraft] = useState<BroadcastDraft>(EMPTY)
  const send = useSendBroadcast()
  const categories = useCategories()
  const categoryOptions = useCategoryOptions()
  const reach = useRecipientCount(draft)
  const update = <K extends keyof BroadcastDraft>(key: K) => (value: BroadcastDraft[K]) => setDraft((current) => ({ ...current, [key]: value }))
  const categoryName = categories.find((category) => category.id === draft.category)?.name
  const submit = () => send.mutate(draft, { onSuccess: () => setDraft(EMPTY) })
  const hasText = Boolean(draft.text.trim())
  return {
    draft, update, categoryOptions, reach, audience: audienceLabel(draft, categoryName), pages: smsPages(draft.text),
    hasText, canSend: hasText && reach.ready && !reach.empty, submit, sending: send.isPending,
  }
}

export type BroadcastComposer = ReturnType<typeof useBroadcastComposer>
