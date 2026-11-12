import { Link } from '@tanstack/react-router'
import { Flag, Link as LinkIcon } from 'lucide-react'

import { Button, buttonClassName } from '@/components/shared'
import { useDisclosure } from '@/hooks/use-disclosure'
import { JoinLinkDialog } from './JoinLinkDialog'

/** Secondary ways in: join with a link, or register a new group. */
export function AuthEntryLinks() {
  const joinDialog = useDisclosure()
  return (
    <>
      <div className="row mt-8 !gap-2.5">
        <Button variant="secondary" block className="flex-1" icon={LinkIcon} onClick={joinDialog.open}>Join a group</Button>
        <Link to="/register" className={`${buttonClassName('secondary', 'md', true)} flex-1`}>
          <Flag className="i" aria-hidden />New group
        </Link>
      </div>
      <JoinLinkDialog open={joinDialog.isOpen} onOpenChange={joinDialog.setOpen} />
    </>
  )
}
