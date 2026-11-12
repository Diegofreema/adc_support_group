import type { ActivityPhoto } from '../utils/activity-photos'
import { mediaTones } from '../utils/activity-display'
import { ActivityPhotoView } from './ActivityPhotoView'

const SHOWN = 3

/** Feed card photo mosaic: one big, two small, "+N" on the last. */
export function ActivityMedia({ photos }: { photos: ActivityPhoto[] }) {
  const extra = photos.length - SHOWN
  return (
    <div className="media">
      {mediaTones(photos, SHOWN).map((photo, index) => (
        <span key={index} className="relative block overflow-hidden">
          <ActivityPhotoView photo={photo} crowd={index === 0} />
          {index === SHOWN - 1 && extra > 0 && <MoreOverlay count={extra} />}
        </span>
      ))}
    </div>
  )
}

function MoreOverlay({ count }: { count: number }) {
  return <span className="absolute inset-0 grid place-items-center bg-ink/55 font-mono font-semibold text-white">+{count}</span>
}
