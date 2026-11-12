import { useState } from 'react'

import { Button, Checkbox, Modal } from '@/components/shared'
import type { Power } from '@/types/domain'
import type { MemberRecord } from '../types'
import { ALL_POWERS, defaultPowerHint, extraPowers, POWER_LABELS } from '../utils/powers'

interface PowersDialogProps {
  member: MemberRecord | null
  onClose: () => void
  onSave: (extraPowers: Power[]) => void
}

/** Leader ticks extra powers; the title's defaults stay ticked. */
export function PowersDialog({ member, onClose, onSave }: PowersDialogProps) {
  const [extras, setExtras] = useState<Power[]>(member ? extraPowers(member) : [])
  if (!member) return null
  const toggle = (power: Power) =>
    setExtras((current) => (current.includes(power) ? current.filter((p) => p !== power) : [...current, power]))
  const actions = (
    <>
      <Button onClick={onClose}>Cancel</Button>
      <Button variant="primary" onClick={() => onSave(extras)}>Save</Button>
    </>
  )
  return (
    <Modal open onOpenChange={(open) => !open && onClose()} title="Powers" description={`What ${member.fullName.split(' ')[0]} can do`} actions={actions}>
      <div className="grid gap-3">
        {ALL_POWERS.map((power) => (
          <PowerOption key={power} power={power} member={member} checked={extras.includes(power)} onToggle={toggle} />
        ))}
      </div>
    </Modal>
  )
}

interface PowerOptionProps {
  power: Power
  member: MemberRecord
  checked: boolean
  onToggle: (power: Power) => void
}

function PowerOption({ power, member, checked, onToggle }: PowerOptionProps) {
  const isDefault = member.titlePowers.includes(power)
  return (
    <Checkbox checked={isDefault || checked} disabled={isDefault} onChange={() => onToggle(power)}>
      {POWER_LABELS[power]}
      {isDefault && <span className="muted small block">{defaultPowerHint(member)}</span>}
    </Checkbox>
  )
}
