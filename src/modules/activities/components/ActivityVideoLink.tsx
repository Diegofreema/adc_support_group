import { ExternalLink, Play } from 'lucide-react'

import { IconTile } from '@/components/shared'

export function ActivityVideoLink({ url }: { url: string }) {
  return (
    <a className="list-item card mt-4 !min-h-0 !px-4 !py-3.5" href={url} target="_blank" rel="noreferrer">
      <IconTile icon={Play} tone="grey" />
      <span className="grow">
        <span className="title block">Video</span>
        <span className="meta block truncate">{url.replace(/^https?:\/\//, '')}</span>
      </span>
      <ExternalLink className="i chev" aria-hidden />
    </a>
  )
}
