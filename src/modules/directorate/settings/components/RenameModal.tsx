import { useState } from 'react'

import { Button, Field, Modal, TextInput } from '@/components/shared'
import { cleanName } from '../utils/staff-form'

interface RenameModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialName: string
  onSave: (name: string) => void
}

/** Remount with a new `key` per item so the field starts from that item's name. */
export function RenameModal({ open, onOpenChange, initialName, onSave }: RenameModalProps) {
  const [name, setName] = useState(initialName)
  return (
    <Modal open={open} onOpenChange={onOpenChange} title="Rename" actions={<><Button onClick={() => onOpenChange(false)}>Cancel</Button><Button variant="primary" disabled={!cleanName(name)} onClick={() => onSave(cleanName(name))}>Save</Button></>}>
      <Field label="Name" htmlFor="rename"><TextInput id="rename" value={name} onChange={(event) => setName(event.target.value)} /></Field>
    </Modal>
  )
}
