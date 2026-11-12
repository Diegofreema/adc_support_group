import { queryOptions } from '@tanstack/react-query'

import type { Page } from '../../shared/services/paging'
import { directorateKeys } from '../../shared/query-keys'
import type { GroupAuditEntry } from '../types'
import { rpc } from '@/lib/supabase'

interface AuditJson {
  id: string | number
  action: string
  actor_name: string | null
  actor_is_staff: boolean | null
  /** The leader's title or the member's title in the group today. */
  actor_title: string | null
  /** The person, activity title or chapter name acted on. */
  target_name: string | null
  details: Record<string, unknown> | null
  at: string
}

function toEntry(row: AuditJson): GroupAuditEntry {
  return {
    id: String(row.id),
    action: row.action,
    actorName: row.actor_name ?? 'Someone',
    actorIsStaff: Boolean(row.actor_is_staff),
    actorTitle: row.actor_title?.trim() || undefined,
    targetName: row.target_name?.trim() || undefined,
    details: row.details ?? {},
    at: row.at,
  }
}

/** A group's audit log, newest first (get_admin_sg_group_history; staff-scoped). */
async function fetchGroupHistory(groupId: string, limit: number, offset: number): Promise<Page<GroupAuditEntry>> {
  const page = await rpc<Page<AuditJson>>('get_admin_sg_group_history', { p_group_id: groupId, p_limit: limit, p_offset: offset })
  return { total: Number(page.total), rows: page.rows.map(toEntry) }
}

export const groupHistoryQuery = (groupId: string, limit: number, offset: number) =>
  queryOptions({
    queryKey: [...directorateKeys.groupHistory(groupId), limit, offset],
    queryFn: () => fetchGroupHistory(groupId, limit, offset),
  })
