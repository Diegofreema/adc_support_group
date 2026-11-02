import { BadgeCheck, MessageCircleQuestion, X } from 'lucide-react'

import { Button, Card, CardHead } from '@/components/shared'
import { ReasonModal } from '../../shared/components/ReasonModal'
import { useGroupDecisions } from '../hooks/use-groups'
import { useAskInfoFlow, useRejectFlow } from '../hooks/use-decision-flows'
import { REJECT_REASONS } from '../utils/reasons'
import { AskInfoModal } from './AskInfoModal'

/** Verify / ask / reject for a waiting group. */
export function DecisionCard({ groupId }: { groupId: string }) {
  const { verify } = useGroupDecisions(groupId)
  const reject = useRejectFlow(groupId)
  const ask = useAskInfoFlow(groupId)
  return (
    <Card>
      <CardHead title="Decision" />
      <Button variant="primary" block icon={BadgeCheck} disabled={verify.isPending} onClick={() => verify.mutate(undefined)}>Verify</Button>
      <Button block icon={MessageCircleQuestion} className="mt-2" onClick={ask.dialog.open}>Ask for info</Button>
      <Button variant="danger" block icon={X} className="mt-2" onClick={reject.dialog.open}>Reject</Button>
      <AskInfoModal flow={ask} />
      <ReasonModal open={reject.dialog.isOpen} onOpenChange={reject.dialog.setOpen} title="Reject group" reasons={REJECT_REASONS} form={reject.form} confirmLabel="Reject" onConfirm={reject.submit} showPreview />
    </Card>
  )
}
