import { PhotoPlaceholder } from '@/components/shared'
import type { ActivityPhoto } from '../utils/activity-photos'

/** An uploaded photo, or its placeholder when there is none. */
export function ActivityPhotoView({ photo, crowd }: { photo: ActivityPhoto; crowd?: boolean }) {
  if (!photo.url) return <PhotoPlaceholder tone={photo.tone} crowd={crowd} />
  return <img src={photo.url} alt="Activity photo" loading="lazy" className="ph object-cover" />
}
