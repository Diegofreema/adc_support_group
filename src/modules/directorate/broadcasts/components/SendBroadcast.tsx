import { Send } from 'lucide-react'

import { Button, ConfirmDialog } from '@/components/shared'
import { useDisclosure } from '@/hooks/use-disclosure'
import type { BroadcastComposer } from '../hooks/use-broadcast-composer'
import { confirmTitle, missingContact } from '../utils/reach'

/** Why Send is greyed out, so it never just looks broken. */
function blockedReason(composer: BroadcastComposer): string | undefined {
  if (composer.reach.empty) return 'No one matches these filters'
  if (!composer.hasText) return 'Type a message to send'
  return undefined
}

/** "Members · Lagos. 312 have no phone, so they only get the app notification. This can't be undone." */
function confirmText(composer: BroadcastComposer): string {
  const count = composer.reach.count
  const missing = count && missingContact(count, composer.draft.channel)
  return [
    `${composer.audience}.`,
    missing && `${missing}, so they only get the app notification.`,
    "This can't be undone.",
  ].filter(Boolean).join(' ')
}

/** "Send" + confirm; the server works out who receives it. */
export function SendBroadcast({ composer }: { composer: BroadcastComposer }) {
  const confirm = useDisclosure()
  const reason = blockedReason(composer)
  return (
    <div className="mt-6">
      <Button variant="primary" size="lg" block icon={Send} disabled={!composer.canSend || composer.sending} onClick={confirm.open}>
        {composer.sending ? 'Sending…' : 'Send'}
      </Button>
      {reason && <p className="small faint mt-2 text-center">{reason}</p>}
      <ConfirmDialog open={confirm.isOpen} onOpenChange={confirm.setOpen} title={confirmTitle(composer.reach.count, composer.draft.audience, composer.draft.channel)} description={confirmText(composer)} confirmLabel="Send" onConfirm={composer.submit} />
    </div>
  )
}
