import { fetchAllPages, type Page } from '../../shared/services/paging'
import { groupListArgs, type GroupJson } from '../../shared/services/group-json'
import { periodStart } from '../../shared/utils/period'
import type { ExportSpec, ExportTable } from '../types'
import { rpc } from '@/lib/supabase'

/** Members are read group by group; past this many groups, ask for a narrower export. */
const MEMBER_GROUP_LIMIT = 100

interface ActivityRow {
  group_id: string
  group_name: string
  chapter_name: string | null
  type_name: string
  title: string
  occurred_on: string
  people_reached: number | null
  state: string | null
  lga: string | null
  status: string
  checked_by_directorate: boolean
  logged_by_name: string | null
  approved_by_name: string | null
  rejection_reason: string | null
}

interface PaymentRow {
  group_id: string
  group_name: string
  chapter_name: string | null
  cause_title: string | null
  purpose: string | null
  amount: number | string
  method: string
  status: string
  reference: string | null
  paid_on: string | null
  payer_name: string | null
  created_at: string
}

interface MemberRow {
  full_name: string
  status: string
  joined_at: string
  activity_count: number
  total_count: number
}

function sinceFilter(period: string): (iso: string | null | undefined) => boolean {
  const start = periodStart(period)
  return (iso) => !start || (Boolean(iso) && new Date(iso as string) >= start)
}

/** Groups matching the state and category filters (any status unless given). */
function fetchGroups(spec: ExportSpec, status?: 'verified'): Promise<GroupJson[]> {
  return fetchAllPages((limit, offset) =>
    rpc<Page<GroupJson>>('get_admin_sg_groups', groupListArgs({ status, state: spec.state, categoryId: spec.category }, limit, offset)), 500)
}

/** Only rows from groups in the chosen state / category (activities and payments have no category). */
async function groupFilter(spec: ExportSpec): Promise<(groupId: string) => boolean> {
  if (!spec.state && !spec.category) return () => true
  const ids = new Set((await fetchGroups(spec)).map((group) => group.id))
  return (groupId) => ids.has(groupId)
}

async function groupsTable(spec: ExportSpec): Promise<ExportTable> {
  const since = sinceFilter(spec.period)
  const groups = (await fetchGroups(spec)).filter((group) => since(group.submitted_at ?? group.created_at))
  return {
    headers: ['Group', 'Status', 'Category', 'Level', 'State', 'LGA', 'Ward', 'Country', 'City', 'Leader', 'Leader phone', 'Members', 'Chapters', 'Activities', 'Amount given', 'CAC', 'Submitted'],
    rows: groups.map((group) => [
      group.name, group.status, group.category, group.level, group.state, group.lga, group.ward, group.country, group.city,
      group.leader_name, group.leader_phone, group.member_count, group.chapter_count, group.activity_count, Number(group.amount_given),
      group.cac_number, (group.submitted_at ?? group.created_at).slice(0, 10),
    ]),
  }
}

async function activitiesTable(spec: ExportSpec): Promise<ExportTable> {
  const since = sinceFilter(spec.period)
  const [inGroups, activities] = await Promise.all([
    spec.category ? groupFilter({ ...spec, state: '' }) : Promise.resolve(() => true),
    fetchAllPages((limit, offset) => rpc<Page<ActivityRow>>('get_admin_sg_activities', {
      p_queue: null, p_state: spec.state || null, p_type: null, p_search: null, p_limit: limit, p_offset: offset,
    }), 200),
  ])
  const rows = activities.filter((row) => inGroups(row.group_id) && since(row.occurred_on))
  return {
    headers: ['Date', 'Activity', 'Type', 'Group', 'Chapter', 'State', 'LGA', 'People reached', 'Status', 'Checked by Directorate', 'Recorded by', 'Approved by', 'Rejection reason'],
    rows: rows.map((row) => [
      row.occurred_on, row.title, row.type_name, row.group_name, row.chapter_name, row.state, row.lga, row.people_reached ?? 0,
      row.status, row.checked_by_directorate ? 'Yes' : 'No', row.logged_by_name, row.approved_by_name, row.rejection_reason,
    ]),
  }
}

async function paymentsTable(spec: ExportSpec): Promise<ExportTable> {
  const since = sinceFilter(spec.period)
  const [inGroups, payments] = await Promise.all([
    groupFilter(spec),
    fetchAllPages((limit, offset) => rpc<Page<PaymentRow>>('get_admin_sg_payments', {
      p_status: null, p_method: null, p_cause_id: null, p_search: null, p_limit: limit, p_offset: offset,
    }), 500),
  ])
  const rows = payments.filter((row) => inGroups(row.group_id) && since(row.paid_on ?? row.created_at))
  return {
    headers: ['Date', 'Group', 'Chapter', 'For', 'Amount', 'Method', 'Status', 'Reference', 'Paid by'],
    rows: rows.map((row) => [
      (row.paid_on ?? row.created_at).slice(0, 10), row.group_name, row.chapter_name, row.cause_title ?? row.purpose,
      Number(row.amount), row.method, row.status, row.reference, row.payer_name,
    ]),
  }
}

/** Every member of one group (names only: that is all the admin member RPC returns). */
async function groupMembers(groupId: string): Promise<MemberRow[]> {
  return fetchAllPages(async (limit, offset) => {
    const rows = await rpc<MemberRow[]>('get_admin_support_group_members', { p_group_id: groupId, p_limit: limit, p_offset: offset, p_search: null })
    return { total: Number(rows[0]?.total_count ?? 0), rows }
  }, 200)
}

async function membersTable(spec: ExportSpec): Promise<ExportTable> {
  const groups = await fetchGroups(spec, 'verified')
  if (groups.length > MEMBER_GROUP_LIMIT) {
    throw new Error(`That covers ${groups.length} groups. Pick a state or category to export members (up to ${MEMBER_GROUP_LIMIT} groups at a time).`)
  }
  const since = sinceFilter(spec.period)
  const rows: ExportTable['rows'] = []
  for (const group of groups) {
    const members = await groupMembers(group.id)
    members.filter((member) => since(member.joined_at)).forEach((member) => {
      rows.push([group.name, group.state, group.category, member.full_name, member.status, member.joined_at.slice(0, 10), Number(member.activity_count)])
    })
  }
  return { headers: ['Group', 'State', 'Category', 'Member', 'Status', 'Joined', 'Activities logged'], rows }
}

const BUILDERS: Record<ExportSpec['subject'], (spec: ExportSpec) => Promise<ExportTable>> = {
  groups: groupsTable,
  activities: activitiesTable,
  payments: paymentsTable,
  members: membersTable,
}

/** Read everything the export covers from the admin list RPCs (the server applies the staff's state scope). */
export function buildExportTable(spec: ExportSpec): Promise<ExportTable> {
  return BUILDERS[spec.subject](spec)
}
