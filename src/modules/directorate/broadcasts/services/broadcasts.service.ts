import { queryOptions } from '@tanstack/react-query'

import { POINT_PACKS, SENT, STARTING_POINTS } from './broadcasts.mock'
import { directorateKeys } from '../../shared/query-keys'
import type { SentBroadcast } from '../types'
import { newId, respond } from '@/lib/mock-api'

const sent: SentBroadcast[] = structuredClone(SENT)
let points = STARTING_POINTS

export const sentBroadcastsQuery = queryOptions({ queryKey: directorateKeys.broadcasts(), queryFn: () => respond(sent) })

export const pointsQuery = queryOptions({ queryKey: directorateKeys.points(), queryFn: () => respond(points) })

export const pointPacksQuery = queryOptions({ queryKey: [...directorateKeys.points(), 'packs'], queryFn: () => respond(POINT_PACKS) })

/** Send and charge SMS points (0 when SMS is off). */
export async function sendBroadcast(message: Omit<SentBroadcast, 'id' | 'sentAt'>, cost: number): Promise<SentBroadcast> {
  if (cost > points) throw new Error('Not enough SMS points')
  points -= cost
  const record: SentBroadcast = { ...message, id: newId('brd'), sentAt: new Date().toISOString() }
  sent.unshift(record)
  return respond(record)
}

/** Mock of the Funz checkout for SMS points. */
export async function buyPoints(packId: string): Promise<number> {
  const pack = POINT_PACKS.find((item) => item.id === packId)
  if (pack) points += pack.points
  return respond(points, 700)
}
