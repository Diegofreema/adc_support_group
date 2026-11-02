import { Banner, Button, Field, Segmented, TextInput, type SegmentOption } from '@/components/shared'
import { useDisclosure } from '@/hooks/use-disclosure'
import { useLogin } from '../../hooks/use-login'
import type { LoginMethod } from '../../types/auth.types'
import { ForgotPasswordDialog } from './ForgotPasswordDialog'
import { LoginIdentifierField } from './LoginIdentifierField'

const METHODS: SegmentOption<LoginMethod>[] = [
  { value: 'phone', label: 'Phone' },
  { value: 'email', label: 'Email' },
]

export function LoginForm() {
  const { form, method, setMethod, onSubmit, isPending, error } = useLogin()
  const forgot = useDisclosure()

  return (
    <>
      <Segmented options={METHODS} value={method} onChange={setMethod} label="Log in with" />
      <form className="mt-5" onSubmit={onSubmit} noValidate>
        <LoginIdentifierField form={form} method={method} />
        <Field label="Password" htmlFor="login-password" error={form.formState.errors.password?.message} aside={<ForgotLink onClick={forgot.open} />}>
          <TextInput id="login-password" type="password" autoComplete="current-password" placeholder="••••••••" {...form.register('password')} />
        </Field>
        {error && <Banner tone="danger" className="mt-4">{error}</Banner>}
        <Button type="submit" variant="primary" size="lg" block className="mt-6" disabled={isPending}>
          {isPending ? 'Logging in…' : 'Log in'}
        </Button>
      </form>
      <ForgotPasswordDialog open={forgot.isOpen} onOpenChange={forgot.setOpen} />
    </>
  )
}

function ForgotLink({ onClick }: { onClick: () => void }) {
  return <button type="button" className="small mb-2 text-primary" onClick={onClick}>Forgot?</button>
}
