import { Download, FileSpreadsheet } from 'lucide-react'

import { IconTile, List, ListItem, SectionTitle } from '@/components/shared'
import { formatDay, formatNumber } from '@/lib/format'
import { useRecentExports, useRedownload } from '../hooks/use-exports'

/** Exports made in this browser; tapping one downloads it again with today's data. */
export function RecentExports() {
  const exports = useRecentExports()
  const { redownload, preparing } = useRedownload()
  if (!exports.length) return null
  return (
    <>
      <SectionTitle title="Recent" className="mt-0" />
      <List>
        {exports.map((item) => (
          <ListItem
            key={item.id}
            leading={<IconTile icon={FileSpreadsheet} tone="grey" />}
            title={item.label}
            meta={`CSV · ${formatNumber(item.rows)} rows · ${formatDay(item.createdAt)}`}
            trailing={<Download className="i chev" aria-hidden />}
            onClick={preparing ? undefined : () => redownload(item)}
          />
        ))}
      </List>
    </>
  )
}
