import { Plus } from 'lucide-react'

import { Banner, Button, Card, ConfirmDialog } from '@/components/shared'
import { useDisclosure } from '@/hooks/use-disclosure'
import { useStaff } from '../hooks/use-settings'
import { useTarget } from '../hooks/use-target'
import type { StaffMember } from '../types'
import { AddStaffModal } from './AddStaffModal'
import { StaffRow } from './StaffRow'

/** Directorate staff. The super admin comes from Rise Up and can't be removed here. */
export function StaffSection() {
  const { items, add, remove } = useStaff()
  const adding = useDisclosure()
  const removing = useTarget<StaffMember>()
  return (
    <>
      <div className="row-between wrap mb-4">
        <Banner tone="info" className="grow">Super admin is the Rise Up super admin</Banner>
        <Button variant="primary" icon={Plus} onClick={adding.open}>Add staff</Button>
      </div>
      <Card flush>{items.map((member) => <StaffRow key={member.id} member={member} onRemove={removing.open} />)}</Card>
      <AddStaffModal open={adding.isOpen} onOpenChange={adding.setOpen} onAdd={(values) => add.mutate(values, { onSuccess: adding.close })} />
      <ConfirmDialog open={removing.isOpen} onOpenChange={removing.setOpen} title={`Remove ${removing.target?.fullName ?? ''}?`} description="They lose Directorate access." confirmLabel="Remove" destructive onConfirm={() => removing.target && remove.mutate(removing.target.id)} />
    </>
  )
}
