import { ArrowRightLeft, ClipboardCheck, Landmark, PencilLine, ShieldCheck, type LucideIcon } from 'lucide-react'

import { CircleCheck } from 'lucide-react'

import { EmptyState, IconTile, List, ListItem, type Tone } from '@/components/shared'
import { CountChip } from '../../shared/components/CountChip'
import type { DashboardTodo } from '../types'

interface TodoRow {
  key: keyof DashboardTodo
  title: string
  to: string
  search?: Record<string, string>
  icon: LucideIcon
  tone: Tone
}

const ROWS: TodoRow[] = [
  { key: 'groupsToVerify', title: 'New groups to check', to: '/admin/groups', icon: ShieldCheck, tone: 'amber' },
  { key: 'activitiesToCheck', title: 'Activities to check', to: '/admin/activities', icon: ClipboardCheck, tone: 'blue' },
  { key: 'offlineToConfirm', title: 'Payments to confirm', to: '/admin/payments', icon: Landmark, tone: 'red' },
  { key: 'handovers', title: 'Leader handovers to approve', to: '/admin/settings', search: { tab: 'handovers' }, icon: ArrowRightLeft, tone: 'grey' },
  { key: 'nameChanges', title: 'Group name changes to approve', to: '/admin/settings', search: { tab: 'names' }, icon: PencilLine, tone: 'grey' },
]

/** What needs the Directorate's attention, with counts. Rows with nothing waiting are left out. */
export function TodoList({ todo }: { todo: DashboardTodo }) {
  const rows = ROWS.filter((row) => todo[row.key] > 0)
  if (rows.length === 0) return <EmptyState icon={CircleCheck} title="All caught up" description="Nothing is waiting for the Directorate right now." />
  return (
    <List>
      {rows.map((row) => (
        <ListItem key={row.key} to={row.to} search={row.search} title={row.title} leading={<IconTile icon={row.icon} tone={row.tone} />} trailing={<CountChip count={todo[row.key]} tone={row.tone} />} />
      ))}
    </List>
  )
}
