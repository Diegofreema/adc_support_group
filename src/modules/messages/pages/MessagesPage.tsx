import { useState } from 'react'

import { Banner, ErrorState, PageHeader, PendingGroupNote, Tabs, type TabItem } from '@/components/shared'
import { useGroupLocked } from '@/hooks/use-group-verified'
import { ComposeMessage } from '../components/ComposeMessage'
import { SentMessageList } from '../components/SentMessageList'
import { useSentMessages } from '../hooks/use-messages'
import { usePurchaseReturn } from '../hooks/use-purchase-return'
import type { MessagesTab } from '../types'
import { loadFailure } from '@/hooks/load-failure'

export function MessagesPage() {
  const sentQuery = useSentMessages()
  const sent = sentQuery.data ?? []
  const sentFailure = loadFailure(sentQuery)
  const purchase = usePurchaseReturn()
  const locked = useGroupLocked()
  const [tab, setTab] = useState<MessagesTab>('new')
  const tabs: TabItem<MessagesTab>[] = [{ value: 'new', label: 'New' }, { value: 'sent', label: 'Sent', count: sent.length }]
  return (
    <>
      <PageHeader title="Messages" actions={<Tabs tabs={tabs} value={tab} onChange={setTab} label="Messages" />} />
      {purchase.checking && <Banner className="mb-4">Checking your payment…</Banner>}
      {tab === 'sent' && (sentFailure.error ? <ErrorState title="Couldn't load sent messages" error={sentFailure.error} onRetry={sentFailure.retry} /> : <SentMessageList messages={sent} />)}
      {tab === 'new' && (locked ? <PendingGroupNote /> : <ComposeMessage />)}
    </>
  )
}
