import { Copy, Share2 } from 'lucide-react'

import { Button, Card, IconTile } from '@/components/shared'
import { useJoinLink } from '@/hooks/use-join-link'

export function InviteFriendCard({ code, groupName }: { code: string; groupName: string }) {
  const invite = useJoinLink(code, groupName)
  return (
    <Card className="row mt-4">
      <IconTile icon={Share2} />
      <span className="grow bold">Invite a friend</span>
      <Button size="sm" icon={Copy} onClick={invite.copy}>Copy link</Button>
    </Card>
  )
}
