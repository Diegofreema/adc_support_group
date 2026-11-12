import type { AlertPreferences, MenuCounts, Profile } from '../types/profile.types'
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
}

const DEFAULT_ALERTS: AlertPreferences = { email: true, sms: true }

/** Aliases like phone-234803…@auth.riseup.local are not real addresses. */
function realEmail(email: string | null): string {
  return email && !email.endsWith('.local') ? email : ''
}

function groupsOf(mine: MySupportGroup): MyGroup[] {
  if (!mine.group) return []
  const role: MemberRole = mine.is_leader ? 'leader' : mine.membership?.member_role ?? 'member'
  return [{ id: mine.group.id, name: mine.group.name, role, chapterName: mine.membership?.chapter_name ?? undefined }]
}

/** No table holds alert choices; they live in the auth user's metadata. */
async function readAlerts(): Promise<AlertPreferences> {
  const { data } = await supabase.auth.getSession()
  const saved = data.session?.user.user_metadata?.adc_alerts as Partial<AlertPreferences> | undefined
  return { ...DEFAULT_ALERTS, ...saved }
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
  const [row, mine, alerts] = await Promise.all([readProfileRow(userId), rpc<MySupportGroup>('get_my_support_group'), readAlerts()])
  return {
    fullName: row.full_name ?? '',
    phone: row.phone ? formatPhone(row.phone) : '',
    email: realEmail(row.email),
    state: row.state ?? '',
    lga: row.lga ?? '',
    ward: row.ward ?? '',
    groups: groupsOf(mine),
    alerts,
    language: 'English',
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

export async function updateAlerts(_userId: string, alerts: AlertPreferences): Promise<AlertPreferences> {
  const { error } = await supabase.auth.updateUser({ data: { adc_alerts: alerts } })
  if (error) throw new Error(error.message)
  return alerts
}

export interface PasswordChallenge {
  challengeId: string
  phone: string
}

/** Step 1: text a code to the account's phone. */
export async function startPasswordChange(): Promise<PasswordChallenge> {
  const result = await invokeFunction<{ challenge_id: string; phone: string }>('auth-phone-change-password-initiate')
  return { challengeId: result.challenge_id, phone: result.phone }
}

/** Step 2: the code plus the new password. */
export async function completePasswordChange(challengeId: string, otp: string, password: string): Promise<void> {
  await invokeFunction('auth-phone-change-password-complete', { challengeId, otp, password })
}

export async function fetchMenuCounts(): Promise<MenuCounts> {
  const mine = await rpc<MySupportGroup>('get_my_support_group')
  return { members: Number(mine.group?.member_count ?? 0), chapters: Number(mine.group?.chapter_count ?? 0) }
}
