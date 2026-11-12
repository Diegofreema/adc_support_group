import { useState } from 'react'

import { Banner, Button, Field, Modal, SinglePhotoField, TextArea, TextInput } from '@/components/shared'
import type { Group } from '@/types/domain'
import { useSaveGroupEdits } from '../hooks/use-group-mutations'

interface EditGroupDialogProps {
  group: Group
  open: boolean
  onOpenChange: (open: boolean) => void
}

/** Name (needs Directorate approval), description and photo of a verified group. */
export function EditGroupDialog({ group, open, onOpenChange }: EditGroupDialogProps) {
  if (!open) return null
  return <EditGroupForm group={group} onClose={() => onOpenChange(false)} />
}

function EditGroupForm({ group, onClose }: { group: Group; onClose: () => void }) {
  const [name, setName] = useState(group.pendingName ?? group.name)
  const [about, setAbout] = useState(group.about ?? '')
  const [photo, setPhoto] = useState<File | null>(null)
  const save = useSaveGroupEdits(group, onClose)
  const nameChanged = name.trim() !== group.name
  const nameError = name.trim().length < 3 ? 'Use 3 to 80 characters' : undefined
  const actions = (
    <>
      <Button onClick={onClose}>Cancel</Button>
      <Button variant="primary" disabled={save.isPending || Boolean(nameError)} onClick={() => save.mutate({ name, about, photo })}>Save</Button>
    </>
  )
  return (
    <Modal open onOpenChange={(next) => !next && onClose()} title="Edit details" actions={actions}>
      <SinglePhotoField file={photo} onPick={setPhoto} currentUrl={group.photoUrl} />
      <Field label="Group name" htmlFor="edit-group-name" className="mt-4" error={nameError}
        hint={nameChanged ? 'A new name needs the Directorate’s approval. The old name stays until then.' : undefined}>
        <TextInput id="edit-group-name" maxLength={80} value={name} onChange={(event) => setName(event.target.value)} />
      </Field>
      <Field label="About" htmlFor="edit-group-about" optional>
        <TextArea id="edit-group-about" rows={3} maxLength={500} value={about} onChange={(event) => setAbout(event.target.value)} />
      </Field>
      {save.error && <Banner tone="danger" className="mt-4">{save.error.message}</Banner>}
    </Modal>
  )
}
