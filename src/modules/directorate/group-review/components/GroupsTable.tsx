import { useNavigate } from '@tanstack/react-router'
import { ShieldCheck } from 'lucide-react'

import { DataTable, EmptyState } from '@/components/shared'
import type { GroupTab, ListGroup } from '../types'
import { GROUP_COLUMNS } from './group-columns'

const EMPTY_TITLE: Record<GroupTab, string> = {
  pending: 'No groups waiting to be verified',
  verified: 'No verified groups',
  rejected: 'No rejected groups',
  suspended: 'No suspended groups',
}

export function GroupsTable({ tab, rows, filtered }: { tab: GroupTab; rows: ListGroup[]; filtered?: boolean }) {
  const navigate = useNavigate()
  if (!rows.length) return <EmptyState icon={ShieldCheck} title={filtered ? 'No groups match these filters' : EMPTY_TITLE[tab]} />
  const openGroup = (group: ListGroup) => navigate({ to: '/admin/groups/$groupId', params: { groupId: group.id } })
  return <DataTable rows={rows} columns={GROUP_COLUMNS[tab]} rowKey={(group) => group.id} onRowClick={openGroup} />
}
