import type { ActivityPhoto } from '../utils/activity-photos'
import { ActivityPhotoView } from './ActivityPhotoView'

/** Detail screen photos; real ones open full size in a new tab. */
export function ActivityGallery({ photos }: { photos: ActivityPhoto[] }) {
  return (
    <div className="gallery">
      {photos.map((photo, index) => photo.url
        ? <a key={index} href={photo.url} target="_blank" rel="noreferrer" className="block overflow-hidden"><ActivityPhotoView photo={photo} /></a>
        : <ActivityPhotoView key={index} photo={photo} crowd={index % 2 === 0} />)}
    </div>
  )
}
