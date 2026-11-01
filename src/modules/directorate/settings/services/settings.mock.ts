import { NAMED_ACTIVITY_TYPE_LABELS } from '@/config/activity-types'
import { NAMED_GROUP_CATEGORIES } from '@/config/group-categories'
import type { ActivityType, Category, Handover, StaffMember } from '../types'

const GROUP_COUNTS: Record<string, number> = {
  Women: 1104, Youth: 986, Students: 412, Transport: 377, Traders: 521, Professionals: 298, Faith: 264, Diaspora: 143, PWD: 88, Community: 614,
}

/** Seeded from the shared category list; the Directorate edits it from here. */
export const CATEGORIES: Category[] = NAMED_GROUP_CATEGORIES.map((name) => ({ id: `cat_${name.toLowerCase()}`, name, groupCount: GROUP_COUNTS[name] ?? 0 }))

export const ACTIVITY_TYPES: ActivityType[] = NAMED_ACTIVITY_TYPE_LABELS
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
