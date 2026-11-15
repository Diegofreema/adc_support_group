import { Pause } from 'lucide-react'

import { Button } from '@/components/shared'
import { ReasonModal } from '../../shared/components/ReasonModal'
import { useSuspendFlow } from '../hooks/use-decision-flows'
import { SUSPEND_REASONS } from '../utils/reasons'

/** Danger zone for verified groups, under the decision. */
export function SuspendSection({ groupId }: { groupId: string }) {
  const flow = useSuspendFlow(groupId)
  return (
    <div className="danger-zone mt-4">
      <div className="bold">Suspend</div>
      <div className="small muted">Pauses the group: no new activities, payments, invites or messages until you restore it.</div>
      <Button variant="danger" block icon={Pause} className="mt-3" onClick={flow.dialog.open}>Suspend group</Button>
      <ReasonModal open={flow.dialog.isOpen} onOpenChange={flow.dialog.setOpen} title="Suspend group" reasons={SUSPEND_REASONS} form={flow.form} confirmLabel="Suspend" onConfirm={flow.submit} showPreview />
    </div>
  )
}
