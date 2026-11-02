import { Pause } from 'lucide-react'

import { Button } from '@/components/shared'
import { ReasonModal } from '../../shared/components/ReasonModal'
import { useSuspendFlow } from '../hooks/use-decision-flows'
import { SUSPEND_REASONS } from '../utils/reasons'

/** Danger zone for verified groups. */
export function SuspendSection({ groupId }: { groupId: string }) {
  const flow = useSuspendFlow(groupId)
  return (
    <div className="danger-zone mt-4">
      <div className="row-between wrap">
        <div><div className="bold">Suspend</div><div className="small faint">Stops new activities and payments</div></div>
        <Button variant="danger" size="sm" icon={Pause} onClick={flow.dialog.open}>Suspend</Button>
      </div>
      <ReasonModal open={flow.dialog.isOpen} onOpenChange={flow.dialog.setOpen} title="Suspend group" reasons={SUSPEND_REASONS} form={flow.form} confirmLabel="Suspend" onConfirm={flow.submit} showPreview />
    </div>
  )
}
