import { PhotoPlaceholder } from '@/components/shared'
import { cn } from '@/lib/utils'

/** Big photo + two small ones; "+N" on the last when there are more. A placeholder when there are none. */
export function ActivityMedia({ urls }: { urls: string[] }) {
  if (!urls.length) return <div className="media"><PhotoPlaceholder tone={1} /></div>
  const shown = urls.slice(0, 3)
  const extra = urls.length - shown.length
  return (
    <div className="media">
      {shown.map((url, index) => (
        <a key={url} href={url} target="_blank" rel="noreferrer" className={cn('block h-full', index === 2 && extra > 0 && 'more')}>
          <img src={url} alt={`Photo ${index + 1}`} loading="lazy" className="h-full w-full object-cover" />
          {index === 2 && extra > 0 && <span>+{extra}</span>}
        </a>
      ))}
    </div>
  )
}
