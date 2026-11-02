import type { User } from '@/types/domain'

/** Demo accounts. Log in with one of these phones to see each role. */
export const DEMO_USERS: User[] = [
  { id: 'usr_amaka', fullName: 'Amaka Okafor', phone: '08035550142', email: 'amaka.okafor@gmail.com', role: 'leader', activeGroupId: 'grp_awn', activeGroupName: 'Atiku Women Network' },
  { id: 'usr_tunde', fullName: 'Tunde Yusuf', phone: '08023347781', role: 'member', activeGroupId: 'grp_kkr', activeGroupName: 'Kano Keke Riders' },
  { id: 'usr_hauwa', fullName: 'Hauwa Bello', phone: '08090000001', email: 'hauwa@adcsupportgroups.ng', role: 'directorate', title: 'Super admin' },
]
