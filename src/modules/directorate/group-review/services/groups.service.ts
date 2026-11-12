import { queryOptions } from '@tanstack/react-query'

import type { Page } from '../../shared/services/paging'
import { groupListArgs, toGroup, type GroupJson, type GroupListArgs } from '../../shared/services/group-json'
import { directorateKeys } from '../../shared/query-keys'
import { groupPlace } from '../utils/group-filters'
import type { GroupHistoryEntry, GroupTab, ListGroup, ReviewGroup } from '../types'
import { rpc } from '@/lib/supabase'

const TABS: GroupTab[] = ['pending', 'verified', 'rejected', 'suspended']

/** review_note is the rejection reason or the suspension reason, depending on status. */
function toListGroup(json: GroupJson): ListGroup {
  const group = { ...toGroup(json), decidedAt: json.reviewed_at ?? undefined }
  if (group.status !== 'suspended') return group
  return { ...group, rejectionReason: undefined, suspendedReason: json.review_note ?? undefined }
}

interface GroupDetailJson extends GroupJson {
  possible_duplicate: GroupJson | null
}

interface GroupReviewJson {
  members_by_link: number
  members_by_excel: number
  leader_phone_verified: boolean
  history: { title: string; date: string; by: string | null }[]
}

async function fetchGroups(args: GroupListArgs, limit: number, offset: number): Promise<Page<ListGroup>> {
  const page = await rpc<Page<GroupJson>>('get_admin_sg_groups', groupListArgs(args, limit, offset))
  return { total: Number(page.total), rows: page.rows.map(toListGroup) }
}

/** How many groups sit in each status (unfiltered). */
async function fetchGroupCounts(): Promise<Record<GroupTab, number>> {
  const totals = await Promise.all(TABS.map((status) =>
    rpc<{ total: number }>('get_admin_sg_groups', groupListArgs({ status }, 1, 0)).then((page) => Number(page.total))))
  return Object.fromEntries(TABS.map((tab, index) => [tab, totals[index]])) as Record<GroupTab, number>
}

function toHistory(entries: GroupReviewJson['history']): GroupHistoryEntry[] {
  return [...entries]
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((entry) => ({ title: entry.title, date: entry.date, by: entry.by ?? undefined }))
}

function toDuplicate(json: GroupJson | null): ReviewGroup['duplicate'] {
  if (!json) return undefined
  const group = toGroup(json)
  return { id: group.id, name: group.name, place: groupPlace(group), memberCount: group.memberCount }
}

async function fetchGroup(id: string): Promise<ReviewGroup> {
  const [detail, extras] = await Promise.all([
    rpc<GroupDetailJson>('get_admin_sg_group', { p_group_id: id }),
    rpc<GroupReviewJson>('get_admin_sg_group_review', { p_group_id: id }),
  ])
  const group = toListGroup(detail)
  return {
    ...group,
    possibleDuplicateOf: detail.possible_duplicate?.name,
    duplicate: toDuplicate(detail.possible_duplicate),
    leaderPhoneChecked: extras.leader_phone_verified,
    membersByLink: Number(extras.members_by_link),
    membersByExcel: Number(extras.members_by_excel),
    history: toHistory(extras.history),
  }
}

export const groupsQuery = (args: GroupListArgs, limit: number, offset: number) =>
  queryOptions({ queryKey: [...directorateKeys.groups(), 'list', args, limit, offset], queryFn: () => fetchGroups(args, limit, offset) })

export const groupCountsQuery = queryOptions({ queryKey: [...directorateKeys.groups(), 'counts'], queryFn: fetchGroupCounts })

export const groupQuery = (id: string) =>
  queryOptions({ queryKey: directorateKeys.group(id), queryFn: () => fetchGroup(id) })

type Decision = 'verified' | 'rejected' | 'suspended'

/** review_support_group: the leader is notified and the decision is audited. */
async function decide(id: string, decision: Decision, note?: string): Promise<void> {
  await rpc('review_support_group', { p_group_id: id, p_decision: decision, p_note: note ?? null })
}

export const verifyGroup = (id: string) => decide(id, 'verified')

export const rejectGroup = (id: string, reason: string) => decide(id, 'rejected', reason)

export const suspendGroup = (id: string, reason: string) => decide(id, 'suspended', reason)

/** A suspended group goes back to verified. */
export const restoreGroup = (id: string) => decide(id, 'verified')

/** Sends the leader a message; status stays pending. */
export async function askForInfo(id: string, message: string): Promise<void> {
  await rpc('ask_support_group_info', { p_group_id: id, p_message: message })
}
