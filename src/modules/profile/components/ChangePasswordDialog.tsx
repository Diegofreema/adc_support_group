import { Controller } from 'react-hook-form'

import { Banner, Button, ChoiceList, Field, Modal, OtpInput, PasswordInput } from '@/components/shared'
import { useChangePassword } from '../hooks/use-change-password'

interface ChangePasswordDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ChangePasswordDialog({ open, onOpenChange }: ChangePasswordDialogProps) {
  const password = useChangePassword(() => onOpenChange(false))
  const close = (next: boolean) => {
    if (!next) password.reset()
    onOpenChange(next)
  }
  return (
    <Modal open={open} onOpenChange={close} title="Change password">
      {password.challenge ? <CodeStep password={password} onCancel={() => close(false)} /> : <SendStep password={password} onCancel={() => close(false)} />}
    </Modal>
  )
}

type ChangePassword = ReturnType<typeof useChangePassword>

function SendStep({ password, onCancel }: { password: ChangePassword; onCancel: () => void }) {
  return (
    <>
      {password.channels
        ? (
          <Field label="Send the code to">
            <ChoiceList
              name="code-channel" label="Send the code to" value={password.channel} onChange={password.setChannel}
              options={[
                { value: 'email', title: 'Email', description: password.channels.email },
                { value: 'sms', title: 'SMS', description: password.channels.sms },
              ]}
            />
          </Field>
        )
        : <p className="muted">We'll send you a code to confirm it's you.</p>}
      {password.error && <Banner tone="danger" className="mt-4">{password.error}</Banner>}
      <div className="dialog-actions">
        <Button onClick={onCancel}>Cancel</Button>
        <Button variant="primary" onClick={password.sendCode} disabled={password.isPending}>Send code</Button>
      </div>
    </>
  )
}

function CodeStep({ password, onCancel }: { password: ChangePassword; onCancel: () => void }) {
  const { form } = password
  const errors = form.formState.errors
  return (
    <form onSubmit={password.onSubmit} noValidate>
      <p className="muted small">Code sent to {password.challenge?.sentTo}</p>
      <Field label="Code" error={errors.code?.message}>
        <Controller control={form.control} name="code" render={({ field }) => <OtpInput value={field.value} onChange={field.onChange} />} />
      </Field>
      <Field label="New password" htmlFor="pw-next" error={errors.next?.message}>
        <PasswordInput id="pw-next" autoComplete="new-password" placeholder="8+ characters" {...form.register('next')} />
      </Field>
      {password.error && <Banner tone="danger" className="mt-4">{password.error}</Banner>}
      <div className="dialog-actions">
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="primary" disabled={password.isPending}>Save</Button>
      </div>
    </form>
  )
}
