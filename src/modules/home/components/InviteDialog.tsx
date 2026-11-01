import { Copy, MessageCircle } from 'lucide-react'

import { Button, buttonClassName, Modal, QrCode } from '@/components/shared'
import { useInviteLink } from '../hooks/use-invite-link'

interface InviteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  code: string
  groupName: string
}

/** QR + link to share the group's join page. */
export function InviteDialog({ open, onOpenChange, code, groupName }: InviteDialogProps) {
  const invite = useInviteLink(code, groupName)
  return (
    <Modal open={open} onOpenChange={onOpenChange} title="Invite people" centered>
      <div className="flex justify-center"><QrCode value={invite.link} /></div>
      <p className="muted small mt-4 truncate">{invite.link}</p>
      <div className="mt-4 grid grid-cols-2 gap-2.5">
        <Button icon={Copy} onClick={invite.copyLink}>Copy</Button>
        <a className={buttonClassName('primary')} href={invite.whatsappUrl} target="_blank" rel="noreferrer">
          <MessageCircle className="i" aria-hidden />WhatsApp
        </a>
      </div>
      <Button variant="ghost" block className="mt-2" onClick={() => onOpenChange(false)}>Close</Button>
    </Modal>
  )
}
