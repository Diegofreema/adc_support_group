import { Field, PhotoPicker, TextInput } from '@/components/shared'
import type { PhotoTone } from '@/types/domain'

interface PhotosStepProps {
  photos: PhotoTone[]
  max: number
  onAdd: (files: File[]) => void
  onRemove: (index: number) => void
  videoUrl: string
  onVideoUrlChange: (value: string) => void
}

export function PhotosStep({ photos, max, onAdd, onRemove, videoUrl, onVideoUrlChange }: PhotosStepProps) {
  return (
    <>
      <h1 className="h1">Add photos</h1>
      <p className="muted mt-1">Up to {max}.</p>
      <div className="mt-5"><PhotoPicker photos={photos} max={max} onAdd={onAdd} onRemove={onRemove} /></div>
      <Field label="Video link" htmlFor="act-video" optional className="mt-6">
        <TextInput id="act-video" type="url" placeholder="YouTube, TikTok, Facebook" value={videoUrl} onChange={(event) => onVideoUrlChange(event.target.value)} />
      </Field>
    </>
  )
}
