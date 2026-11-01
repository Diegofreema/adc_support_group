import { useState } from 'react'

import { Button, ChoiceList, Modal, type ChoiceOption } from '@/components/shared'
import { useSwitchGroup } from '../hooks/use-switch-group'
import type { MyGroup } from '../types/home.types'
import { groupRoleLine } from '../utils/roles'

interface SwitchGroupDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  groups: MyGroup[]
  currentId: string
}

function toOptions(groups: MyGroup[]): ChoiceOption<string>[] {
  return groups.map((group) => ({ value: group.id, title: group.name, description: groupRoleLine(group.role, group.chapterName) }))
}

export function SwitchGroupDialog({ open, onOpenChange, groups, currentId }: SwitchGroupDialogProps) {
  const [selected, setSelected] = useState(currentId)
  const switchGroup = useSwitchGroup(() => onOpenChange(false))
  const target = groups.find((group) => group.id === selected)
  const actions = (
    <>
      <Button onClick={() => onOpenChange(false)}>Cancel</Button>
      <Button variant="primary" disabled={!target || switchGroup.isPending} onClick={() => target && switchGroup.mutate(target)}>Switch</Button>
    </>
  )
  return (
    <Modal open={open} onOpenChange={onOpenChange} title="Switch group" actions={actions}>
      <ChoiceList name="group" label="Groups" options={toOptions(groups)} value={selected} onChange={setSelected} />
    </Modal>
  )
}
