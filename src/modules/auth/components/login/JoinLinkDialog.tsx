import { Button, Modal } from '@/components/shared'
import { JoinCodeForm } from './JoinCodeForm'

interface JoinLinkDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

/** "Have an invite link?": paste the link or type the code, then open the join page. */
export function JoinLinkDialog({ open, onOpenChange }: JoinLinkDialogProps) {
  return (
    <Modal open={open} onOpenChange={onOpenChange} title="Have an invite link?" description="Paste the link your group leader sent you.">
      <JoinCodeForm
        id="invite-link"
        onOpened={() => onOpenChange(false)}
        actions={
          <div className="dialog-actions">
            <Button onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" variant="primary">Continue</Button>
          </div>
        }
      />
    </Modal>
  )
}
