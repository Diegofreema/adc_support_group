import { useState } from 'react'

import { PageHeader, Tabs } from '@/components/shared'
import { ComposeBroadcast } from '../components/ComposeBroadcast'
import { SentBroadcastList } from '../components/SentBroadcastList'
import { useSentBroadcasts } from '../hooks/use-broadcast-data'

type BroadcastTab = 'new' | 'sent'

export function BroadcastsPage() {
  const [tab, setTab] = useState<BroadcastTab>('new')
  const sentCount = useSentBroadcasts().length
  return (
    <>
      <PageHeader title="Messages" />
      <Tabs label="Messages" tabs={[{ value: 'new', label: 'New' }, { value: 'sent', label: 'Sent', count: sentCount }]} value={tab} onChange={setTab} />
      <div className="mt-4">{tab === 'new' ? <ComposeBroadcast /> : <SentBroadcastList />}</div>
    </>
  )
}
