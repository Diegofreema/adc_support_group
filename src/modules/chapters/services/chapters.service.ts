import type { ChapterActivity, ChapterRecord, NewChapterInput } from '../types'
import type { ActivityTypeId } from '@/config/activity-types'
import { invokeFunction } from '@/lib/edge-functions'
import { formatNumber } from '@/lib/format'
import { normalisePhone } from '@/lib/phone'
import { rpc } from '@/lib/supabase'
import type { ActivityStatus } from '@/types/domain'

/** private.support_group_chapter_json */
interface ChapterJson {
  id: string
  group_id: string
  name: string
  level: ChapterRecord['level']
  state: string
  lga: string | null
  ward: string | null
  join_code: string
  coordinator_profile_id: string | null
  coordinator_name: string | null
  coordinator_phone?: string | null
  member_count: number
  member_growth?: number
  lga_count?: number
  activity_count: number
  amount_given: number | string
}

function toChapter(json: ChapterJson): ChapterRecord {
  return {
    id: json.id,
    groupId: json.group_id,
    name: json.name,
    level: json.level,
    state: json.state,
    lga: json.lga ?? undefined,
    ward: json.ward ?? undefined,
    coordinatorName: json.coordinator_name ?? 'No coordinator yet',
    coordinatorPhone: json.coordinator_phone ? normalisePhone(json.coordinator_phone) : '',
    memberCount: Number(json.member_count),
    memberGrowth: Number(json.member_growth ?? 0),
    activityCount: Number(json.activity_count),
    amountGiven: Number(json.amount_given),
    lgaCount: Number(json.lga_count ?? (json.level === 'state' ? 0 : 1)),
    joinCode: json.join_code,
  }
}

/** Chapters of the caller's own group (any member may list them). */
export async function fetchChapters(_groupId: string): Promise<ChapterRecord[]> {
  const chapters = await rpc<ChapterJson[]>('get_support_group_chapters').catch((error: Error) => {
    // A group still waiting for the Directorate has no chapters yet.
    if (/not been verified/.test(error.message)) return []
    throw error
  })
  return chapters.map(toChapter)
}

export async function fetchChapter(chapterId: string): Promise<ChapterRecord> {
  return toChapter(await rpc<ChapterJson>('get_support_group_chapter', { p_chapter_id: chapterId }))
}

interface ActivityJson {
  id: string
  type: string
  title: string
  occurred_on: string
  people_reached: number
  status: ActivityStatus
}

export async function fetchChapterActivities(chapterId: string): Promise<ChapterActivity[]> {
  const { rows } = await rpc<{ rows: ActivityJson[] }>('get_support_group_activities', { p_chapter_id: chapterId, p_limit: 20 })
  return rows.map((row) => ({
    id: row.id,
    chapterId,
    type: row.type as ActivityTypeId,
    title: row.title,
    date: row.occurred_on,
    reach: `${formatNumber(row.people_reached)} people`,
    status: row.status,
  }))
}

interface RosterMatch {
  profile_id: string
  full_name: string
  phone: string | null
}

async function searchRoster(query: string): Promise<RosterMatch[]> {
  const { rows } = await rpc<{ rows: RosterMatch[] }>('get_support_group_roster', { p_search: query, p_limit: 5 })
  return rows
}

const looksLikePhone = (value: string) => /\d{7,}/.test(value.replace(/\D/g, ''))

/**
 * The coordinator must be a member of the group. Find them by name or phone;
 * a phone that isn't a member yet but has an account (here or on Rise Up) is
 * added to the group first.
 */
async function resolveCoordinator(query: string): Promise<string> {
  const value = query.trim()
  if (!value) throw new Error('Enter the coordinator')
  const phone = looksLikePhone(value) ? normalisePhone(value) : null
  const matches = await searchRoster(phone ?? value)
  const exact = phone
    ? matches.filter((row) => row.phone && normalisePhone(row.phone) === phone)
    : matches.filter((row) => row.full_name.toLowerCase() === value.toLowerCase())
  const pick = exact.length === 1 ? exact[0] : matches.length === 1 ? matches[0] : undefined
  if (pick) return pick.profile_id
  if (!phone) throw new Error(matches.length ? 'Several members match. Use their phone number' : 'No member with that name. Use their phone number')

  const { results } = await invokeFunction<{ results: { result: string; error?: string }[] }>(
    'support-group-add-members',
    { rows: [{ fullName: '', phone }], joinedVia: 'manual' },
  )
  const outcome = results[0]
  if (outcome?.result !== 'added' && outcome?.result !== 'already_member') {
    throw new Error(
      outcome?.result === 'invalid'
        ? 'This phone has no account yet. Add them on the Members page first'
        : outcome?.result === 'other_group' ? 'This person is in another group' : 'Could not add this person',
    )
  }
  const added = (await searchRoster(phone)).find((row) => row.phone && normalisePhone(row.phone) === phone)
  if (!added) throw new Error('Could not find the coordinator after adding them')
  return added.profile_id
}

export async function createChapter(_groupId: string, input: NewChapterInput): Promise<ChapterRecord> {
  const coordinatorId = await resolveCoordinator(input.coordinatorPhone)
  const chapter = await rpc<ChapterJson>('create_support_group_chapter', {
    p_name: input.name,
    p_level: input.level,
    p_state: input.state,
    p_lga: input.lga || null,
    p_ward: input.ward || null,
    p_coordinator_profile_id: coordinatorId,
  })
  return toChapter(chapter)
}

export async function changeCoordinator(chapterId: string, coordinator: string): Promise<ChapterRecord> {
  const coordinatorId = await resolveCoordinator(coordinator)
  const current = await fetchChapter(chapterId)
  return toChapter(await rpc<ChapterJson>('update_support_group_chapter', {
    p_chapter_id: chapterId,
    p_name: current.name,
    p_coordinator_profile_id: coordinatorId,
  }))
}
