import { useEffect, useRef, useState } from 'react'

import type { PickedPhoto } from '../types'

const MAX_PHOTOS = 6

/** Picked photo files with local previews (revoked when removed or on leave). */
export function usePhotoList() {
  const [items, setItems] = useState<PickedPhoto[]>([])
  const latest = useRef(items)

  useEffect(() => { latest.current = items })
  useEffect(() => () => latest.current.forEach((photo) => URL.revokeObjectURL(photo.preview)), [])

  const add = (files: File[]) => {
    const room = Math.max(MAX_PHOTOS - items.length, 0)
    const picked = files.filter((file) => file.type.startsWith('image/')).slice(0, room)
    setItems([...items, ...picked.map((file) => ({ file, preview: URL.createObjectURL(file) }))])
  }

  const remove = (index: number) => {
    const gone = items[index]
    if (gone) URL.revokeObjectURL(gone.preview)
    setItems(items.filter((_, position) => position !== index))
  }

  return { items, add, remove, max: MAX_PHOTOS }
}
