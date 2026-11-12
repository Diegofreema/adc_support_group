import { WizardActions } from '@/components/shared'
import type { Invite } from '../../types/auth.types'
import { HaveAccount } from '../shared/HaveAccount'
import { StepHeading } from '../shared/StepHeading'
import { InviteCard } from './InviteCard'

interface JoinInviteStepProps {
  invite: Invite
  onJoin: () => void
  /** Already signed in: one tap joins, no account steps. */
  signedInName?: string
}

export function JoinInviteStep({ invite, onJoin, signedInName }: JoinInviteStepProps) {
  return (
    <>
      <StepHeading title="Join group" />
      <InviteCard invite={invite} />
      <WizardActions onNext={onJoin} nextLabel={signedInName ? `Join as ${signedInName}` : 'Join'} />
      {!signedInName && <HaveAccount redirect={`/join/${invite.code}`} />}
    </>
  )
}
