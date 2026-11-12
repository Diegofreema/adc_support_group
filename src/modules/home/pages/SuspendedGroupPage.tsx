import { Ban } from 'lucide-react'

import { Banner, Card, IconTile, PageLoader } from '@/components/shared'
import { useGroupNotice } from '../hooks/use-group-review'

/** A suspended group: say so clearly, with the Directorate's reason. */
export function SuspendedGroupPage({ isLeader }: { isLeader: boolean }) {
  const { data } = useGroupNotice()
  if (data === undefined) return <PageLoader />
  return (
    <Card className="mx-auto mt-6 max-w-[560px]">
      <IconTile icon={Ban} tone="red" />
      <h1 className="h1 mt-4">{data?.name ?? 'Your group'} is suspended</h1>
      <p className="muted mt-2">
        {isLeader
          ? 'The Directorate has paused this group. Activities, payments, invites and messages are closed until it is reinstated.'
          : 'The Directorate has paused this group for now. Your record is kept; you will be told when it is back.'}
      </p>
      {data?.reason && <Banner tone="danger" title="Reason" className="mt-4">{data.reason}</Banner>}
    </Card>
  )
}
