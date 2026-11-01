import { FileSpreadsheet, Send, Settings, Target, type LucideIcon } from 'lucide-react'

import { IconTile, List, ListItem } from '@/components/shared'

interface MenuEntry {
  to: string
  label: string
  icon: LucideIcon
}

const ENTRIES: MenuEntry[] = [
  { to: '/admin/causes', label: 'Causes', icon: Target },
  { to: '/admin/messages', label: 'Messages', icon: Send },
  { to: '/admin/reports', label: 'Reports', icon: FileSpreadsheet },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
]

/** Screens that don't fit in the phone tab bar. */
export function MoreMenu() {
  return (
    <List className="mt-4">
      {ENTRIES.map((entry) => <ListItem key={entry.to} to={entry.to} title={entry.label} leading={<IconTile icon={entry.icon} tone="grey" />} />)}
    </List>
  )
}
