/**
 * Photos are shrunk on the phone before upload: members are on patchy, paid
 * data, and the camera's 4–12 MB originals are never needed. Target: longest
 * edge ~1600px, ~200–400 KB as WebP (JPEG where the browser can't encode
 * WebP), plus a ~400px thumbnail for lists.
 *
 * Thumbnails sit next to the photo: `<name>.webp` → `<name>.thumb.webp`.
 * Older uploads have none, so <ThumbImage> falls back to the full photo.
 */

/** Longest edge of an uploaded photo. */
export const PHOTO_MAX_DIM = 1600
/** Longest edge of a list thumbnail. */
export const THUMB_MAX_DIM = 400
/** Above this, re-encode at lower quality. */
const PHOTO_TARGET_BYTES = 400 * 1024
const QUALITIES = [0.82, 0.72, 0.6]
const THUMB_QUALITY = 0.7

export interface ShrunkImage {
  blob: Blob
  ext: 'webp' | 'jpg'
  contentType: 'image/webp' | 'image/jpeg'
}

function encode(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, type, quality))
}

function draw(bitmap: ImageBitmap, maxDim: number): HTMLCanvasElement {
  const scale = Math.min(1, maxDim / Math.max(bitmap.width, bitmap.height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.max(1, Math.round(bitmap.width * scale))
  canvas.height = Math.max(1, Math.round(bitmap.height * scale))
  canvas.getContext('2d')?.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  return canvas
}

/** WebP when the browser can encode it (it returns PNG otherwise), else JPEG. */
async function encodeBest(canvas: HTMLCanvasElement, quality: number): Promise<ShrunkImage | null> {
  const webp = await encode(canvas, 'image/webp', quality)
  if (webp?.type === 'image/webp') return { blob: webp, ext: 'webp', contentType: 'image/webp' }
  const jpeg = await encode(canvas, 'image/jpeg', quality)
  return jpeg ? { blob: jpeg, ext: 'jpg', contentType: 'image/jpeg' } : null
}

/** Resize to `maxDim` and re-encode, stepping quality down until it's under the target size. */
async function shrinkBitmap(bitmap: ImageBitmap, maxDim: number, qualities: number[]): Promise<ShrunkImage | null> {
  const canvas = draw(bitmap, maxDim)
  let best: ShrunkImage | null = null
  for (const quality of qualities) {
    best = await encodeBest(canvas, quality)
    if (!best || best.blob.size <= PHOTO_TARGET_BYTES) break
  }
  return best
}

/**
 * A shrunk photo and its thumbnail. Throws only when the file isn't a
 * readable image; callers show that as "This photo can't be used".
 */
export async function shrinkPhoto(file: Blob): Promise<{ photo: ShrunkImage; thumb: ShrunkImage }> {
  const bitmap = await createImageBitmap(file)
  try {
    const photo = await shrinkBitmap(bitmap, PHOTO_MAX_DIM, QUALITIES)
    const thumb = await shrinkBitmap(bitmap, THUMB_MAX_DIM, [THUMB_QUALITY])
    if (!photo || !thumb) throw new Error('This photo can’t be used')
    return { photo, thumb }
  } finally {
    bitmap.close()
  }
}

/** Shrink one image with no thumbnail (payment proofs, a group photo). PDFs and other files pass through. */
export async function shrinkForUpload(file: File, maxDim = PHOTO_MAX_DIM): Promise<File> {
  if (!file.type.startsWith('image/') || file.type === 'image/gif') return file
  try {
    const bitmap = await createImageBitmap(file)
    try {
      const out = await shrinkBitmap(bitmap, maxDim, QUALITIES)
      if (!out || out.blob.size >= file.size) return file
      const name = file.name.replace(/\.[^.]+$/, '') + '.' + out.ext
      return new File([out.blob], name, { type: out.contentType })
    } finally {
      bitmap.close()
    }
  } catch {
    return file
  }
}

/** Path of a photo's thumbnail, beside it. */
export function thumbPath(photoPath: string): string {
  return photoPath.replace(/\.(webp|jpg)$/, '.thumb.$1')
}

/** URL of a photo's thumbnail, or the photo itself for older uploads that have none. */
export function thumbUrl(photoUrl: string): string {
  return /\.thumb\.(webp|jpg)$/.test(photoUrl) ? photoUrl : photoUrl.replace(/\.(webp|jpg)(\?.*)?$/, '.thumb.$1$2')
}

/** One year: photo paths are never reused, so browsers can keep them. */
export const PHOTO_CACHE_SECONDS = '31536000'
