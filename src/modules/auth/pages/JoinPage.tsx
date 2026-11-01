import { useParams } from '@tanstack/react-router'

import { AuthLayout } from '@/components/layout/AuthLayout'
import { EmptyState, WizardProgress } from '@/components/shared'
import { Link2Off } from 'lucide-react'
import { JoinCodeStep } from '../components/join/JoinCodeStep'
import { JoinDetailsStep } from '../components/join/JoinDetailsStep'
import { JoinDoneDialog } from '../components/join/JoinDoneDialog'
import { JoinInviteStep } from '../components/join/JoinInviteStep'
import { JoinPhoneStep } from '../components/join/JoinPhoneStep'
import { LoginLink } from '../components/shared/LoginLink'
import { useInvite } from '../hooks/use-invite'
import { useJoinFlow } from '../hooks/use-join-flow'
import type { Invite } from '../types/auth.types'

export function JoinPage() {
  const { code } = useParams({ from: '/join/$code' })
  const { data: invite, isError } = useInvite(code)
  return (
    <AuthLayout headline={<>You're invited.<br /><span>Join in a minute.</span></>} topAction={<LoginLink />}>
      {isError && <EmptyState icon={Link2Off} title="Link not found" />}
      {invite && <JoinWizard invite={invite} />}
    </AuthLayout>
  )
}

function JoinWizard({ invite }: { invite: Invite }) {
  const flow = useJoinFlow(invite)
  const { wizard, form } = flow
  return (
    <form onSubmit={(event) => event.preventDefault()} noValidate>
      <WizardProgress step={wizard.step} total={wizard.total} />
      <section className="mt-6">
        {wizard.step === 0 && <JoinInviteStep invite={invite} onJoin={flow.start} />}
        {wizard.step === 1 && <JoinPhoneStep form={form} onBack={wizard.back} onNext={flow.submitPhone} loading={flow.isPending} />}
        {wizard.step === 2 && <JoinCodeStep form={form} onBack={wizard.back} onNext={flow.submitCode} onResend={flow.resendCode} loading={flow.isPending} />}
        {wizard.step === 3 && <JoinDetailsStep form={form} onBack={wizard.back} onFinish={flow.finish} loading={flow.isPending} />}
      </section>
      <JoinDoneDialog open={flow.done.isOpen} groupName={invite.groupName} />
    </form>
  )
}
