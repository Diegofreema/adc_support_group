import { Button, Field, Modal, PhoneInput, Segmented, TextInput } from '@/components/shared'
import { PlaceSelects } from '@/modules/groups'
import { useNewChapterForm } from '../hooks/use-new-chapter-form'
import { LEVEL_OPTIONS } from '../utils/level-options'

interface NewChapterDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  groupId: string
  groupName: string
}

export function NewChapterDialog({ open, onOpenChange, groupId, groupName }: NewChapterDialogProps) {
  const { form, onSubmit, isSaving, place, level, setPlace, setLevel, onNameEdit } = useNewChapterForm(groupId, groupName, () => onOpenChange(false))
  const { errors } = form.formState
  const actions = (
    <>
      <Button onClick={() => onOpenChange(false)}>Cancel</Button>
      <Button variant="primary" type="submit" form="new-chapter" disabled={isSaving}>Create</Button>
    </>
  )
  return (
    <Modal open={open} onOpenChange={onOpenChange} title="New chapter" actions={actions}>
      <form id="new-chapter" onSubmit={onSubmit} noValidate>
        <Field label="Level"><Segmented options={LEVEL_OPTIONS} value={level} onChange={setLevel} label="Chapter level" /></Field>
        <PlaceSelects idPrefix="nc" value={place} onChange={setPlace} depth={level} errors={{ state: errors.state?.message, lga: errors.lga?.message, ward: errors.ward?.message }} />
        <Field label="Name" htmlFor="nc-name" error={errors.name?.message}>
          <TextInput id="nc-name" {...form.register('name', { onChange: onNameEdit })} />
        </Field>
        <Field label="Coordinator phone" htmlFor="nc-phone" error={errors.coordinatorPhone?.message}>
          <PhoneInput id="nc-phone" {...form.register('coordinatorPhone')} />
        </Field>
      </form>
    </Modal>
  )
}
