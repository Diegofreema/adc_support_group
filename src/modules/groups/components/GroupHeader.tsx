import { Pencil } from 'lucide-react'

import { Banner, Button, GroupMark, StatusChip, Tag } from '@/components/shared'
import { useDisclosure } from '@/hooks/use-disclosure'
import type { Group } from '@/types/domain'
import { useCancelRename } from '../hooks/use-group-mutations'
import { levelLabel } from '../utils/labels'
import { EditGroupDialog } from './EditGroupDialog'

/** Photo, name, status and two tags; the leader can edit a verified group. */
export function GroupHeader({ group, canEdit = false }: { group: Group; canEdit?: boolean }) {
  const edit = useDisclosure()
  const withdraw = useCancelRename(group.id)
  const editable = canEdit && group.status === 'verified'
  return (
    <>
      <div className="row gap-3.5">
        <GroupMark name={group.name} photoUrl={group.photoUrl} className="!size-15 !text-xl" />
        <div className="grow min-w-0">
          <h1 className="h1 !text-2xl">{group.name}</h1>
          <div className="row wrap mt-2 !gap-2">
            <StatusChip status={group.status} />
            <Tag>{group.category}</Tag>
            <Tag>{levelLabel(group.level)}</Tag>
          </div>
        </div>
        {editable && <Button size="sm" icon={Pencil} onClick={edit.open}>Edit details</Button>}
      </div>
      {group.about && <p className="muted mt-3">{group.about}</p>}
      {editable && group.pendingName && (
        <Banner tone="warn" className="mt-4" title={`New name waiting for approval: ${group.pendingName}`}>
          <Button size="sm" variant="ghost" disabled={withdraw.isPending} onClick={() => withdraw.mutate()}>Withdraw</Button>
        </Banner>
      )}
      {editable && <EditGroupDialog group={group} open={edit.isOpen} onOpenChange={edit.setOpen} />}
    </>
  )
}
