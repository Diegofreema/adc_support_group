import { useState } from 'react'

import { Button, Field, Modal, SelectInput, TextInput } from '@/components/shared'
import { EXECUTIVE_TITLES } from '../utils/executive-titles'

interface AddExecutiveDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (query: string, title: string) => void
}

export function AddExecutiveDialog({ open, onOpenChange, onSubmit }: AddExecutiveDialogProps) {
  const [query, setQuery] = useState('')
  const [title, setTitle] = useState<string>(EXECUTIVE_TITLES[0])
  const actions = (
    <>
      <Button onClick={() => onOpenChange(false)}>Cancel</Button>
      <Button variant="primary" disabled={!query.trim()} onClick={() => onSubmit(query, title)}>Add</Button>
    </>
  )
  return (
    <Modal open={open} onOpenChange={onOpenChange} title="Add executive" actions={actions}>
      <Field label="Member" htmlFor="exec-member">
        <TextInput id="exec-member" placeholder="Name or phone" value={query} onChange={(event) => setQuery(event.target.value)} />
      </Field>
      <Field label="Role" htmlFor="exec-role">
        <SelectInput id="exec-role" options={EXECUTIVE_TITLES} value={title} onChange={(event) => setTitle(event.target.value)} />
      </Field>
    </Modal>
  )
}
