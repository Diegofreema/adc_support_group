import { Button, Modal } from '@/components/shared'
import { useCauseForm } from '../hooks/use-cause-form'
import type { CauseEditor } from '../hooks/use-cause-editor'
import { CauseFormFields } from './CauseFormFields'

const FORM_ID = 'cause-form'

/** New / edit cause dialog. */
export function CauseFormModal({ editor }: { editor: CauseEditor }) {
  const form = useCauseForm(editor.cause, editor.isOpen)
  return (
    <Modal
      open={editor.isOpen}
      onOpenChange={(open) => !open && editor.close()}
      title={editor.cause ? 'Edit cause' : 'New cause'}
      actions={<><Button onClick={editor.close}>Cancel</Button><Button variant="primary" type="submit" form={FORM_ID} disabled={editor.saving}>Save</Button></>}
    >
      <form id={FORM_ID} noValidate onSubmit={form.handleSubmit(editor.submit)}>
        <CauseFormFields form={form} />
      </form>
    </Modal>
  )
}
