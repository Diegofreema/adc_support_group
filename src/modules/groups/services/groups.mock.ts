import type { Group } from '@/types/domain'

/** In-memory seed data. Mutated by groups.service to mimic a backend. */
export const groupsDb: Group[] = [
  {
    id: 'grp_awn', name: 'Atiku Women Network', category: 'Women', level: 'national', status: 'verified',
    memberCount: 3482, memberGrowth: 124, chapterCount: 14, activityCount: 96, amountGiven: 4_200_000,
    leaderName: 'Amaka Okafor', leaderPhone: '08035550142', cacNumber: 'RC 1849302', joinCode: 'atiku-women',
    submittedAt: '2026-09-02T10:00:00Z',
  },
  {
    id: 'grp_kkr', name: 'Kano Keke Riders', category: 'Transport', level: 'state', state: 'Kano', status: 'verified',
    memberCount: 377, memberGrowth: 18, chapterCount: 3, activityCount: 21, amountGiven: 650_000,
    leaderName: 'Musa Abdullahi', leaderPhone: '08061230099', joinCode: 'kano-keke',
    submittedAt: '2026-09-20T09:00:00Z',
  },
]
