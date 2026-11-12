import { useState } from 'react'

import { Banner, PageHeader, Tabs, type TabItem } from '@/components/shared'
import { ComposeMessage } from '../components/ComposeMessage'
import { SentMessageList } from '../components/SentMessageList'
import { useSentMessages } from '../hooks/use-messages'
import { usePurchaseReturn } from '../hooks/use-purchase-return'
import type { MessagesTab } from '../types'

export function MessagesPage() {
  const sent = useSentMessages().data ?? []
  const purchase = usePurchaseReturn()
  const [tab, setTab] = useState<MessagesTab>('new')
  const tabs: TabItem<MessagesTab>[] = [{ value: 'new', label: 'New' }, { value: 'sent', label: 'Sent', count: sent.length }]
  return (
    <>
      <PageHeader title="Messages" actions={<Tabs tabs={tabs} value={tab} onChange={setTab} label="Messages" />} />
      {purchase.checking && <Banner className="mb-4">Checking your payment…</Banner>}
      {tab === 'new' ? <ComposeMessage /> : <SentMessageList messages={sent} />}
    </>
  )
}
