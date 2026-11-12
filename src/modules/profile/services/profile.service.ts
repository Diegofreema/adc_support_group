import type { MenuCounts, PendingDeletion, Profile } from '../types/profile.types'
import type { ProfileValues } from '../utils/schemas'
import { login, refreshSessionUser } from '@/modules/auth'
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

/** The sign-in email on the account (the phone alias for phone accounts). */
async function signInEmail(): Promise<string> {
  const { data } = await supabase.auth.getSession()
  return (data.session?.user.email ?? '').toLowerCase()
}

export async function fetchProfile(userId: string): Promise<Profile> {
  const [row, mine, authEmail] = await Promise.all([readProfileRow(userId), rpc<MySupportGroup>('get_my_support_group'), signInEmail()])
  const email = realEmail(row.email)
  return {
    fullName: row.full_name ?? '',
    phone: row.phone ? formatPhone(row.phone) : '',
    email,
    emailConfirmed: !!email && email.toLowerCase() === authEmail,
    state: row.state ?? '',
    lga: row.lga ?? '',
    ward: row.ward ?? '',
    groups: groupsOf(mine),
    isLeader: mine.is_leader,
    pendingDeletion: toPendingDeletion(mine.pending_deletion),
  }
}

/** Only the self-editable columns. Email changes go through a code (see startEmailCheck). */
export async function updateProfile(userId: string, values: ProfileValues): Promise<Profile> {
  const changes: Record<string, string> = { full_name: values.fullName.trim(), state: values.state, lga: values.lga, ward: values.ward }
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
/**
 * Set the new password. The server signs the account out everywhere when the
 * password changes, this session included, so sign straight back in with it.
 */
export async function completePasswordChange(challengeId: string, otp: string, password: string, identifier: string): Promise<void> {
  await invokeFunction('auth-phone-change-password-complete', { challengeId, otp, password })
  await login({ identifier, password })
}

export async function fetchMenuCounts(): Promise<MenuCounts> {
  const mine = await rpc<MySupportGroup>('get_my_support_group')
  return { members: Number(mine.group?.member_count ?? 0), chapters: Number(mine.group?.chapter_count ?? 0) }
}

export interface EmailCheck {
  challengeId: string
  sentTo: string
}

/** Email a 6-digit code to the address. Nothing is saved until the code checks out. */
export async function startEmailCheck(email: string): Promise<EmailCheck> {
  const result = await invokeFunction<{ challenge_id: string; sent_to: string }>('auth-email-verify-initiate', { email: email.trim() })
  return { challengeId: result.challenge_id, sentTo: result.sent_to }
}

/** Check the code: the email goes on the profile and becomes a sign-in email. */
export async function finishEmailCheck(challengeId: string, code: string): Promise<void> {
  await invokeFunction('auth-email-verify-complete', { challengeId, otp: code })
  // The session still carries the old sign-in email until it is refreshed.
  await supabase.auth.refreshSession()
  await refreshSessionUser()
}

