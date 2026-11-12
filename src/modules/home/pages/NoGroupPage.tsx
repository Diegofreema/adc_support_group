import { Link } from '@tanstack/react-router'
import { Flag, Link as LinkIcon, UsersRound } from 'lucide-react'

import { Button, buttonClassName, Card, IconTile } from '@/components/shared'
import { useDisclosure } from '@/hooks/use-disclosure'
import { JoinLinkDialog } from '@/modules/auth'

/** Signed in, but not in any group (left, removed, or never joined). */
export function NoGroupPage() {
  const joinDialog = useDisclosure()
  return (
    <Card className="mx-auto mt-6 max-w-[560px]">
      <IconTile icon={UsersRound} tone="grey" />
      <h1 className="h1 mt-4">You're not in a group yet</h1>
      <p className="muted mt-2">Open the invite link a leader sent you, or register your own group for the Directorate to check.</p>
      <div className="mt-6 grid gap-2.5">
        <Button variant="primary" block icon={LinkIcon} onClick={joinDialog.open}>Open an invite link</Button>
        <Link to="/register" className={buttonClassName('secondary', 'md', true)}>
          <Flag className="i" aria-hidden />Register a group
        </Link>
      </div>
      <JoinLinkDialog open={joinDialog.isOpen} onOpenChange={joinDialog.setOpen} />
    </Card>
  )
}
