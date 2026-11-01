import type { ReviewActivity } from '../types'

export const ACTIVITIES: ReviewActivity[] = [
  { id: 'act_101', stage: 'to-check', groupId: 'grp_kkr', groupName: 'Kano Keke Riders', type: 'Rally', title: 'Road show, Sabon Gari', date: '2026-11-02T10:00:00Z', state: 'Kano', lga: 'Fagge', peopleReached: 2400, photoTones: [4, 6, 1, 3, 2], status: 'pending', loggedBy: 'Musa Abdullahi' },
  { id: 'act_102', stage: 'to-check', groupId: 'grp_yp', groupName: 'Yola Professionals', type: 'Town hall', title: 'Professionals dinner, Yola', date: '2026-11-01T18:00:00Z', state: 'Adamawa', lga: 'Yola North', peopleReached: 180, photoTones: [5, 1, 2, 6], status: 'pending', loggedBy: 'Aisha Bala' },
  { id: 'act_103', stage: 'to-check', groupId: 'grp_nyv', groupName: 'Northern Youth Vanguard', type: 'Media', title: 'Radio jingle on Freedom FM', date: '2026-10-30T09:00:00Z', state: 'Kaduna', peopleReached: 0, photoTones: [3], status: 'pending', loggedBy: 'Ibrahim Musa' },
  { id: 'act_201', stage: 'leader-approved', groupId: 'grp_awn', groupName: 'Atiku Women Network', chapterName: 'Lagos', type: 'Door-to-door', title: 'Door-to-door, Surulere', date: '2026-11-01T08:00:00Z', state: 'Lagos', peopleReached: 82, photoTones: [1, 2], status: 'approved', approvedBy: 'Lagos chapter', loggedBy: 'Chioma Nwosu' },
  { id: 'act_202', stage: 'leader-approved', groupId: 'grp_awn', groupName: 'Atiku Women Network', chapterName: 'Plateau', type: 'Town hall', title: 'Town hall, Jos North', date: '2026-10-31T16:00:00Z', state: 'Plateau', peopleReached: 410, photoTones: [3, 5], status: 'approved', approvedBy: 'Plateau chapter', loggedBy: 'Ruth Dung' },
  { id: 'act_203', stage: 'leader-approved', groupId: 'grp_omw', groupName: 'Oshodi Market Women', type: 'Materials', title: 'Flyers, Oshodi market', date: '2026-10-30T12:00:00Z', state: 'Lagos', peopleReached: 3000, photoTones: [6], status: 'approved', approvedBy: 'Leader', loggedBy: 'Bose Adeyemi' },
  { id: 'act_301', stage: 'flagged', groupId: 'grp_bmm', groupName: 'Benue Market Movement', type: 'Rally', title: 'Rally, Makurdi', date: '2026-10-28T10:00:00Z', state: 'Benue', peopleReached: 15000, photoTones: [2, 4], status: 'approved', approvedBy: 'Leader', loggedBy: 'Terver Iorliam', flagReason: 'Same photos as another rally' },
]

