import { Send } from 'lucide-react'

import { Button, ConfirmDialog } from '@/components/shared'
import { useDisclosure } from '@/hooks/use-disclosure'
import { formatNumber } from '@/lib/format'
import type { BroadcastComposer } from '../hooks/use-broadcast-composer'

/** "Send to 4,812" + confirm. */
export function SendBroadcast({ composer }: { composer: BroadcastComposer }) {
  const confirm = useDisclosure()
  const count = formatNumber(composer.recipients)
  return (
    <div className="mt-6">
      <Button variant="primary" size="lg" block icon={Send} disabled={!composer.canSend || !composer.enoughPoints || composer.sending} onClick={confirm.open}>
        Send to {count}
      </Button>
      <ConfirmDialog open={confirm.isOpen} onOpenChange={confirm.setOpen} title={`Send to ${count}?`} description="This can't be undone." confirmLabel="Send" onConfirm={composer.submit} />
    </div>
  )
}
