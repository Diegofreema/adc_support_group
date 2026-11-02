import type { Payment } from '@/types/domain'
import type { CauseTotal } from '../types'

const cause = (causeId: string, causeTitle: string) => ({ kind: 'cause' as const, causeId, causeTitle })

export const PAYMENTS: Payment[] = [
  { id: 'pay_901', groupId: 'grp_otf', groupName: 'Onitsha Traders Forum', purpose: cause('cse_anambra', 'Anambra rally'), amount: 1_500_000, method: 'transfer', status: 'checking', date: '2026-11-01T09:00:00Z', reference: 'GTB-778120', payerName: 'Chukwuma Obi' },
  { id: 'pay_902', groupId: 'grp_awn', groupName: 'Atiku Women Network', chapterName: 'Kano', purpose: cause('cse_nwposters', 'North West posters'), amount: 300_000, method: 'cash', status: 'checking', date: '2026-10-27T13:00:00Z', reference: 'Receipt 0042', payerName: 'Fatima Bello' },
  { id: 'pay_903', groupId: 'grp_yp', groupName: 'Yola Professionals', purpose: { kind: 'general', purpose: 'General support' }, amount: 1_200_000, method: 'transfer', status: 'checking', date: '2026-10-26T15:00:00Z', reference: 'ZEN-55190', payerName: 'Aisha Bala' },
  { id: 'pay_904', groupId: 'grp_nyv', groupName: 'Northern Youth Vanguard', purpose: cause('cse_neradio', 'North East radio'), amount: 250_000, method: 'cash', status: 'checking', date: '2026-10-25T10:00:00Z', reference: 'Receipt 0310', payerName: 'Ibrahim Musa' },
  { id: 'pay_905', groupId: 'grp_kkr', groupName: 'Kano Keke Riders', purpose: { kind: 'general', purpose: 'Mobilisation' }, amount: 150_000, method: 'transfer', status: 'checking', date: '2026-10-24T10:00:00Z', reference: 'UBA-10021', payerName: 'Musa Abdullahi' },
  { id: 'pay_801', groupId: 'grp_awn', groupName: 'Atiku Women Network', chapterName: 'Lagos', purpose: cause('cse_lagos', 'Lagos mega rally'), amount: 750_000, method: 'funz', status: 'paid', date: '2026-10-27T11:00:00Z', reference: 'FZ-2026-118204', payerName: 'Amaka Okafor' },
  { id: 'pay_802', groupId: 'grp_yp', groupName: 'Yola Professionals', purpose: cause('cse_neradio', 'North East radio'), amount: 2_000_000, method: 'funz', status: 'paid', date: '2026-10-22T11:00:00Z', reference: 'FZ-2026-117650', payerName: 'Aisha Bala' },
  { id: 'pay_803', groupId: 'grp_kkr', groupName: 'Kano Keke Riders', purpose: cause('cse_nwposters', 'North West posters'), amount: 100_000, method: 'funz', status: 'failed', date: '2026-10-20T11:00:00Z', reference: 'FZ-2026-117102', payerName: 'Musa Abdullahi' },
]

export const CAUSE_TOTALS: CauseTotal[] = [
  { causeId: 'cse_lagos', title: 'Lagos mega rally', raised: 34_000_000, target: 50_000_000, payments: 41 },
  { causeId: 'cse_neradio', title: 'North East radio', raised: 18_400_000, target: 20_000_000, payments: 63 },
  { causeId: 'cse_nwposters', title: 'North West posters', raised: 9_300_000, target: 30_000_000, payments: 22 },
  { causeId: 'cse_anambra', title: 'Anambra rally', raised: 2_100_000, target: 10_000_000, payments: 9 },
]

/** Platform-wide totals that the payments in this mock list are a slice of. */
export const BASE_TOTALS = { raised: 412_000_000, groups: 2118, funz: 371_000_000, funzCount: 9804, offline: 41_000_000, offlineCount: 312 }
