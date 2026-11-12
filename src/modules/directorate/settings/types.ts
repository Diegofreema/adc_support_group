export interface Category {
  id: string
  name: string
  groupCount: number
  isActive: boolean
}

export interface ActivityType {
  id: string
  name: string
  enabled: boolean
}

export type StaffRole = 'super_admin' | 'admin' | 'state_admin'

export interface StaffMember {
  id: string
  fullName: string
  contact: string
  role: StaffRole
  state?: string
}

export interface Handover {
  id: string
  groupName: string
  fromName: string
  toName: string
  reason?: string
  requestedAt: string
}

export type SettingsTab = 'categories' | 'types' | 'sms' | 'giving' | 'staff' | 'handovers'
