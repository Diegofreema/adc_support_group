import { isNoSignal, draftPhotoId } from '../utils/no-signal'
import { activeGroupId, recordActivity } from './activities.service'
import { deleteDraft, getDraft, listDrafts, putDraft } from './activity-drafts.store'
import { sessionStore } from '@/stores/session-store'
import type { ActivityDraft, NewActivityInput, RecordResult } from '../types'

const NO_SIGNAL = 'No signal'

function signedInId(): string | undefined {
  return sessionStore.getUser()?.id
}

/** A new activity as a draft: its clientRef also names its photos, so a re-send finds them already uploaded. */
function toDraft(input: NewActivityInput, ownerId: string): ActivityDraft {
  const { photos, keptPhotoUrls: _kept, ...fields } = input
  const clientRef = crypto.randomUUID()
  return {
    clientRef,
    ownerId,
    groupId: activeGroupId(),
    createdAt: new Date().toISOString(),
    input: fields,
    photos: photos.map((photo, index) => ({ ...photo, id: draftPhotoId(clientRef, index) })),
  }
}

function send(draft: ActivityDraft) {
  return recordActivity(draft.groupId, draft.clientRef, draft.input, draft.photos)
}

/** Record a new activity; with no signal it is saved on the phone instead, to send later. */
export async function createActivity(input: NewActivityInput): Promise<RecordResult> {
  const ownerId = signedInId()
  if (!ownerId) throw new Error('Log in again')
  const draft = toDraft(input, ownerId)
  try {
    if (!navigator.onLine) throw new Error(NO_SIGNAL)
    return { kind: 'sent', activity: await send(draft) }
  } catch (error) {
    if (!isNoSignal(error)) throw error
    await putDraft({ ...draft, lastError: NO_SIGNAL })
    return { kind: 'saved' }
  }
}

/** Send one draft. Sent → deleted. No signal → kept to retry. Refused → kept, marked for attention. */
export async function sendDraft(clientRef: string): Promise<boolean> {
  const draft = await getDraft(clientRef)
  if (!draft) return true
  try {
    await send(draft)
    await deleteDraft(clientRef)
    return true
  } catch (error) {
    const noSignal = isNoSignal(error)
    const lastError = noSignal ? NO_SIGNAL : error instanceof Error ? error.message : String(error)
    await putDraft({ ...draft, lastError, needsAttention: !noSignal })
    return false
  }
}

export function myDrafts(): Promise<ActivityDraft[]> {
  const ownerId = signedInId()
  return ownerId ? listDrafts(ownerId) : Promise.resolve([])
}

export const removeDraft = deleteDraft

let sending: Promise<number> | undefined

/** Send the signed-in user's drafts one by one, skipping refused ones; resolves with how many went. One run at a time. */
export function sendMyDrafts(): Promise<number> {
  sending ??= (async () => {
    let sent = 0
    for (const draft of await myDrafts()) {
      if (draft.needsAttention) continue
      if (!navigator.onLine) break
      if (await sendDraft(draft.clientRef)) sent += 1
    }
    return sent
  })().finally(() => { sending = undefined })
  return sending
}
