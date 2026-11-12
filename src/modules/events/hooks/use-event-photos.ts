import { useEffect, useRef, useState } from 'react'

import { shrinkPhoto } from '@/lib/image'
import type { PickedPhoto, ShrunkPhoto } from '../types'

const MAX_PHOTOS = 6
const UNUSABLE = 'This photo can’t be used'

/** One at a time: cheap phones run out of memory decoding several camera photos at once. */
async function shrinkAll(files: File[]): Promise<{ shrunk: ShrunkPhoto[]; failed: number }> {
  const shrunk: ShrunkPhoto[] = []
  for (const file of files) {
    try { shrunk.push(await shrinkPhoto(file)) } catch { /* counted below */ }
  }
  return { shrunk, failed: files.length - shrunk.length }
}

/** Picked photos, shrunk on the phone as soon as they're picked; previews are revoked on remove or leave. */
export function useEventPhotos() {
  const [items, setItems] = useState<PickedPhoto[]>([])
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState<string>()
  const latest = useRef(items)
  const live = useRef(true)

  useEffect(() => { latest.current = items })
  useEffect(() => {
    live.current = true
    return () => { live.current = false; latest.current.forEach((item) => URL.revokeObjectURL(item.preview)) }
  }, [])

  const addFiles = async (files: File[]) => {
    const room = Math.max(MAX_PHOTOS - latest.current.length, 0)
    const picked = files.filter((file) => file.type.startsWith('image/')).slice(0, room)
    setError(undefined)
    setAdding(true)
    const { shrunk, failed } = await shrinkAll(picked)
    if (!live.current) return
    setAdding(false)
    setItems((current) => [...current, ...shrunk.map((photo) => ({ shrunk: photo, preview: URL.createObjectURL(photo.thumb.blob) }))])
    if (failed > 0) setError(UNUSABLE)
  }

  const remove = (index: number) => {
    const gone = items[index]
    if (gone) URL.revokeObjectURL(gone.preview)
    setItems(items.filter((_, position) => position !== index))
  }

  return { items, adding, error, setError, max: MAX_PHOTOS, add: (files: File[]) => void addFiles(files), remove }
}
