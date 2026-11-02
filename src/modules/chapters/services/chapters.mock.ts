import type { ChapterActivity, ChapterRecord } from '../types'

type Seed = [id: string, name: string, level: ChapterRecord['level'], state: string, coordinator: string, phone: string, members: number, activities: number, given: number, lgas: number]

const AWN: Seed[] = [
  ['chp_lagos', 'Lagos', 'state', 'Lagos', 'Bisi Adeyemi', '08025519087', 812, 31, 1_100_000, 9],
  ['chp_kano', 'Kano', 'state', 'Kano', 'Fatima Bello', '08031110022', 640, 22, 900_000, 7],
  ['chp_plateau', 'Plateau', 'state', 'Plateau', 'Ruth Dung', '08033300912', 406, 18, 450_000, 4],
  ['chp_fct', 'FCT', 'state', 'FCT', 'Ngozi Eze', '08094452210', 388, 12, 380_000, 3],
  ['chp_surulere', 'Surulere', 'lga', 'Lagos', 'Chioma Nwosu', '08062214590', 214, 9, 120_000, 1],
  ['chp_gwale', 'Gwale', 'lga', 'Kano', 'Hadiza Musa', '08139001123', 156, 6, 60_000, 1],
]

function toRecord(groupId: string) {
  return ([id, name, level, state, coordinatorName, coordinatorPhone, memberCount, activityCount, amountGiven, lgaCount]: Seed, index: number): ChapterRecord => ({
    id, groupId, name, level, state, coordinatorName, coordinatorPhone, memberCount, activityCount, amountGiven, lgaCount,
    memberGrowth: 38 - index * 5, joinCode: `${groupId.slice(4)}-${name.toLowerCase()}`,
  })
}

export const chaptersDb: ChapterRecord[] = [
  ...AWN.map(toRecord('grp_awn')),
  toRecord('grp_kkr')(['chp_fagge', 'Fagge', 'lga', 'Kano', 'Sani Bello', '08061112233', 120, 8, 90_000, 1], 0),
]

export const chapterActivitiesDb: ChapterActivity[] = [
  { id: 'act_101', chapterId: 'chp_lagos', type: 'door-to-door', title: 'Door-to-door, Surulere', date: '2026-10-31T09:00:00Z', reach: '82 homes', status: 'approved' },
  { id: 'act_102', chapterId: 'chp_lagos', type: 'rally', title: 'Rally, Ikeja', date: '2026-10-12T15:00:00Z', reach: '1,200 people', status: 'approved' },
  { id: 'act_103', chapterId: 'chp_lagos', type: 'town-hall', title: 'Town hall, Yaba', date: '2026-10-25T10:00:00Z', reach: '260 people', status: 'pending' },
  { id: 'act_104', chapterId: 'chp_kano', type: 'rally', title: 'Road show, Kofar Mata', date: '2026-10-28T10:00:00Z', reach: '2,400 people', status: 'approved' },
  { id: 'act_105', chapterId: 'chp_plateau', type: 'town-hall', title: 'Town hall, Jos North', date: '2026-10-25T10:00:00Z', reach: '410 people', status: 'pending' },
]
