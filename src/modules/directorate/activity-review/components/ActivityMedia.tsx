import { PhotoPlaceholder } from '@/components/shared'
import { cn } from '@/lib/utils'
import type { PhotoTone } from '@/types/domain'

/** Big photo + two small ones; "+N" on the last when there are more. */
export function ActivityMedia({ tones }: { tones: PhotoTone[] }) {
  const shown = tones.slice(0, 3)
  const extra = tones.length - shown.length
  return (
    <div className="media">
      {shown.map((tone, index) => (
        <span key={index} className={cn('block h-full', index === 2 && extra > 0 && 'more')}>
          <PhotoPlaceholder tone={tone} crowd={index === 0} />
          {index === 2 && extra > 0 && <span>+{extra}</span>}
        </span>
      ))}
    </div>
  )
}
