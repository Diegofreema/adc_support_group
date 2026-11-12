import { useEffect, useRef, useState } from 'react'

import { shrinkPhoto } from '@/lib/image'
import type { PickedPhoto, ShrunkPhoto } from '../types'

const MAX_PHOTOS = 6
const UNUSABLE = 'This photo can’t be used'

const revoke = (photo: PickedPhoto) => { if (photo.shrunk) URL.revokeObjectURL(photo.preview) }

/** Shrink picked files one by one (cheap phones run out of memory decoding several camera photos at once). */
async function shrinkAll(files: File[]): Promise<{ shrunk: ShrunkPhoto[]; failed: number }> {
  const shrunk: ShrunkPhoto[] = []
  for (const file of files) {
    try { shrunk.push(await shrinkPhoto(file)) } catch { /* counted below */ }
  }
  return { shrunk, failed: files.length - shrunk.length }
}

/**
 * Photos in the wizard: already-uploaded URLs plus new ones, shrunk as soon as
 * they're picked so the preview, the upload and any saved draft are all small.
 * Previews use the thumbnail and are revoked when removed or on leave.
 */
export function usePhotoList(initialUrls: string[] = []) {
  const [items, setItems] = useState<PickedPhoto[]>(() => initialUrls.map((url) => ({ preview: url })))
  const [adding, setAdding] = useState(false)
  const latest = useRef(items)
  const live = useRef(true)

  useEffect(() => { latest.current = items })
  useEffect(() => { live.current = true; return () => { live.current = false; latest.current.forEach(revoke) } }, [])

  /** Resolves with an error message when some files couldn't be used. */
  const add = async (files: File[]): Promise<string | undefined> => {
    const room = Math.max(MAX_PHOTOS - latest.current.length, 0)
    const picked = files.filter((file) => file.type.startsWith('image/')).slice(0, room)
    setAdding(true)
    const { shrunk, failed } = await shrinkAll(picked)
    if (!live.current) return undefined
    setAdding(false)
    const added = shrunk.map((photo) => ({ shrunk: photo, preview: URL.createObjectURL(photo.thumb.blob) }))
    setItems((current) => [...current, ...added])
    return failed > 0 ? UNUSABLE : undefined
  }

  const remove = (index: number) => {
    const gone = items[index]
    if (gone) revoke(gone)
    setItems(items.filter((_, position) => position !== index))
  }

  return { items, add, remove, adding, max: MAX_PHOTOS }
}
