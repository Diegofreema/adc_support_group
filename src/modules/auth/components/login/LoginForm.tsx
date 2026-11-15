import { Banner, Button, Field, PasswordInput } from '@/components/shared'
import { useDisclosure } from '@/hooks/use-disclosure'
import { useLogin } from '../../hooks/use-login'
import { ForgotPasswordDialog } from './ForgotPasswordDialog'
import { LoginIdentifierField } from './LoginIdentifierField'

export function LoginForm() {
  const { form, onSubmit, isPending, error } = useLogin()
  const forgot = useDisclosure()

  return (
    <>
      <form onSubmit={onSubmit} noValidate>
        <LoginIdentifierField form={form} />
        <Field label="Password" htmlFor="login-password" error={form.formState.errors.password?.message} aside={<ForgotLink onClick={forgot.open} />}>
          <PasswordInput id="login-password" autoComplete="current-password" {...form.register('password')} />
        </Field>
        {error && <Banner tone="danger" className="mt-4 anim-shake">{error}</Banner>}
        <Button type="submit" variant="primary" size="lg" block className="mt-6" loading={isPending}>
          {isPending ? 'Logging in…' : 'Log in'}
        </Button>
      </form>
      <ForgotPasswordDialog open={forgot.isOpen} onOpenChange={forgot.setOpen} />
    </>
  )
}

function ForgotLink({ onClick }: { onClick: () => void }) {
  return <button type="button" className="text-link" onClick={onClick}>Forgot password?</button>
}
