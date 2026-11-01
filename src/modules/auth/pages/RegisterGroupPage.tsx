import { AuthLayout } from '@/components/layout/AuthLayout'
import { WizardProgress } from '@/components/shared'
import { RegisterAccountStep } from '../components/register/RegisterAccountStep'
import { RegisterCheckStep } from '../components/register/RegisterCheckStep'
import { RegisterDoneDialog } from '../components/register/RegisterDoneDialog'
import { RegisterGroupStep } from '../components/register/RegisterGroupStep'
import { RegisterLeaderStep } from '../components/register/RegisterLeaderStep'
import { RegisterWhereStep } from '../components/register/RegisterWhereStep'
import { AuthFormFrame } from '../components/shared/AuthFormFrame'
import { LoginLink } from '../components/shared/LoginLink'
import { useRegisterFlow } from '../hooks/use-register-flow'

export function RegisterGroupPage() {
  return (
    <AuthLayout headline={<>Start a group.<br /><span>Grow it here.</span></>} topAction={<LoginLink />}>
      <AuthFormFrame><RegisterWizard /></AuthFormFrame>
    </AuthLayout>
  )
}

function RegisterWizard() {
  const flow = useRegisterFlow()
  const { wizard, form } = flow
  return (
    <form onSubmit={(event) => event.preventDefault()} noValidate>
      <WizardProgress step={wizard.step} total={wizard.total} />
      <section className="mt-6">
        {wizard.step === 0 && <RegisterAccountStep form={form} onSendCode={flow.sendCode} onNext={flow.submitAccount} />}
        {wizard.step === 1 && <RegisterGroupStep form={form} onBack={wizard.back} onNext={flow.submitGroup} />}
        {wizard.step === 2 && <RegisterWhereStep form={form} onBack={wizard.back} onNext={flow.submitWhere} />}
        {wizard.step === 3 && <RegisterLeaderStep form={form} onBack={wizard.back} onNext={flow.submitLeader} />}
        {wizard.step === 4 && <RegisterCheckStep form={form} onBack={wizard.back} onSubmit={flow.finish} loading={flow.isPending} />}
      </section>
      <RegisterDoneDialog open={flow.done.isOpen} />
    </form>
  )
}
