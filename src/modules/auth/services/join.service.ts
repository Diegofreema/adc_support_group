import { refreshSessionUser } from './session.service'
import { completeSignup } from './verification.service'
import type { Invite } from '../types/auth.types'
import type { JoinValues } from '../utils/schemas'
import { rpc } from '@/lib/supabase'
import { sessionStore } from '@/stores/session-store'
import type { GroupStatus, User } from '@/types/domain'

interface InviteRow {
  code: string
  group_id: string
  group_name: string
  chapter_name: string | null
  status: GroupStatus
  member_count: number
  invited_by: string | null
}

/** What a group or chapter join link points to. Works before sign-in. */
export async function fetchInvite(code: string): Promise<Invite> {
  const row = await rpc<InviteRow>('resolve_support_group_invite', { p_code: code })
  return {
    code: row.code,
    groupId: row.group_id,
    groupName: row.group_name,
    chapterName: row.chapter_name ?? undefined,
    status: row.status,
    memberCount: row.member_count,
    invitedBy: row.invited_by ?? 'The group leader',
  }
}

const GENDERS: Record<string, string> = { Female: 'female', Male: 'male' }

async function joinByCode(code: string): Promise<User> {
  await rpc('join_support_group_by_code', { p_code: code })
  const user = await refreshSessionUser()
  if (!user) throw new Error('Sign in again to finish joining')
  return user
}

/**
 * New visitor: create the account with the phone code, then join. The code is
 * checked here, so a wrong code fails this call.
 */
export async function joinGroup(values: JoinValues, invite: Invite, challengeId: string): Promise<User> {
  await completeSignup({
    challengeId,
    code: values.code,
    fullName: values.fullName,
    phone: values.phone,
    password: values.password,
    state: values.state,
    lga: values.lga,
    ward: values.ward,
    gender: GENDERS[values.gender],
  })
  return joinByCode(invite.code)
}

/** Someone already signed in opens a join link: one tap. */
export async function joinAsSignedIn(invite: Invite): Promise<User> {
  if (!sessionStore.getUser()) throw new Error('Sign in first')
  return joinByCode(invite.code)
}
