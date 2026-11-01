import { MENU_COUNTS, PROFILES } from './profile.mock'
import type { AlertPreferences, MenuCounts, Profile } from '../types/profile.types'
import type { ProfileValues } from '../utils/schemas'
import { delay, respond } from '@/lib/mock-api'
import { sessionStore } from '@/stores/session-store'

const DEFAULT_PROFILE = 'usr_amaka'

function profileFor(userId: string): Profile {
  return PROFILES[userId] ?? PROFILES[DEFAULT_PROFILE]!
}

export async function fetchProfile(userId: string): Promise<Profile> {
  return respond(profileFor(userId))
}

export async function updateProfile(userId: string, values: ProfileValues): Promise<Profile> {
  const updated = { ...profileFor(userId), ...values }
  PROFILES[userId] = updated
  const user = sessionStore.getUser()
  if (user) sessionStore.setUser({ ...user, fullName: values.fullName, email: values.email || undefined })
  return respond(updated)
}

export async function updateAlerts(userId: string, alerts: AlertPreferences): Promise<AlertPreferences> {
  profileFor(userId).alerts = alerts
  return respond(alerts, 200)
}

export async function changePassword(current: string): Promise<void> {
  await delay(500)
  if (current.length < 4) throw new Error('Current password is wrong')
}

export async function fetchMenuCounts(): Promise<MenuCounts> {
  return respond(MENU_COUNTS, 150)
}
