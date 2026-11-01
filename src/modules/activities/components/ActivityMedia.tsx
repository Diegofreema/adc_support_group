import { PhotoPlaceholder } from '@/components/shared'
import type { PhotoTone } from '@/types/domain'
import { mediaTones } from '../utils/activity-display'

const SHOWN = 3

/** Feed card photo mosaic: one big, two small, "+N" on the last. */
export function ActivityMedia({ tones }: { tones: PhotoTone[] }) {
  const extra = tones.length - SHOWN
  return (
    <div className="media">
      {mediaTones(tones, SHOWN).map((tone, index) => (
        <span key={index} className="relative block">
          <PhotoPlaceholder tone={tone} crowd={index === 0} />
          {index === SHOWN - 1 && extra > 0 && <MoreOverlay count={extra} />}
        </span>
      ))}
    </div>
  )
}

function MoreOverlay({ count }: { count: number }) {
  return <span className="absolute inset-0 grid place-items-center bg-ink/55 font-mono font-semibold text-white">+{count}</span>
}
