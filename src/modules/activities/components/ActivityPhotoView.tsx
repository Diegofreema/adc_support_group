import { PhotoPlaceholder, ThumbImage } from '@/components/shared'
import type { ActivityPhoto } from '../utils/activity-photos'

/** An uploaded photo (the small thumbnail in lists, `full` for the big view), or its placeholder. */
export function ActivityPhotoView({ photo, crowd, full }: { photo: ActivityPhoto; crowd?: boolean; full?: boolean }) {
  if (!photo.url) return <PhotoPlaceholder tone={photo.tone} crowd={crowd} />
  if (full) return <img src={photo.url} alt="Activity photo" loading="lazy" decoding="async" className="ph object-cover" />
  return <ThumbImage src={photo.url} alt="Activity photo" className="ph object-cover" />
}
