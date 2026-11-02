import type { Cause, Payment } from '@/types/domain'
import type { ActivityOption, ChapterOption } from '../types'

const daysAgo = (days: number) => new Date(Date.now() - days * 86_400_000).toISOString()
const daysAhead = (days: number) => new Date(Date.now() + days * 86_400_000).toISOString()
const GROUP = { groupId: 'grp_awn', groupName: 'Atiku Women Network' }

export const CAUSES: Cause[] = [
  { id: 'cause_lagos', title: 'Lagos rally logistics', target: 50_000_000, raised: 34_000_000, deadline: daysAhead(40), groupsCount: 41, status: 'open', visibleTo: 'All groups' },
  { id: 'cause_nw', title: 'North West posters', target: 30_000_000, raised: 9_300_000, deadline: daysAhead(50), groupsCount: 63, status: 'open', visibleTo: 'All groups' },
  { id: 'cause_radio', title: 'Radio jingles', target: 20_000_000, raised: 2_400_000, deadline: daysAhead(66), groupsCount: 22, status: 'open', visibleTo: 'All groups' },
]

export const CHAPTERS: ChapterOption[] = [
  { id: 'ch_lagos', name: 'Lagos' },
  { id: 'ch_kano', name: 'Kano' },
  { id: 'ch_plateau', name: 'Plateau' },
  { id: 'ch_fct', name: 'FCT' },
]

export const ACTIVITY_OPTIONS: ActivityOption[] = [
  { id: 'act_106', title: 'Rally, Ikeja', date: daysAgo(19) },
  { id: 'act_102', title: 'Town hall, Jos North', date: daysAgo(2) },
  { id: 'act_101', title: 'Door-to-door, Surulere', date: daysAgo(0) },
]

export const PAYMENTS: Payment[] = [
  { ...GROUP, id: 'pay_201', chapterName: 'Lagos', purpose: { kind: 'cause', causeId: 'cause_lagos', causeTitle: 'Lagos rally logistics' }, amount: 250_000, method: 'funz', status: 'paid', date: daysAgo(0), reference: 'FZ-2026-118204', payerName: 'Amaka Okafor', activityId: 'act_106', activityTitle: 'Rally, Ikeja' },
  { ...GROUP, id: 'pay_202', chapterName: 'Kano', purpose: { kind: 'cause', causeId: 'cause_nw', causeTitle: 'North West posters' }, amount: 300_000, method: 'transfer', status: 'checking', date: daysAgo(4), reference: 'GTB-55102', payerName: 'Fatima Bello' },
  { ...GROUP, id: 'pay_203', purpose: { kind: 'general', purpose: 'mobilisation' }, amount: 500_000, method: 'funz', status: 'paid', date: daysAgo(12), reference: 'FZ-2026-117310', payerName: 'Ngozi Eze' },
  { ...GROUP, id: 'pay_204', purpose: { kind: 'cause', causeId: 'cause_radio', causeTitle: 'Radio jingles' }, amount: 100_000, method: 'funz', status: 'failed', date: daysAgo(18), reference: 'FZ-2026-116020', payerName: 'Amaka Okafor' },
  { ...GROUP, id: 'pay_205', chapterName: 'Plateau', purpose: { kind: 'general', purpose: 'logistics', note: 'Town hall' }, amount: 80_000, method: 'cash', status: 'rejected', date: daysAgo(23), reference: 'CASH-0912', payerName: 'Ruth Dung', rejectionReason: 'Proof unclear' },
  { ...GROUP, id: 'pay_206', purpose: { kind: 'cause', causeId: 'cause_lagos', causeTitle: 'Lagos rally logistics' }, amount: 3_065_000, method: 'funz', status: 'paid', date: daysAgo(40), reference: 'FZ-2026-110005', payerName: 'Amaka Okafor' },
]

