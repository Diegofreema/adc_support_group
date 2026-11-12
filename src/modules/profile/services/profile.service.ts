import type { MenuCounts, PendingDeletion, Profile } from '../types/profile.types'
import type { ProfileValues } from '../utils/schemas'
import { refreshSessionUser } from '@/modules/auth'
import type { MyGroup } from '@/modules/home'
import { invokeFunction } from '@/lib/edge-functions'
import { formatPhone } from '@/lib/phone'
import { rpc, supabase } from '@/lib/supabase'
import type { MemberRole } from '@/types/domain'

interface ProfileRow {
  full_name: string | null
  phone: string | null
  email: string | null
  state: string | null
  lga: string | null
  ward: string | null
}

interface MySupportGroup {
  is_leader: boolean
  group: { id: string; name: string; member_count: number; chapter_count: number } | null
  membership: { member_role: Exclude<MemberRole, 'leader'>; chapter_name: string | null } | null
  pending_deletion?: DeletionRow | null
}

interface DeletionRow {
  requested_at: string
  due_at: string
}

function toPendingDeletion(row: DeletionRow | null | undefined): PendingDeletion | null {
  return row ? { requestedAt: row.requested_at, dueAt: row.due_at } : null
}

/** Aliases like phone-234803…@auth.riseup.local are not real addresses. */
function realEmail(email: string | null): string {
  return email && !email.endsWith('.local') ? email : ''
}

function groupsOf(mine: MySupportGroup): MyGroup[] {
  if (!mine.group) return []
  const role: MemberRole = mine.is_leader ? 'leader' : mine.membership?.member_role ?? 'member'
  return [{ id: mine.group.id, name: mine.group.name, role, chapterName: mine.membership?.chapter_name ?? undefined }]
}

async function readProfileRow(userId: string): Promise<ProfileRow> {
  const { data, error } = await supabase
    .from('profiles')
    .select('full_name, phone, email, state, lga, ward')
    .eq('id', userId)
    .single<ProfileRow>()
  if (error) throw new Error(error.message)
  return data
}

export async function fetchProfile(userId: string): Promise<Profile> {
  const [row, mine] = await Promise.all([readProfileRow(userId), rpc<MySupportGroup>('get_my_support_group')])
  return {
    fullName: row.full_name ?? '',
    phone: row.phone ? formatPhone(row.phone) : '',
    email: realEmail(row.email),
    state: row.state ?? '',
    lga: row.lga ?? '',
    ward: row.ward ?? '',
    groups: groupsOf(mine),
    isLeader: mine.is_leader,
    pendingDeletion: toPendingDeletion(mine.pending_deletion),
  }
}

/**
 * Only the self-editable columns. An empty email leaves the stored one alone
 * (phone accounts keep their sign-in alias there).
 */
export async function updateProfile(userId: string, values: ProfileValues): Promise<Profile> {
  const changes: Record<string, string> = { full_name: values.fullName.trim(), state: values.state, lga: values.lga, ward: values.ward }
  if (values.email) changes.email = values.email.trim()
  const { error } = await supabase.from('profiles').update(changes).eq('id', userId)
  if (error) throw new Error(error.message)
  await refreshSessionUser()
  return fetchProfile(userId)
}

/** A member leaves their group at once; their history stays with the group. Leaders are refused. */
export async function leaveGroup(): Promise<void> {
  await rpc('leave_support_group')
  await refreshSessionUser()
}

/** Asks to delete name, phone and email in 7 days. Calling again returns the same request. */
export async function requestAccountDeletion(): Promise<PendingDeletion> {
  return toPendingDeletion(await rpc<DeletionRow>('request_my_account_deletion'))!
}

export async function cancelAccountDeletion(): Promise<void> {
  await rpc('cancel_my_account_deletion')
}

export type CodeChannel = 'email' | 'sms'

export interface PasswordChallenge {
  challengeId: string
  /** Where the code went, e.g. "your phone" or the masked email. */
  sentTo: string
}

/** The account has both email and phone: the person picks; values are masked. */
export interface ChannelChoice {
  email: string
  sms: string
}

export type StartPasswordChange =
  | { kind: 'sent'; challenge: PasswordChallenge }
  | { kind: 'choose'; channels: ChannelChoice }

interface InitiateResult {
  challenge_id?: string
  phone?: string
  needs_channel?: boolean
  channels?: ChannelChoice
}

/**
 * Step 1: send a code. With both email and phone on file and no channel,
 * the function sends nothing and asks which one (roadmap: the person chooses).
 */
export async function startPasswordChange(channel?: CodeChannel, choice?: ChannelChoice): Promise<StartPasswordChange> {
  const result = await invokeFunction<InitiateResult>('auth-phone-change-password-initiate', channel ? { channel } : undefined)
  if (result.needs_channel && result.channels) return { kind: 'choose', channels: result.channels }
  const sentTo = channel === 'email' ? choice?.email ?? 'your email' : formatPhone(result.phone ?? '') || 'your phone'
  return { kind: 'sent', challenge: { challengeId: result.challenge_id!, sentTo } }
}

/** Step 2: the code plus the new password. */
export async function completePasswordChange(challengeId: string, otp: string, password: string): Promise<void> {
  await invokeFunction('auth-phone-change-password-complete', { challengeId, otp, password })
}

export async function fetchMenuCounts(): Promise<MenuCounts> {
  const mine = await rpc<MySupportGroup>('get_my_support_group')
  return { members: Number(mine.group?.member_count ?? 0), chapters: Number(mine.group?.chapter_count ?? 0) }
}
