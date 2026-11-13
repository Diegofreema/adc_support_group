import type { Session } from '@supabase/supabase-js'

import { normalisePhone } from '@/lib/phone'
import { rpc, supabase } from '@/lib/supabase'
import { sessionStore } from '@/stores/session-store'
import type { GroupStatus, Power, Role, User } from '@/types/domain'

/**
 * Turns the Supabase session into the app's User: who they are (profiles),
 * and what they are here (Rise Up staff → Directorate; leader or member of a
 * support group via get_my_support_group).
 */

interface ProfileRow {
  id: string
  full_name: string | null
  phone: string | null
  email: string | null
  role: string
  status: string
  polling_unit_code: string | null
}

interface MySupportGroup {
  is_leader: boolean
  group: { id: string; name: string; status: GroupStatus; leader_title: string | null } | null
  membership: { member_role: string; title: string | null; chapter_name?: string | null } | null
  powers: Power[]
  power_chapter_id: string | null
}

const STAFF_TITLES: Record<string, string> = {
  super_admin: 'Super admin',
  admin: 'Admin',
  state_admin: 'State admin',
}

/** Aliases like phone-234803…@auth.riseup.local are not real addresses. */
function realEmail(email: string | null): string | undefined {
  return email && !email.endsWith('.local') ? email : undefined
}

function roleFor(profile: ProfileRow, mine: MySupportGroup | null): Role {
  if (profile.role in STAFF_TITLES) return 'directorate'
  return mine?.is_leader ? 'leader' : 'member'
}

function titleFor(profile: ProfileRow, mine: MySupportGroup | null): string | undefined {
  if (profile.role in STAFF_TITLES) return STAFF_TITLES[profile.role]
  if (mine?.is_leader) return mine.group?.leader_title ?? undefined
  return mine?.membership?.title ?? undefined
}

export function toUser(profile: ProfileRow, mine: MySupportGroup | null): User {
  return {
    id: profile.id,
    fullName: profile.full_name ?? 'Member',
    phone: profile.phone ? normalisePhone(profile.phone) : '',
    email: realEmail(profile.email),
    role: roleFor(profile, mine),
    title: titleFor(profile, mine),
    activeGroupId: mine?.group?.id,
    activeGroupName: mine?.group?.name,
    activeGroupStatus: mine?.group?.status,
    powers: mine?.powers ?? [],
    powerChapterId: mine?.power_chapter_id ?? undefined,
    chapterName: mine?.membership?.chapter_name ?? undefined,
    stateAdmin: profile.role === 'state_admin' || undefined,
    // Staff have no voting area; everyone else picks their polling unit first.
    needsVotingArea: (!(profile.role in STAFF_TITLES) && !profile.polling_unit_code) || undefined,
  }
}

async function userFor(session: Session): Promise<User | null> {
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('id, full_name, phone, email, role, status, polling_unit_code')
    .eq('id', session.user.id)
    .maybeSingle<ProfileRow>()
  if (error) throw new Error(error.message)
  if (!profile) return null
  if (profile.status === 'suspended') throw new Error('This account has been suspended')

  // Staff don't belong to groups; everyone else gets their group state.
  const mine = profile.role in STAFF_TITLES ? null : await rpc<MySupportGroup>('get_my_support_group')
  return toUser(profile, mine)
}

/** Rebuild the User from the current Supabase session and publish it. */
export async function refreshSessionUser(): Promise<User | null> {
  const { data } = await supabase.auth.getSession()
  const user = data.session ? await userFor(data.session) : null
  sessionStore.setUser(user)
  return user
}

/**
 * Run once before the router renders, so route guards (which read the store
 * synchronously) see the real session. A stale or broken session signs out.
 */
export async function bootstrapSession(): Promise<void> {
  try {
    await refreshSessionUser()
  } catch {
    await supabase.auth.signOut().catch(() => undefined)
    sessionStore.setUser(null)
  }
  supabase.auth.onAuthStateChange((event) => {
    if (event === 'SIGNED_OUT') sessionStore.setUser(null)
  })
}
