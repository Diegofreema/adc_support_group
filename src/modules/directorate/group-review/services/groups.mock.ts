import type { ReviewGroup } from '../types'

const base = { memberGrowth: 0, chapterCount: 0, activityCount: 0, amountGiven: 0, leaderPhoneChecked: true }

export const GROUPS: ReviewGroup[] = [
  {
    ...base, id: 'grp_awna', name: "Atiku Women's Network Abuja", category: 'Women', level: 'state', state: 'FCT', lga: 'AMAC', status: 'pending',
    memberCount: 214, membersByLink: 168, membersByExcel: 46, leaderName: 'Fatima Garba', leaderPhone: '0803 412 7781', cacNumber: 'RC 1849302',
    joinCode: 'awn-abuja', submittedAt: '2026-10-29T10:42:00Z', possibleDuplicateOf: 'grp_awn',
    duplicate: { id: 'grp_awn', name: 'Atiku Women Network', place: 'National', memberCount: 3482 },
    history: [{ title: 'Registered', date: '2026-10-29T10:42:00Z', by: 'Fatima Garba' }, { title: 'Phone checked', date: '2026-10-29T10:44:00Z' }],
  },
  {
    ...base, id: 'grp_iou', name: 'Ilorin Okada Union', category: 'Transport', level: 'lga', state: 'Kwara', lga: 'Ilorin West', status: 'pending',
    memberCount: 482, membersByLink: 120, membersByExcel: 362, leaderName: 'Abdulrahman Salihu', leaderPhone: '0806 118 2290',
    joinCode: 'ilorin-okada', submittedAt: '2026-10-30T09:10:00Z', history: [{ title: 'Registered', date: '2026-10-30T09:10:00Z', by: 'Abdulrahman Salihu' }],
  },
  {
    ...base, id: 'grp_phs', name: 'PH Students for Atiku', category: 'Students', level: 'lga', state: 'Rivers', lga: 'Obio/Akpor', status: 'pending',
    memberCount: 210, membersByLink: 210, membersByExcel: 0, leaderName: 'Ebiere Douglas', leaderPhone: '0813 220 4567',
    joinCode: 'ph-students', submittedAt: '2026-10-31T14:00:00Z', history: [{ title: 'Registered', date: '2026-10-31T14:00:00Z', by: 'Ebiere Douglas' }],
  },
  {
    ...base, id: 'grp_kkra', name: 'Kano Keke Riders Assoc.', category: 'Transport', level: 'lga', state: 'Kano', lga: 'Municipal', status: 'pending',
    memberCount: 96, membersByLink: 40, membersByExcel: 56, leaderName: 'Musa Abdullahi', leaderPhone: '0802 771 0021', leaderPhoneChecked: false,
    joinCode: 'kkr-assoc', submittedAt: '2026-11-01T08:00:00Z', possibleDuplicateOf: 'grp_kkr',
    duplicate: { id: 'grp_kkr', name: 'Kano Keke Riders', place: 'Kano', memberCount: 2140 },
    history: [{ title: 'Registered', date: '2026-11-01T08:00:00Z', by: 'Musa Abdullahi' }],
  },
  {
    ...base, id: 'grp_uk', name: 'Atiku UK Network', category: 'Diaspora', level: 'abroad', country: 'United Kingdom', city: 'London', status: 'pending',
    memberCount: 143, membersByLink: 143, membersByExcel: 0, leaderName: 'Kemi Adewale', leaderPhone: '+44 7700 900123',
    joinCode: 'atiku-uk', submittedAt: '2026-11-01T11:30:00Z', history: [{ title: 'Registered', date: '2026-11-01T11:30:00Z', by: 'Kemi Adewale' }],
  },
  {
    ...base, id: 'grp_awn', name: 'Atiku Women Network', category: 'Women', level: 'national', status: 'verified', memberCount: 3482, membersByLink: 2214, membersByExcel: 1268,
    chapterCount: 14, leaderName: 'Amaka Okafor', leaderPhone: '0803 555 0142', cacNumber: 'RC 1722041', joinCode: 'atiku-women', submittedAt: '2026-09-02T10:00:00Z',
    decidedAt: '2026-09-04T12:00:00Z', history: [{ title: 'Registered', date: '2026-09-02T10:00:00Z', by: 'Amaka Okafor' }, { title: 'Verified', date: '2026-09-04T12:00:00Z', by: 'Hauwa Bello' }],
  },
  {
    ...base, id: 'grp_nyv', name: 'Northern Youth Vanguard', category: 'Youth', level: 'state', state: 'Kaduna', status: 'verified', memberCount: 22_140, membersByLink: 20_000, membersByExcel: 2140,
    leaderName: 'Ibrahim Musa', leaderPhone: '0805 330 1120', joinCode: 'nyv', submittedAt: '2026-09-10T10:00:00Z', decidedAt: '2026-09-11T09:00:00Z',
    history: [{ title: 'Registered', date: '2026-09-10T10:00:00Z' }, { title: 'Verified', date: '2026-09-11T09:00:00Z', by: 'Emeka Obi' }],
  },
  {
    ...base, id: 'grp_ly4c', name: 'Lagos Youth 4 Change', category: 'Youth', level: 'state', state: 'Lagos', status: 'rejected', memberCount: 54, membersByLink: 54, membersByExcel: 0,
    leaderName: 'Seun Ajayi', leaderPhone: '0809 222 1100', joinCode: 'ly4c', submittedAt: '2026-10-10T10:00:00Z', decidedAt: '2026-10-12T10:00:00Z',
    rejectionReason: 'Duplicate group', history: [{ title: 'Registered', date: '2026-10-10T10:00:00Z' }, { title: 'Rejected', date: '2026-10-12T10:00:00Z' }],
  },
  {
    ...base, id: 'grp_bmm', name: 'Benue Market Movement', category: 'Traders', level: 'state', state: 'Benue', status: 'suspended', memberCount: 610, membersByLink: 300, membersByExcel: 310,
    leaderName: 'Terver Iorliam', leaderPhone: '0703 112 8890', joinCode: 'bmm', submittedAt: '2026-09-20T10:00:00Z', decidedAt: '2026-10-20T10:00:00Z',
    suspendedReason: 'Fake activities', history: [{ title: 'Verified', date: '2026-09-22T10:00:00Z' }, { title: 'Suspended', date: '2026-10-20T10:00:00Z' }],
  },
]
