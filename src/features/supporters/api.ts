import type { Supporter, SupporterFormValues } from './schema'

// In-memory mock until a real backend exists. Swap these for fetch calls.
const supporters: Supporter[] = [
  { id: '1', fullName: 'Amina Bello', email: 'amina@example.com', phone: '08031234567', state: 'Kano', lga: 'Nassarawa', joinedAt: '2026-09-02T10:00:00Z' },
  { id: '2', fullName: 'Chinedu Okafor', email: 'chinedu@example.com', phone: '08129876543', state: 'Anambra', lga: 'Onitsha North', joinedAt: '2026-09-14T12:30:00Z' },
  { id: '3', fullName: 'Tunde Adeyemi', email: 'tunde@example.com', phone: '07055551234', state: 'Lagos', lga: 'Ikeja', joinedAt: '2026-10-01T08:15:00Z' },
  { id: '4', fullName: 'Grace Effiong', email: 'grace@example.com', phone: '09012345678', state: 'Akwa Ibom', lga: 'Uyo', joinedAt: '2026-10-20T16:45:00Z' },
]

const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms))

export type SupporterFilters = { q?: string; state?: string | null }

export async function fetchSupporters({ q, state }: SupporterFilters): Promise<Supporter[]> {
  await delay()
  const needle = q?.trim().toLowerCase()
  return supporters
    .filter((s) => !state || s.state === state)
    .filter((s) => !needle || s.fullName.toLowerCase().includes(needle) || s.lga.toLowerCase().includes(needle))
    .sort((a, b) => b.joinedAt.localeCompare(a.joinedAt))
}

export async function createSupporter(values: SupporterFormValues): Promise<Supporter> {
  await delay(700)
  if (supporters.some((s) => s.email.toLowerCase() === values.email.toLowerCase())) {
    throw new Error('This email is already registered')
  }
  const supporter: Supporter = { ...values, id: crypto.randomUUID(), joinedAt: new Date().toISOString() }
  supporters.push(supporter)
  return supporter
}
