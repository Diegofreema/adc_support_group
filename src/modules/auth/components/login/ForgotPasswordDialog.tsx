import { Button, Field, Modal, TextInput } from '@/components/shared'
import { useForgotPassword } from '../../hooks/use-forgot-password'

interface ForgotPasswordDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ForgotPasswordDialog({ open, onOpenChange }: ForgotPasswordDialogProps) {
  const { form, onSubmit, isPending } = useForgotPassword(() => onOpenChange(false))
  return (
    <Modal open={open} onOpenChange={onOpenChange} title="Reset password" description="We'll send you a code.">
      <form onSubmit={onSubmit} noValidate>
        <Field label="Phone or email" htmlFor="forgot-id" error={form.formState.errors.identifier?.message}>
          <TextInput id="forgot-id" placeholder="0803 123 4567" {...form.register('identifier')} />
        </Field>
        <div className="dialog-actions">
          <Button onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button type="submit" variant="primary" disabled={isPending}>Send code</Button>
        </div>
      </form>
    </Modal>
  )
}
