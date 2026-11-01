import { Button, Field, Modal, TextArea } from '@/components/shared'
import type { useAskInfoFlow } from '../hooks/use-decision-flows'

type AskInfoFlow = ReturnType<typeof useAskInfoFlow>

export function AskInfoModal({ flow }: { flow: AskInfoFlow }) {
  return (
    <Modal
      open={flow.dialog.isOpen}
      onOpenChange={flow.dialog.setOpen}
      title="Ask for info"
      actions={<><Button onClick={flow.dialog.close}>Cancel</Button><Button variant="primary" disabled={!flow.canSend} onClick={flow.submit}>Send</Button></>}
    >
      <Field label="Message" htmlFor="ask-info">
        <TextArea id="ask-info" placeholder="e.g. Send your CAC certificate" value={flow.message} onChange={(event) => flow.setMessage(event.target.value)} />
      </Field>
    </Modal>
  )
}
