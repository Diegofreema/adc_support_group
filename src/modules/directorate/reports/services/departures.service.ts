import { queryOptions } from '@tanstack/react-query'

import type { Page } from '../../shared/services/paging'
import { directorateKeys } from '../../shared/query-keys'
import type { Departure, DepartureFilter, DepartureKind, DepartureStatus } from '../types'
import { rpc } from '@/lib/supabase'

interface DepartureJson {
  kind: DepartureKind
  profile_id: string | null
  full_name: string | null
  group_id: string | null
  group_name: string | null
  state: string | null
  status: DepartureStatus
  at: string
  due_at: string | null
}

function toDeparture(row: DepartureJson, index: number): Departure {
  return {
    key: `${row.kind}-${row.profile_id ?? index}-${row.at}`,
    kind: row.kind,
    name: row.full_name ?? 'Former member',
    groupId: row.group_id ?? undefined,
    groupName: row.group_name ?? undefined,
    state: row.state ?? undefined,
    status: row.status,
    at: row.at,
    dueAt: row.due_at ?? undefined,
  }
}

/** Leavers and deletion requests, newest first (get_admin_sg_departures; staff-scoped). */
async function fetchDepartures(kind: DepartureFilter, limit: number, offset: number): Promise<Page<Departure>> {
  const page = await rpc<Page<DepartureJson>>('get_admin_sg_departures', { p_kind: kind, p_limit: limit, p_offset: offset })
  return { total: Number(page.total), rows: page.rows.map(toDeparture) }
}

export const departuresQuery = (kind: DepartureFilter, limit: number, offset: number) =>
  queryOptions({ queryKey: [...directorateKeys.departures(), kind, limit, offset], queryFn: () => fetchDepartures(kind, limit, offset) })
