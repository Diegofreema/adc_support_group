import type { ActivityPhoto } from '../utils/activity-photos'
import { ActivityPhotoView } from './ActivityPhotoView'

/** Detail screen photos: the wide first one full size, the rest as thumbnails; tapping opens the full photo. */
export function ActivityGallery({ photos }: { photos: ActivityPhoto[] }) {
  return (
    <div className="gallery">
      {photos.map((photo, index) => photo.url
        ? <a key={index} href={photo.url} target="_blank" rel="noreferrer" className="block overflow-hidden"><ActivityPhotoView photo={photo} full={index === 0} /></a>
        : <ActivityPhotoView key={index} photo={photo} crowd={index % 2 === 0} />)}
    </div>
  )
}
