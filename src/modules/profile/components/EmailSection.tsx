import { Mail } from 'lucide-react'
import { Controller } from 'react-hook-form'

import { Banner, Button, Card, Field, Modal, OtpInput, SectionTitle, StatusChip, TextInput } from '@/components/shared'
import { useDisclosure } from '@/hooks/use-disclosure'
import { useEmailCheck } from '../hooks/use-email-check'
import type { Profile } from '../types/profile.types'

/** The email on the account, and whether it signs them in (it does once confirmed with a code). */
export function EmailSection({ profile }: { profile: Profile }) {
  const dialog = useDisclosure()
  const action = !profile.email ? 'Add email' : profile.emailConfirmed ? 'Change' : 'Confirm'
  return (
    <>
      <SectionTitle title="Email" />
      <Card className="row-between gap-3">
        <span className="row gap-3 min-w-0">
          <Mail className="i faint shrink-0" aria-hidden />
          <span className="min-w-0">
            <span className="block truncate">{profile.email || 'No email yet'}</span>
            <span className="small faint">
              {!profile.email ? 'Add one to sign in with it and get updates by email.'
                : profile.emailConfirmed ? 'You can sign in with it.' : 'Not confirmed. Confirm it to sign in with it.'}
            </span>
          </span>
        </span>
        <span className="row gap-2 shrink-0">
          {profile.emailConfirmed && <StatusChip status="verified" label="Confirmed" />}
          <Button size="sm" onClick={dialog.open}>{action}</Button>
        </span>
      </Card>
      <EmailDialog open={dialog.isOpen} onOpenChange={dialog.setOpen} current={profile.emailConfirmed ? '' : profile.email} />
    </>
  )
}

function EmailDialog({ open, onOpenChange, current }: { open: boolean; onOpenChange: (open: boolean) => void; current: string }) {
  if (!open) return null
  return <EmailFlow current={current} onClose={() => onOpenChange(false)} />
}

function EmailFlow({ current, onClose }: { current: string; onClose: () => void }) {
  const flow = useEmailCheck(onClose, current)
  const close = (next: boolean) => {
    if (!next) onClose()
  }
  return (
    <Modal open onOpenChange={close} title={flow.check ? 'Enter the code' : 'Your email'}>
      {flow.check ? <CodeStep flow={flow} /> : <AddressStep flow={flow} onCancel={onClose} />}
    </Modal>
  )
}

type EmailFlow = ReturnType<typeof useEmailCheck>

function AddressStep({ flow, onCancel }: { flow: EmailFlow; onCancel: () => void }) {
  const error = flow.emailForm.formState.errors.email?.message
  return (
    <form onSubmit={flow.sendCode} noValidate>
      <p className="muted small">We'll email a 6-digit code to check it's yours.</p>
      <Field label="Email" htmlFor="new-email" error={error}>
        <TextInput id="new-email" type="email" autoComplete="email" inputMode="email" {...flow.emailForm.register('email')} />
      </Field>
      {flow.error && <Banner tone="danger" className="mt-4">{flow.error}</Banner>}
      <div className="dialog-actions">
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="primary" disabled={flow.isPending}>Send code</Button>
      </div>
    </form>
  )
}

function CodeStep({ flow }: { flow: EmailFlow }) {
  const error = flow.codeForm.formState.errors.code?.message
  return (
    <form onSubmit={flow.confirmCode} noValidate>
      <p className="muted small">Sent to {flow.check?.sentTo}. Check spam if it isn't there.</p>
      <Field label="Code" error={error}>
        <Controller control={flow.codeForm.control} name="code" render={({ field }) => <OtpInput value={field.value} onChange={field.onChange} />} />
      </Field>
      {flow.error && <Banner tone="danger" className="mt-4">{flow.error}</Banner>}
      <div className="dialog-actions">
        <Button onClick={flow.back}>Back</Button>
        <Button onClick={flow.resend} disabled={flow.isPending}>Resend</Button>
        <Button type="submit" variant="primary" disabled={flow.isPending}>Confirm</Button>
      </div>
    </form>
  )
}
