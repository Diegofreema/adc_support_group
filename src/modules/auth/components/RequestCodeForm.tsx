import { Mail, MessageSquare } from 'lucide-react'
import type { ReactNode } from 'react'

import { Button, Field, PhoneInput } from '@/components/shared'
import { useRequestResetCode, type CodeSent } from '../hooks/use-request-reset-code'
import type { CodeChannel } from '../services/verification.service'

interface RequestCodeFormProps {
  initialPhone?: string
  onSent: (sent: CodeSent) => void
  /** Extra buttons beside "Send code" (e.g. Cancel in a dialog). */
  secondary?: ReactNode
}

/** Phone + "Send code", then "Send the code to: email / SMS" when the account has both. */
export function RequestCodeForm({ initialPhone = '', onSent, secondary }: RequestCodeFormProps) {
  const { form, channels, isPending, onSubmit, sendVia, resetChoice } = useRequestResetCode(initialPhone, onSent)
  const phoneField = form.register('phone', { onChange: resetChoice })
  return (
    <form onSubmit={onSubmit} noValidate>
      <Field label="Phone number" htmlFor="code-phone" hint="The number on your ADC account." error={form.formState.errors.phone?.message}>
        <PhoneInput id="code-phone" {...phoneField} />
      </Field>
      {channels ? (
        <fieldset className="mt-5">
          <legend className="label">Send the code to:</legend>
          <div className="mt-2 grid gap-2.5">
            <ChannelButton channel="email" label={`Email ${channels.email}`} onPick={sendVia} disabled={isPending} />
            <ChannelButton channel="sms" label={`SMS ${channels.sms}`} onPick={sendVia} disabled={isPending} />
          </div>
        </fieldset>
      ) : (
        <div className="dialog-actions">
          {secondary}
          <Button type="submit" variant="primary" disabled={isPending}>{isPending ? 'Sending…' : 'Send code'}</Button>
        </div>
      )}
    </form>
  )
}

interface ChannelButtonProps {
  channel: CodeChannel
  label: string
  onPick: (channel: CodeChannel) => void
  disabled: boolean
}

function ChannelButton({ channel, label, onPick, disabled }: ChannelButtonProps) {
  return (
    <Button block icon={channel === 'email' ? Mail : MessageSquare} onClick={() => onPick(channel)} disabled={disabled}>
      {label}
    </Button>
  )
}
