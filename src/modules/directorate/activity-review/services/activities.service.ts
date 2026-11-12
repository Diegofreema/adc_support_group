import { queryOptions } from '@tanstack/react-query'

import { directorateKeys } from '../../shared/query-keys'
import type { Page } from '../../shared/services/paging'
import type { ActivityFilterValues, ReviewActivity, ReviewStage } from '../types'
import { rpc } from '@/lib/supabase'
import type { ActivityStatus } from '@/types/domain'

const STAGES: ReviewStage[] = ['to-check', 'checked', 'rejected']
const QUEUE: Record<ReviewStage, string> = { 'to-check': 'to_check', checked: 'checked', rejected: 'rejected' }

/** private.support_group_activity_json */
export interface ActivityJson {
  id: string
  group_id: string
  group_name: string
  chapter_id: string | null
  chapter_name: string | null
  type: string
  type_name: string
  title: string
  occurred_on: string
  people_reached: number | null
  state: string | null
  lga: string | null
  ward: string | null
  note: string | null
  video_url: string | null
  media_urls: string[] | null
  status: ActivityStatus
  logged_by: string | null
  logged_by_name: string | null
  approved_by_name: string | null
  approved_at: string | null
  rejection_reason: string | null
  checked_by_directorate: boolean
  checked_at: string | null
  payment_id: string | null
  created_at: string
}

export function toReviewActivity(json: ActivityJson): ReviewActivity {
  return {
    id: json.id,
    groupId: json.group_id,
    groupName: json.group_name,
    chapterName: json.chapter_name ?? undefined,
    type: json.type_name,
    title: json.title,
    date: json.occurred_on,
    peopleReached: Number(json.people_reached ?? 0),
    photoTones: [],
    photoUrls: json.media_urls ?? [],
    videoUrl: json.video_url ?? undefined,
    note: json.note ?? undefined,
    state: json.state ?? undefined,
    lga: json.lga ?? undefined,
    ward: json.ward ?? undefined,
    status: json.status,
    loggedBy: json.logged_by_name ?? '',
    approvedBy: json.approved_by_name ?? undefined,
    checkedByDirectorate: json.checked_by_directorate,
    rejectionReason: json.rejection_reason ?? undefined,
    paymentId: json.payment_id ?? undefined,
  }
}

interface ActivityListArgs {
  queue: string | null
  state?: string
  type?: string
  search?: string
}

export function activityListArgs(args: ActivityListArgs, limit: number, offset: number): Record<string, unknown> {
  return {
    p_queue: args.queue,
    p_state: args.state || null,
    p_type: args.type || null,
    p_search: args.search?.trim() || null,
    p_limit: limit,
    p_offset: offset,
  }
}

async function fetchQueue(stage: ReviewStage, filters: ActivityFilterValues, limit: number, offset: number): Promise<Page<ReviewActivity>> {
  const args = activityListArgs({ queue: QUEUE[stage], state: filters.state, type: filters.type, search: filters.search }, limit, offset)
  const page = await rpc<Page<ActivityJson>>('get_admin_sg_activities', args)
  return { total: Number(page.total), rows: page.rows.map(toReviewActivity) }
}

async function fetchStageCounts(): Promise<Record<ReviewStage, number>> {
  const totals = await Promise.all(STAGES.map((stage) =>
    rpc<{ total: number }>('get_admin_sg_activities', activityListArgs({ queue: QUEUE[stage] }, 1, 0)).then((page) => Number(page.total))))
  return Object.fromEntries(STAGES.map((stage, index) => [stage, totals[index]])) as Record<ReviewStage, number>
}

export const reviewActivitiesQuery = (stage: ReviewStage, filters: ActivityFilterValues, limit: number, offset: number) =>
  queryOptions({ queryKey: [...directorateKeys.activities(), 'list', stage, filters, limit, offset], queryFn: () => fetchQueue(stage, filters, limit, offset) })

export const stageCountsQuery = queryOptions({ queryKey: [...directorateKeys.activities(), 'counts'], queryFn: fetchStageCounts })

/** Directorate confirms a leader-approved activity counts. */
export async function approveActivity(id: string): Promise<void> {
  await rpc('check_support_group_activity', { p_activity_id: id, p_ok: true, p_reason: null })
}

/** Reject (or overturn a check) with a reason the group reads. */
export async function rejectActivity(id: string, reason: string): Promise<void> {
  await rpc('check_support_group_activity', { p_activity_id: id, p_ok: false, p_reason: reason })
}
