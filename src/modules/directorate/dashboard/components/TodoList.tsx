import { ArrowRightLeft, ClipboardCheck, Landmark, ShieldCheck, type LucideIcon } from 'lucide-react'

import { IconTile, List, ListItem, type Tone } from '@/components/shared'
import { CountChip } from '../../shared/components/CountChip'
import type { DashboardTodo } from '../types'

interface TodoRow {
  key: keyof DashboardTodo
  title: string
  to: string
  icon: LucideIcon
  tone: Tone
}

const ROWS: TodoRow[] = [
  { key: 'groupsToVerify', title: 'Verify groups', to: '/admin/groups', icon: ShieldCheck, tone: 'amber' },
  { key: 'activitiesToCheck', title: 'Check activities', to: '/admin/activities', icon: ClipboardCheck, tone: 'blue' },
  { key: 'offlineToConfirm', title: 'Confirm offline payments', to: '/admin/payments', icon: Landmark, tone: 'red' },
  { key: 'handovers', title: 'Leader handovers', to: '/admin/settings', icon: ArrowRightLeft, tone: 'grey' },
]

/** What needs the Directorate's attention, with counts. */
export function TodoList({ todo }: { todo: DashboardTodo }) {
  return (
    <List>
      {ROWS.map((row) => (
        <ListItem key={row.key} to={row.to} title={row.title} leading={<IconTile icon={row.icon} tone={row.tone} />} trailing={<CountChip count={todo[row.key]} tone={row.tone} />} />
      ))}
    </List>
  )
}
