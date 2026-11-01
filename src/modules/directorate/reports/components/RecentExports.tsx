import { Download, FileSpreadsheet } from 'lucide-react'

import { IconTile, List, ListItem, SectionTitle } from '@/components/shared'
import { formatDay } from '@/lib/format'
import { notify } from '@/lib/toast'
import { useRecentExports } from '../hooks/use-exports'

export function RecentExports() {
  const exports = useRecentExports()
  return (
    <>
      <SectionTitle title="Recent" className="mt-0" />
      <List>
        {exports.map((item) => (
          <ListItem key={item.id} leading={<IconTile icon={FileSpreadsheet} tone="grey" />} title={item.label} meta={`${item.format === 'csv' ? 'CSV' : 'Excel'} · ${formatDay(item.createdAt)}`} trailing={<Download className="i chev" aria-hidden />} onClick={() => notify('Downloading')} />
        ))}
      </List>
    </>
  )
}
