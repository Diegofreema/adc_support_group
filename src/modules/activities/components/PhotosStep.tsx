import { CircleAlert } from 'lucide-react'

import { Field, TextInput } from '@/components/shared'
import type { PickedPhoto } from '../types'
import { ActivityPhotoPicker } from './ActivityPhotoPicker'

interface PhotosStepProps {
  photos: PickedPhoto[]
  max: number
  onAdd: (files: File[]) => void
  onRemove: (index: number) => void
  /** Shown when they try to go on without a photo. */
  error?: string
  videoUrl: string
  onVideoUrlChange: (value: string) => void
}

export function PhotosStep({ photos, max, onAdd, onRemove, error, videoUrl, onVideoUrlChange }: PhotosStepProps) {
  return (
    <>
      <h1 className="h1">Add photos</h1>
      <p className="muted mt-1">At least 1, up to {max}.</p>
      <div className="mt-5"><ActivityPhotoPicker photos={photos} max={max} onAdd={onAdd} onRemove={onRemove} /></div>
      {error && <p className="error-text" role="alert"><CircleAlert className="i i-sm" aria-hidden />{error}</p>}
      <Field label="Video link" htmlFor="act-video" optional className="mt-6">
        <TextInput id="act-video" type="url" placeholder="YouTube, TikTok, Facebook" value={videoUrl} onChange={(event) => onVideoUrlChange(event.target.value)} />
      </Field>
    </>
  )
}
