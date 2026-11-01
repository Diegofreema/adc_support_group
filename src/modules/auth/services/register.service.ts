import type { RegistrationReceipt } from '../types/auth.types'
import type { RegisterGroupValues } from '../utils/schemas'
import { normalisePhone } from '../utils/phone'
import { newId, respond } from '@/lib/mock-api'
import { sessionStore } from '@/stores/session-store'
import type { User } from '@/types/domain'

function leaderFrom(values: RegisterGroupValues, groupId: string): User {
  return {
    id: newId('usr'),
    fullName: values.fullName,
    phone: normalisePhone(values.phone),
    role: 'leader',
    title: values.leaderTitle,
    activeGroupId: groupId,
    activeGroupName: values.groupName,
  }
}

/** Submit a new group for Directorate checks; the leader is signed in straight away. */
export async function registerGroup(values: RegisterGroupValues): Promise<RegistrationReceipt> {
  const groupId = newId('grp')
  const receipt = await respond({ groupName: values.groupName, submittedAt: new Date().toISOString() }, 700)
  sessionStore.setUser(leaderFrom(values, groupId))
  return receipt
}
