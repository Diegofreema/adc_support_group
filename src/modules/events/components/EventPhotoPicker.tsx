import { Camera, CircleAlert, X } from 'lucide-react'
import type { ChangeEvent } from 'react'

import type { PickedPhoto } from '../types'

interface EventPhotoPickerProps {
  photos: PickedPhoto[]
  max: number
  adding?: boolean
  error?: string
  onAdd: (files: File[]) => void
  onRemove: (index: number) => void
}

/** Square grid of picked photos with remove buttons and a camera tile. */
export function EventPhotoPicker({ photos, max, adding, error, onAdd, onRemove }: EventPhotoPickerProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onAdd(Array.from(event.target.files ?? []))
    event.target.value = ''
  }
  return (
    <>
      <div className="photo-grid">
        {photos.map((photo, index) => (
          <div key={photo.preview} className="photo">
            <img src={photo.preview} alt={`Photo ${index + 1}`} className="ph object-cover" />
            <button type="button" className="x" aria-label="Remove photo" onClick={() => onRemove(index)}><X className="i i-sm" /></button>
          </div>
        ))}
        {photos.length < max && (
          <label className="photo-add" aria-busy={adding}>
            <Camera className="i i-lg" aria-hidden />
            {adding ? 'Wait…' : 'Add'}
            <input type="file" accept="image/*" multiple hidden disabled={adding} onChange={handleChange} />
          </label>
        )}
      </div>
      {error && <p className="error-text" role="alert"><CircleAlert className="i i-sm" aria-hidden />{error}</p>}
    </>
  )
}
