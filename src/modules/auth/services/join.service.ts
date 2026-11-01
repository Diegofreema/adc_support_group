import { DEMO_USERS } from './auth.mock'
import { INVITES } from './invite.mock'
import type { Invite } from '../types/auth.types'
import type { JoinValues } from '../utils/schemas'
import { normalisePhone } from '../utils/phone'
import { newId, notFound, respond } from '@/lib/mock-api'
import { sessionStore } from '@/stores/session-store'
import type { User } from '@/types/domain'

export async function fetchInvite(code: string): Promise<Invite> {
  const invite = INVITES.find((item) => item.code === code) ?? INVITES[0]
  if (!invite) notFound('Invite', code)
  return respond(invite)
}

function memberFrom(values: JoinValues, invite: Invite): User {
  const existing = DEMO_USERS.find((user) => user.phone === normalisePhone(values.phone))
  return {
    id: existing?.id ?? newId('usr'),
    fullName: values.fullName,
    phone: normalisePhone(values.phone),
    email: values.email || undefined,
    role: existing?.role ?? 'member',
    activeGroupId: invite.groupId,
    activeGroupName: invite.groupName,
  }
}

/** Create (or link) the account, add it to the group, and sign in. */
export async function joinGroup(values: JoinValues, invite: Invite): Promise<User> {
  const user = await respond(memberFrom(values, invite), 600)
  sessionStore.setUser(user)
  return user
}
