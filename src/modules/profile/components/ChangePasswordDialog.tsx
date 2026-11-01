import { Banner, Button, Field, Modal, TextInput } from '@/components/shared'
import { useChangePassword } from '../hooks/use-change-password'

interface ChangePasswordDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ChangePasswordDialog({ open, onOpenChange }: ChangePasswordDialogProps) {
  const { form, onSubmit, isPending, error } = useChangePassword(() => onOpenChange(false))
  const errors = form.formState.errors
  return (
    <Modal open={open} onOpenChange={onOpenChange} title="Change password">
      <form onSubmit={onSubmit} noValidate>
        <Field label="Current" htmlFor="pw-current" error={errors.current?.message}>
          <TextInput id="pw-current" type="password" autoComplete="current-password" {...form.register('current')} />
        </Field>
        <Field label="New" htmlFor="pw-next" error={errors.next?.message}>
          <TextInput id="pw-next" type="password" autoComplete="new-password" placeholder="8+ characters" {...form.register('next')} />
        </Field>
        {error && <Banner tone="danger" className="mt-4">{error}</Banner>}
        <div className="dialog-actions">
          <Button onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button type="submit" variant="primary" disabled={isPending}>Save</Button>
        </div>
      </form>
    </Modal>
  )
}
