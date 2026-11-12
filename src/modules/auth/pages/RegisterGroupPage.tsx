import { useSearch } from '@tanstack/react-router'
import { CloudOff } from 'lucide-react'

import { AuthLayout } from '@/components/layout/AuthLayout'
import { EmptyState, PageLoader, WizardProgress } from '@/components/shared'
import { RegisterAccountStep } from '../components/register/RegisterAccountStep'
import { RegisterCheckStep } from '../components/register/RegisterCheckStep'
import { RegisterDoneDialog } from '../components/register/RegisterDoneDialog'
import { RegisterGroupStep } from '../components/register/RegisterGroupStep'
import { RegisterLeaderStep } from '../components/register/RegisterLeaderStep'
import { RegisterWhereStep } from '../components/register/RegisterWhereStep'
import { LoginLink } from '../components/shared/LoginLink'
import { useRegisterFlow, useRegistrationDraft } from '../hooks/use-register-flow'
import type { RegistrationDraft } from '../types/auth.types'
import { useSessionUser } from '@/stores/session-store'

export function RegisterGroupPage() {
  const { edit } = useSearch({ from: '/register' })
  const signedIn = Boolean(useSessionUser())
  return (
    <AuthLayout
      headline={edit ? <>Update your group.<br /><span>Then we check again.</span></> : <>Start a group.<br /><span>Grow it here.</span></>}
      topAction={signedIn ? undefined : <LoginLink />}
    >
      {edit ? <EditWizard /> : <RegisterWizard />}
    </AuthLayout>
  )
}

/** "Edit details" / "Edit and resubmit": the same steps, prefilled. */
function EditWizard() {
  const draft = useRegistrationDraft(true)
  if (draft.isError) return <EmptyState icon={CloudOff} title={draft.error.message} />
  if (!draft.data) return <PageLoader shape="form" />
  return <RegisterWizard draft={draft.data} />
}

function RegisterWizard({ draft }: { draft?: RegistrationDraft }) {
  const flow = useRegisterFlow(draft)
  const { wizard, form } = flow
  const submitLabel = flow.isResubmit ? 'Resubmit' : flow.isEditing ? 'Save' : 'Submit'
  return (
    <form onSubmit={(event) => event.preventDefault()} noValidate>
      <WizardProgress step={wizard.step} total={wizard.total} />
      <section className="mt-6">
        {wizard.step === 0 && <RegisterAccountStep form={form} onSendCode={flow.sendCode} sendingCode={flow.isSendingCode} onNext={flow.submitAccount} />}
        {wizard.step === 1 && <RegisterGroupStep form={form} onBack={flow.back} onNext={flow.submitGroup} />}
        {wizard.step === 2 && <RegisterWhereStep form={form} onBack={flow.back} onNext={flow.submitWhere} />}
        {wizard.step === 3 && <RegisterLeaderStep form={form} onBack={flow.back} onNext={flow.submitLeader} onPickPhoto={flow.pickPhoto} existingPhotoUrl={flow.existingPhotoUrl} />}
        {wizard.step === 4 && <RegisterCheckStep form={form} onBack={flow.back} onSubmit={flow.finish} loading={flow.isPending} submitLabel={submitLabel} />}
      </section>
      <RegisterDoneDialog open={flow.done.isOpen} mode={flow.isResubmit ? 'resubmitted' : flow.isEditing ? 'saved' : 'submitted'} />
    </form>
  )
}
