import { fetchAllPages, type Page } from '../../shared/services/paging'
import { groupListArgs, type GroupJson } from '../../shared/services/group-json'
import { periodStart } from '../../shared/utils/period'
import type { ExportSpec, ExportTable } from '../types'
import { rpc } from '@/lib/supabase'

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

/** get_admin_sg_member_export row: one person in one verified group (leaders included). */
interface MemberRow {
  group_name: string
  full_name: string | null
  phone: string | null
  email: string | null
  state: string | null
  lga: string | null
  ward: string | null
  member_role: string
  title: string | null
  chapter_name: string | null
  joined_via: string | null
  joined_at: string | null
}

function sinceFilter(period: string): (iso: string | null | undefined) => boolean {
  const start = periodStart(period)
  return (iso) => !start || (Boolean(iso) && new Date(iso as string) >= start)
}

/** Groups matching the state and category filters (any status). */
function fetchGroups(spec: ExportSpec): Promise<GroupJson[]> {
  return fetchAllPages((limit, offset) =>
    rpc<Page<GroupJson>>('get_admin_sg_groups', groupListArgs({ state: spec.state, categoryId: spec.category }, limit, offset)), 500)
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

/** Members export page size (the RPC allows up to 5000). */
const MEMBER_PAGE = 2000

/** One roster across every verified group in the filters (state, category applied by the server). */
async function membersTable(spec: ExportSpec): Promise<ExportTable> {
  const members = await fetchAllPages((limit, offset) => rpc<Page<MemberRow>>('get_admin_sg_member_export', {
    p_state: spec.state || null, p_category_id: spec.category || null, p_group_id: null, p_limit: limit, p_offset: offset,
  }), MEMBER_PAGE, 200_000)
  // Leaders have no join date; they stay in the roster whatever the period.
  const since = sinceFilter(spec.period)
  const rows = members.filter((member) => member.member_role === 'leader' || since(member.joined_at))
  return {
    headers: ['Group', 'Member', 'Phone', 'Email', 'Role', 'Title', 'Chapter', 'State', 'LGA', 'Ward', 'Joined via', 'Joined'],
    rows: rows.map((member) => [
      member.group_name, member.full_name, member.phone, member.email, member.member_role, member.title, member.chapter_name,
      member.state, member.lga, member.ward, member.joined_via, member.joined_at?.slice(0, 10),
    ]),
  }
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
