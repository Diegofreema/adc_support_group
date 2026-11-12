import { Camera, X } from 'lucide-react'
import type { ChangeEvent } from 'react'

import type { PickedPhoto } from '../types'

interface ActivityPhotoPickerProps {
  photos: PickedPhoto[]
  max: number
  onAdd: (files: File[]) => void
  onRemove: (index: number) => void
}

/** Square grid of picked photos (real previews) with remove buttons and a camera tile. */
export function ActivityPhotoPicker({ photos, max, onAdd, onRemove }: ActivityPhotoPickerProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onAdd(Array.from(event.target.files ?? []))
    event.target.value = ''
  }
  return (
    <div className="photo-grid">
      {photos.map((photo, index) => (
        <div key={photo.preview} className="photo">
          <img src={photo.preview} alt={`Photo ${index + 1}`} className="ph object-cover" />
          <button type="button" className="x" aria-label="Remove photo" onClick={() => onRemove(index)}><X className="i i-sm" /></button>
        </div>
      ))}
      {photos.length < max && (
        <label className="photo-add">
          <Camera className="i i-lg" aria-hidden />
          Add
          <input type="file" accept="image/jpeg,image/png,image/webp" multiple hidden onChange={handleChange} />
        </label>
      )}
    </div>
  )
}
