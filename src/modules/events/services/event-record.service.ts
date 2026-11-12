import { uploadGroupPhotos } from '@/lib/activity-media'
import { rpc } from '@/lib/supabase'
import { sessionStore } from '@/stores/session-store'
import type { RecordEventInput, ShrunkPhoto } from '../types'

function activeGroupId(): string {
  const groupId = sessionStore.getUser()?.activeGroupId
  if (!groupId) throw new Error('You are not in a group')
  return groupId
}

/** Names come from the clientRef, so a retry reuses them. */
function uploadPhotos(clientRef: string, photos: ShrunkPhoto[]): Promise<string[]> {
  return uploadGroupPhotos(activeGroupId(), photos.map((p, index) => ({ name: `${clientRef}-${index + 1}`, photo: p.photo, thumb: p.thumb })))
}

/** Upload the photos and turn the event into an activity. Returns the activity id (the existing one if already done). */
export async function recordEventActivity(eventId: string, input: RecordEventInput): Promise<string> {
  const media = await uploadPhotos(input.clientRef, input.photos)
  const activity = await rpc<{ id: string }>('support_group_event_to_activity', {
    p_event_id: eventId,
    p_media_urls: media,
    p_guests: input.guests,
    p_people_reached: input.peopleReached,
    p_note: input.note || null,
    p_client_ref: input.clientRef,
  })
  return activity.id
}
