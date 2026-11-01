import { AUDIENCES, POINTS, SENT_MESSAGES } from './messages.mock'
import { AUDIENCE_LABEL } from '../utils/channels'
import { smsCost } from '../utils/sms-cost'
import { SMS_PACKS } from '../utils/sms-packs'
import { newId, notFound, respond } from '@/lib/mock-api'
import type { AudienceOption, NewMessageInput, SentMessage } from '../types'

export async function listAudiences(): Promise<AudienceOption[]> {
  return respond(AUDIENCES)
}

export async function listSentMessages(): Promise<SentMessage[]> {
  return respond(SENT_MESSAGES)
}

export async function getPointsBalance(): Promise<number> {
  return respond(POINTS.balance, 150)
}

function subjectOf(body: string): string {
  const firstLine = body.trim().split('\n')[0] ?? ''
  return firstLine.length > 40 ? `${firstLine.slice(0, 40)}…` : firstLine
}

/** SMS spends points; app + email is free. */
export async function sendMessage(input: NewMessageInput): Promise<SentMessage> {
  if (input.channel === 'sms') spendPoints(smsCost(input.body, input.recipients, POINTS.balance).points)
  const message: SentMessage = { id: newId('msg'), subject: subjectOf(input.body), audienceLabel: AUDIENCE_LABEL[input.audience], channel: input.channel, recipients: input.recipients, sentAt: new Date().toISOString() }
  SENT_MESSAGES.unshift(message)
  return respond(message, 500)
}

function spendPoints(points: number): void {
  if (points > POINTS.balance) throw new Error('Not enough SMS points')
  POINTS.balance -= points
}

/** Mock Funz purchase of an SMS pack. */
export async function buyPoints(packId: string): Promise<number> {
  const pack = SMS_PACKS.find((candidate) => candidate.id === packId) ?? notFound('SMS pack', packId)
  POINTS.balance += pack.points
  return respond(POINTS.balance, 700)
}
