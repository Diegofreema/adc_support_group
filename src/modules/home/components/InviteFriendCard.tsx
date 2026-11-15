import { Copy, Share2 } from 'lucide-react'

import { Button, Card, IconTile } from '@/components/shared'
import { useJoinLink } from '@/hooks/use-join-link'

export function InviteFriendCard({ code, groupName }: { code: string; groupName: string }) {
  const invite = useJoinLink(code, groupName)
  return (
    <Card className="row mt-4">
      <IconTile icon={Share2} />
      <span className="grow">
        <span className="bold block">Invite a friend</span>
        <span className="small muted">Share your group's link.</span>
      </span>
      <Button size="sm" icon={Copy} onClick={invite.copy}>Copy link</Button>
    </Card>
  )
}
