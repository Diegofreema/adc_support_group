import { Camera, X } from 'lucide-react'
import type { ChangeEvent } from 'react'

import { PhotoPlaceholder } from '../display/PhotoPlaceholder'
import type { PhotoTone } from '@/types/domain'

interface PhotoPickerProps {
  photos: PhotoTone[]
  max?: number
  onAdd: (files: File[]) => void
  onRemove: (index: number) => void
}

/** Square photo grid with remove buttons and a camera tile. */
export function PhotoPicker({ photos, max = 6, onAdd, onRemove }: PhotoPickerProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => onAdd(Array.from(event.target.files ?? []))
  return (
    <div className="photo-grid">
      {photos.map((tone, index) => (
        <div key={index} className="photo">
          <PhotoPlaceholder tone={tone} crowd={index % 2 === 0} />
          <button type="button" className="x" aria-label="Remove photo" onClick={() => onRemove(index)}><X className="i i-sm" /></button>
        </div>
      ))}
      {photos.length < max && (
        <label className="photo-add">
          <Camera className="i i-lg" aria-hidden />
          Add
          <input type="file" accept="image/*" capture="environment" multiple hidden onChange={handleChange} />
        </label>
      )}
    </div>
  )
}
