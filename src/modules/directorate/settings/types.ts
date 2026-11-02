export interface Category {
  id: string
  name: string
  groupCount: number
}

export interface ActivityType {
  id: string
  name: string
  enabled: boolean
}

export type StaffRole = 'super-admin' | 'staff'

export interface StaffMember {
  id: string
  fullName: string
  contact: string
  role: StaffRole
}

export interface Handover {
  id: string
  groupName: string
  fromName: string
  toName: string
  requestedAt: string
}

export type SettingsTab = 'categories' | 'types' | 'staff' | 'handovers'
