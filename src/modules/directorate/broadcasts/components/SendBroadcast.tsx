import { Send } from 'lucide-react'

import { Button, ConfirmDialog } from '@/components/shared'
import { useDisclosure } from '@/hooks/use-disclosure'
import type { BroadcastComposer } from '../hooks/use-broadcast-composer'

/** "Send" + confirm; the server works out who receives it. */
export function SendBroadcast({ composer }: { composer: BroadcastComposer }) {
  const confirm = useDisclosure()
  const by = composer.draft.channel === 'sms' ? 'app and SMS' : 'app and email'
  return (
    <div className="mt-6">
      <Button variant="primary" size="lg" block icon={Send} disabled={!composer.canSend || composer.sending} onClick={confirm.open}>
        {composer.sending ? 'Sending…' : 'Send'}
      </Button>
      <ConfirmDialog open={confirm.isOpen} onOpenChange={confirm.setOpen} title={`Send to ${composer.audience}?`} description={`By ${by}. This can't be undone.`} confirmLabel="Send" onConfirm={composer.submit} />
    </div>
  )
}
