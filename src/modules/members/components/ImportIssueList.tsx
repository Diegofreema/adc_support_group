import { Copy, MapPinOff, PhoneOff, UserX, type LucideIcon } from 'lucide-react'

import { IconTile, List, ListItem } from '@/components/shared'
import type { ImportRowIssue } from '../types'

const REASON_ICON: Record<string, LucideIcon> = {
  'Phone too short': PhoneOff,
  'Phone repeated': Copy,
  'Ward missing': MapPinOff,
}

function iconFor(reason: string): LucideIcon {
  return REASON_ICON[reason] ?? UserX
}

/** Rows that could not be added, with why. */
export function ImportIssueList({ issues }: { issues: ImportRowIssue[] }) {
  return (
    <List>
      {issues.map((issue) => (
        <ListItem key={issue.row} leading={<IconTile icon={iconFor(issue.reason)} tone="red" />} title={issue.name} meta={`Row ${issue.row} · ${issue.reason}`} />
      ))}
    </List>
  )
}
