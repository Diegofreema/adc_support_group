import { ArrowDownLeft, ArrowUpRight } from 'lucide-react'

import { IconTile, ListItem, StatusChip } from '@/components/shared'
import { formatDay, formatNaira } from '@/lib/format'
import { cn } from '@/lib/utils'
import type { MoneyEntry } from '../types'
import { entryDetail, entryTitle, isOut } from '../utils/labels'

/** One record: in (green) or out (red), amount on the right. Voided rows are struck through. */
export function EntryRow({ entry, onOpen }: { entry: MoneyEntry; onOpen: (entry: MoneyEntry) => void }) {
  const out = isOut(entry.kind)
  const meta = [formatDay(entry.occurredOn), entryDetail(entry)].filter(Boolean).join(' · ')
  return (
    <ListItem
      onClick={() => onOpen(entry)}
      leading={<IconTile icon={out ? ArrowUpRight : ArrowDownLeft} tone={entry.voided ? 'grey' : out ? 'red' : 'green'} />}
      title={<span className={cn(entry.voided && 'line-through faint')}>{entryTitle(entry)}</span>}
      meta={meta}
      trailing={<span className={cn('bold num', entry.voided && 'line-through faint')}>{out ? '−' : '+'}{formatNaira(entry.amount)}</span>}
    >
      {entry.voided && <span className="mt-1 block"><StatusChip status="rejected" label="Voided" /> <span className="small muted">{entry.voidReason}</span></span>}
    </ListItem>
  )
}
