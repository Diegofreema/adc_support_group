import { useNavigate } from '@tanstack/react-router'
import { ShieldCheck } from 'lucide-react'

import { DataTable, EmptyState } from '@/components/shared'
import type { GroupTab, ReviewGroup } from '../types'
import { GROUP_COLUMNS } from './group-columns'

export function GroupsTable({ tab, rows }: { tab: GroupTab; rows: ReviewGroup[] }) {
  const navigate = useNavigate()
  if (!rows.length) return <EmptyState icon={ShieldCheck} title="Nothing here" />
  const openGroup = (group: ReviewGroup) => navigate({ to: '/admin/groups/$groupId', params: { groupId: group.id } })
  return <DataTable rows={rows} columns={GROUP_COLUMNS[tab]} rowKey={(group) => group.id} onRowClick={openGroup} />
}
