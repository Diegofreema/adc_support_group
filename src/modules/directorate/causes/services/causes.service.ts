import { queryOptions } from '@tanstack/react-query'

import { CAUSES } from './causes.mock'
import { directorateKeys } from '../../shared/query-keys'
import type { CauseInput } from '../types'
import { newId, notFound, respond } from '@/lib/mock-api'
import type { Cause } from '@/types/domain'

const db: Cause[] = structuredClone(CAUSES)

export const causesQuery = queryOptions({ queryKey: directorateKeys.causes(), queryFn: () => respond(db) })

export async function createCause(input: CauseInput): Promise<Cause> {
  const cause: Cause = { ...input, id: newId('cse'), raised: 0, groupsCount: 0, status: 'open' }
  db.unshift(cause)
  return respond(cause)
}

export async function updateCause(id: string, input: CauseInput): Promise<Cause> {
  const cause = db.find((item) => item.id === id) ?? notFound('Cause', id)
  return respond(Object.assign(cause, input))
}
