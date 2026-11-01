import type { MenuCounts, Profile } from '../types/profile.types'

export const PROFILES: Record<string, Profile> = {
  usr_amaka: {
    fullName: 'Amaka Okafor', phone: '0803 555 0142', email: 'amaka.okafor@gmail.com',
    state: 'Lagos', lga: 'Ikeja', ward: 'Ward 2',
    groups: [
      { id: 'grp_awn', name: 'Atiku Women Network', role: 'leader' },
      { id: 'grp_smw', name: 'Surulere Market Women', role: 'member' },
    ],
    alerts: { email: true, sms: true },
    language: 'English',
  },
  usr_tunde: {
    fullName: 'Tunde Yusuf', phone: '0802 334 7781', email: '',
    state: 'Kano', lga: 'Fagge', ward: 'Ward 3',
    groups: [
      { id: 'grp_kkr', name: 'Kano Keke Riders', role: 'member' },
      { id: 'grp_nyv', name: 'Northern Youth Vanguard', role: 'member', chapterName: 'Kano chapter' },
    ],
    alerts: { email: false, sms: true },
    language: 'English',
  },
}

export const MENU_COUNTS: MenuCounts = { members: 3482, chapters: 14 }

export const LANGUAGES = ['English'] as const
