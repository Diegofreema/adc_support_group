import { useState } from 'react'

import { PageHeader, Tabs, type TabItem } from '@/components/shared'
import { ComposeMessage } from '../components/ComposeMessage'
import { SentMessageList } from '../components/SentMessageList'
import { useSentMessages } from '../hooks/use-messages'
import type { MessagesTab } from '../types'

export function MessagesPage() {
  const sent = useSentMessages().data ?? []
  const [tab, setTab] = useState<MessagesTab>('new')
  const tabs: TabItem<MessagesTab>[] = [{ value: 'new', label: 'New' }, { value: 'sent', label: 'Sent', count: sent.length }]
  return (
    <>
      <PageHeader title="Messages" actions={<Tabs tabs={tabs} value={tab} onChange={setTab} label="Messages" />} />
      {tab === 'new' ? <ComposeMessage /> : <SentMessageList messages={sent} />}
    </>
  )
}
