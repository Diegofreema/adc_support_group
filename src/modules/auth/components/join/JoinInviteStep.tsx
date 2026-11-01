import { ActionBar } from '@/components/layout/ActionBar'
import { Button } from '@/components/shared'
import type { Invite } from '../../types/auth.types'
import { HaveAccount } from '../shared/HaveAccount'
import { StepHeading } from '../shared/StepHeading'
import { InviteCard } from './InviteCard'

export function JoinInviteStep({ invite, onJoin }: { invite: Invite; onJoin: () => void }) {
  return (
    <>
      <StepHeading title="Join group" />
      <InviteCard invite={invite} />
      <ActionBar>
        <Button variant="primary" size="lg" block onClick={onJoin}>Join</Button>
      </ActionBar>
      <HaveAccount />
    </>
  )
}
