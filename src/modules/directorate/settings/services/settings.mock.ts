import type { ActivityType, Category, Handover, StaffMember } from '../types'

export const CATEGORIES: Category[] = [
  { id: 'cat_women', name: 'Women', groupCount: 1104 },
  { id: 'cat_youth', name: 'Youth', groupCount: 986 },
  { id: 'cat_students', name: 'Students', groupCount: 412 },
  { id: 'cat_transport', name: 'Transport', groupCount: 377 },
  { id: 'cat_traders', name: 'Traders', groupCount: 521 },
  { id: 'cat_diaspora', name: 'Diaspora', groupCount: 143 },
]

export const ACTIVITY_TYPES: ActivityType[] = ['Rally', 'Town hall', 'Door-to-door', 'Media', 'Endorsement', 'Voter education', 'Materials', 'Community project', 'Election day']
  .map((name, index) => ({ id: `typ_${index}`, name, enabled: true }))

export const STAFF: StaffMember[] = [
  { id: 'stf_hauwa', fullName: 'Hauwa Bello', contact: '0803 221 4410', role: 'super-admin' },
  { id: 'stf_emeka', fullName: 'Emeka Obi', contact: '0806 552 9001', role: 'staff' },
  { id: 'stf_sadiq', fullName: 'Sadiq Aliyu', contact: '0812 330 7712', role: 'staff' },
]

export const HANDOVERS: Handover[] = [
  { id: 'hnd_1', groupName: 'Oshodi Market Women', fromName: 'Bose Adeyemi', toName: 'Kemi Lawal', requestedAt: '2026-10-31T10:00:00Z' },
  { id: 'hnd_2', groupName: 'Yola Professionals', fromName: 'Aisha Bala', toName: 'Umar Jibril', requestedAt: '2026-10-29T10:00:00Z' },
]
