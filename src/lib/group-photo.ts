import { PHOTO_CACHE_SECONDS, shrinkForUpload } from './image'
import { rpc, supabase } from './supabase'

const PHOTO_BUCKET = 'activity-media'
/** The group photo is only ever shown small. */
const GROUP_PHOTO_MAX_DIM = 800

function extensionOf(file: File): string {
  const fromName = file.name.split('.').pop()?.toLowerCase()
  if (fromName && /^[a-z0-9]{2,5}$/.test(fromName)) return fromName
  return file.type.split('/')[1] ?? 'jpg'
}

/**
 * Upload the leader's photo to the group's folder (the leader may write
 * there in any status) and save it on the group. Registration and "Edit
 * details" both use it.
 */
export async function uploadGroupPhoto(groupId: string, original: File): Promise<void> {
  const file = await shrinkForUpload(original, GROUP_PHOTO_MAX_DIM)
  const path = `support-groups/${groupId}/group-${crypto.randomUUID()}.${extensionOf(file)}`
  const { error } = await supabase.storage.from(PHOTO_BUCKET).upload(path, file, {
    contentType: file.type, cacheControl: PHOTO_CACHE_SECONDS, upsert: false,
  })
  if (error) throw new Error(error.message)
  const publicUrl = supabase.storage.from(PHOTO_BUCKET).getPublicUrl(path).data.publicUrl
  await rpc('update_support_group_details', { p_photo_url: publicUrl })
}
