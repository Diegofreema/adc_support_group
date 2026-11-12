import type { MyGroup } from '@/modules/home'

export interface Profile {
  fullName: string
  phone: string
  email: string
  state: string
  lga: string
  ward: string
  groups: MyGroup[]
}

/** Numbers shown in the "More" menu. */
export interface MenuCounts {
  members: number
  chapters: number
}
