import { useState } from 'react'

import type { PhotoTone } from '@/types/domain'

const MAX_PHOTOS = 6

/** Mock: each picked file becomes a coloured placeholder until uploads exist. */
function tonesFor(count: number, start: number): PhotoTone[] {
  return Array.from({ length: count }, (_, index) => (((start + index) % 6) + 1) as PhotoTone)
}

export function usePhotoList(initial: PhotoTone[] = []) {
  const [items, setItems] = useState<PhotoTone[]>(initial)

  const add = (files: File[]) =>
    setItems((current) => [...current, ...tonesFor(files.length, current.length)].slice(0, MAX_PHOTOS))

  const remove = (index: number) => setItems((current) => current.filter((_, position) => position !== index))

  return { items, add, remove, max: MAX_PHOTOS }
}
