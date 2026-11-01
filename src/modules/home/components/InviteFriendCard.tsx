import { Copy, Share2 } from 'lucide-react'

import { Button, Card, IconTile } from '@/components/shared'
import { useInviteLink } from '../hooks/use-invite-link'

export function InviteFriendCard({ code, groupName }: { code: string; groupName: string }) {
  const invite = useInviteLink(code, groupName)
  return (
    <Card className="row mt-4">
      <IconTile icon={Share2} />
      <span className="grow bold">Invite a friend</span>
      <Button size="sm" icon={Copy} onClick={invite.copyLink}>Copy link</Button>
    </Card>
  )
}
