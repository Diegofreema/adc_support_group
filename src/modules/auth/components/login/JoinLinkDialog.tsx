import { useNavigate } from '@tanstack/react-router'
import { useState, type FormEvent } from 'react'

import { Button, Field, Modal, TextInput } from '@/components/shared'
import { joinCodeFrom } from '@/lib/share'

interface JoinLinkDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

/** "Have an invite link?": paste the link or type the code, then open the join page. */
export function JoinLinkDialog({ open, onOpenChange }: JoinLinkDialogProps) {
  const navigate = useNavigate()
  const [value, setValue] = useState('')
  const [error, setError] = useState<string>()

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    const code = joinCodeFrom(value)
    if (!code) {
      setError('Paste the whole link, or type the code after /join/')
      return
    }
    onOpenChange(false)
    navigate({ to: '/join/$code', params: { code } })
  }

  return (
    <Modal open={open} onOpenChange={onOpenChange} title="Have an invite link?" description="Paste it here, or type the code.">
      <form onSubmit={onSubmit} noValidate>
        <Field label="Invite link or code" htmlFor="invite-link" error={error}>
          <TextInput
            id="invite-link"
            autoComplete="off"
            autoCapitalize="none"
            placeholder="…/join/atiku-women-x7k2"
            value={value}
            onChange={(event) => { setValue(event.target.value); setError(undefined) }}
          />
        </Field>
        <div className="dialog-actions">
          <Button onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button type="submit" variant="primary">Open</Button>
        </div>
      </form>
    </Modal>
  )
}
