import type { MyGroup } from '@/modules/home'

export interface AlertPreferences {
  email: boolean
  sms: boolean
}

export interface Profile {
  fullName: string
  phone: string
  email: string
  state: string
  lga: string
  ward: string
  groups: MyGroup[]
  alerts: AlertPreferences
  language: string
}

/** Numbers shown in the "More" menu. */
export interface MenuCounts {
  members: number
  chapters: number
}
