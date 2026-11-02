import type { PointPack, SentBroadcast } from '../types'

export const POINT_PACKS: PointPack[] = [
  { id: 'p100k', naira: 100_000, points: 100_000 },
  { id: 'p500k', naira: 500_000, points: 500_000 },
  { id: 'p1m', naira: 1_000_000, points: 1_000_000 },
]

export const SENT: SentBroadcast[] = [
  { id: 'brd_1', text: 'Lagos rally: buses at 7am', audience: 'leaders', place: 'Lagos', recipients: 341, channels: { app: true, sms: true }, sentAt: '2026-11-01T07:00:00Z' },
  { id: 'brd_2', text: 'Upload your October activities', audience: 'leaders', place: 'All states', recipients: 4812, channels: { app: true, sms: false }, sentAt: '2026-10-30T09:00:00Z' },
  { id: 'brd_3', text: 'Thank you for the Kano road show', audience: 'members', place: 'Kano', recipients: 76_700, channels: { app: true, sms: false }, sentAt: '2026-10-26T18:00:00Z' },
]

export const STARTING_POINTS = 48_200
