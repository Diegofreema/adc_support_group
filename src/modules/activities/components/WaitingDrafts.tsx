import { CircleAlert, CloudUpload, Send, Trash2 } from 'lucide-react'

import { Button, ConfirmDialog, IconTile, List, ListItem, SectionTitle } from '@/components/shared'
import { formatDay, countLabel } from '@/lib/format'
import type { ActivityDraft } from '../types'
import { friendlyError } from '@/lib/errors'

interface WaitingDraftsProps {
  drafts: ActivityDraft[]
  sendingRef?: string
  onSend: (clientRef: string) => void
  onDelete: (clientRef: string) => void
}

/** Activities saved on the phone with no signal, each with Send now and Delete. */
export function WaitingDrafts({ drafts, sendingRef, onSend, onDelete }: WaitingDraftsProps) {
  if (drafts.length === 0) return null
  return (
    <section className="mb-5">
      <SectionTitle title={`Saved on this phone (${drafts.length})`} className="!mt-0" />
      <p className="small muted mb-3">There was no signal. They send by themselves when you are back online, or tap Send now.</p>
      <List>
        {drafts.map((draft) => (
          <DraftRow key={draft.clientRef} draft={draft} sending={sendingRef === draft.clientRef} onSend={onSend} onDelete={onDelete} />
        ))}
      </List>
    </section>
  )
}

interface DraftRowProps {
  draft: ActivityDraft
  sending: boolean
  onSend: (clientRef: string) => void
  onDelete: (clientRef: string) => void
}

function DraftRow({ draft, sending, onSend, onDelete }: DraftRowProps) {
  const status = draft.needsAttention ? 'Not sent' : 'Waiting'
  return (
    <ListItem
      leading={<IconTile icon={draft.needsAttention ? CircleAlert : CloudUpload} tone={draft.needsAttention ? 'red' : 'amber'} />}
      title={draft.input.title}
      meta={`${status} · ${formatDay(draft.input.date)} · ${countLabel(draft.photos.length, 'photo', 'photos')}`}
    >
      {draft.lastError && <span className="small muted block mt-1">{friendlyError(draft.lastError)}</span>}
      <span className="flex gap-2 mt-3">
        <Button size="sm" icon={Send} loading={sending} onClick={() => onSend(draft.clientRef)}>{sending ? 'Sending…' : 'Send now'}</Button>
        <Button size="sm" icon={Trash2} disabled={sending} onClick={() => onDelete(draft.clientRef)}>Delete</Button>
      </span>
    </ListItem>
  )
}

interface DeleteDraftDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export function DeleteDraftDialog({ open, onOpenChange, onConfirm }: DeleteDraftDialogProps) {
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Delete this activity?"
      description="It has not been sent. It will be gone from your phone."
      confirmLabel="Delete"
      destructive
      onConfirm={onConfirm}
    />
  )
}
