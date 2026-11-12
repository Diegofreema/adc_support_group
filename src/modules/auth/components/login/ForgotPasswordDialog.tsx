import { useNavigate } from '@tanstack/react-router'

import { Button, Modal } from '@/components/shared'
import { RequestCodeForm } from '../RequestCodeForm'

interface ForgotPasswordDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

/** Send a reset code (choosing email or SMS when the account has both), then set a new password. */
export function ForgotPasswordDialog({ open, onOpenChange }: ForgotPasswordDialogProps) {
  const navigate = useNavigate()
  return (
    <Modal open={open} onOpenChange={onOpenChange} title="Reset password" description="We'll send you a code.">
      {open && (
        <RequestCodeForm
          onSent={({ phone, challengeId, channel }) => {
            onOpenChange(false)
            navigate({ to: '/set-password', search: { phone, challenge: challengeId, via: channel } })
          }}
          secondary={<Button onClick={() => onOpenChange(false)}>Cancel</Button>}
        />
      )}
    </Modal>
  )
}
