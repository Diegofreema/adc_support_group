import { Button, Modal, QrCode, ShareLinkButtons } from '@/components/shared'
import { useJoinLink } from '@/hooks/use-join-link'

interface InviteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  code: string
  groupName: string
}

/** QR + link to share the group's join page. */
export function InviteDialog({ open, onOpenChange, code, groupName }: InviteDialogProps) {
  const invite = useJoinLink(code, groupName)
  return (
    <Modal open={open} onOpenChange={onOpenChange} title="Invite people" centered>
      <div className="flex justify-center"><QrCode value={invite.link} /></div>
      <p className="muted small mt-4 truncate">{invite.link}</p>
      <ShareLinkButtons whatsappUrl={invite.whatsappUrl} onCopy={invite.copy} className="mt-4 grid grid-cols-2 gap-2.5" />
      <Button variant="ghost" block className="mt-2" onClick={() => onOpenChange(false)}>Close</Button>
    </Modal>
  )
}
