import { PhotoPlaceholder } from '@/components/shared'
import type { PhotoTone } from '@/types/domain'

export function ActivityGallery({ tones }: { tones: PhotoTone[] }) {
  return (
    <div className="gallery">
      {tones.map((tone, index) => (
        <PhotoPlaceholder key={index} tone={tone} crowd={index % 2 === 0} />
      ))}
    </div>
  )
}
