import { PHOTO_CACHE_SECONDS, thumbPath, type ShrunkImage } from './image'
import { supabase } from './supabase'

/**
 * Activity photos (recorded activities and events turned into activities)
 * live in the public activity-media bucket under support-groups/{groupId}/.
 * The activity RPC only accepts URLs from there.
 */
const BUCKET = 'activity-media'

/** A shrunk photo and its thumbnail, under a name that stays the same on a retry. */
export interface NamedGroupPhoto {
  name: string
  photo: ShrunkImage
  thumb: ShrunkImage
}

/** Members can't overwrite, so on a retry a duplicate means it's already there. */
function isDuplicate(error: { message: string; status?: number; statusCode?: string }): boolean {
  return error.statusCode === '409' || error.status === 409 || /already exists|duplicate/i.test(error.message)
}

async function uploadImage(path: string, image: ShrunkImage): Promise<void> {
  const { error } = await supabase.storage.from(BUCKET).upload(path, image.blob, {
    contentType: image.contentType,
    cacheControl: PHOTO_CACHE_SECONDS,
    upsert: false,
  })
  if (error && !isDuplicate(error)) throw new Error(`Could not upload a photo: ${error.message}`)
}

/** Upload a photo and its thumbnail beside it; returns the photo's public URL. */
async function uploadGroupPhoto(groupId: string, photo: NamedGroupPhoto): Promise<string> {
  const path = `support-groups/${groupId}/${photo.name}.${photo.photo.ext}`
  await uploadImage(path, photo.photo)
  await uploadImage(thumbPath(path), photo.thumb)
  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl
}

/** One after another: on patchy data that finishes sooner than all at once. */
export async function uploadGroupPhotos(groupId: string, photos: NamedGroupPhoto[]): Promise<string[]> {
  const urls: string[] = []
  for (const photo of photos) urls.push(await uploadGroupPhoto(groupId, photo))
  return urls
}
