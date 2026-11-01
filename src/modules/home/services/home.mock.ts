import type { LeaderDashboard, MemberDashboard } from '../types/home.types'

export const LEADER_DASHBOARDS: Record<string, LeaderDashboard> = {
  grp_awn: {
    group: { id: 'grp_awn', name: 'Atiku Women Network', status: 'verified', memberCount: 3482, memberGrowth: 124, joinCode: 'atiku-women' },
    groups: [
      { id: 'grp_awn', name: 'Atiku Women Network', role: 'leader' },
      { id: 'grp_smw', name: 'Surulere Market Women', role: 'member' },
    ],
    todos: [
      { id: 'td1', kind: 'approve-activities', count: 4, to: '/activities' },
      { id: 'td2', kind: 'fix-upload', count: 12, to: '/members/import' },
    ],
    month: { activities: 96, chapters: 14, given: 4_200_000 },
    recent: [
      { id: 'act_1', kind: 'activity', title: 'Door-to-door, Surulere', meta: 'Today · 82 homes', activityType: 'door-to-door', status: 'approved', to: '/activities' },
      { id: 'pay_1', kind: 'payment', title: 'Lagos rally', meta: 'Mon · Payment', amount: 750_000, to: '/payments' },
      { id: 'act_2', kind: 'activity', title: 'Town hall, Jos', meta: 'Sat · 410 people', activityType: 'town-hall', status: 'pending', to: '/activities' },
    ],
  },
}

export const MEMBER_DASHBOARDS: Record<string, MemberDashboard> = {
  usr_tunde: {
    approvedCount: 12,
    approvedGrowth: 2,
    groups: [
      { id: 'grp_kkr', name: 'Kano Keke Riders', role: 'member' },
      { id: 'grp_nyv', name: 'Northern Youth Vanguard', role: 'member', chapterName: 'Kano chapter' },
    ],
    activities: [
      { id: 'act_m1', title: 'Road show, Kofar Mata', meta: 'Tue · Kano Keke Riders', activityType: 'rally', status: 'rejected', reason: 'Photos too dark.' },
      { id: 'act_m2', title: 'Door-to-door, Fagge', meta: 'Yesterday · 46 homes', activityType: 'door-to-door', status: 'pending' },
      { id: 'act_m3', title: 'Town hall, Zaria', meta: 'Sat · 640 people', activityType: 'town-hall', status: 'approved' },
    ],
    notes: [
      { id: 'n1', author: 'Ibrahim Musa', groupName: 'Kano Keke Riders', time: '2h', body: 'Road show Saturday, 9am. Gwale park. Wear your green.' },
      { id: 'n2', author: 'Zainab Abdullahi', groupName: 'Northern Youth Vanguard', time: 'Mon', body: 'Thanks for Zaria. Next: door-to-door in your ward.' },
    ],
    inviteCode: 'kano-keke',
  },
}
