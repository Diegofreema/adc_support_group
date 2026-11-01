import { useSyncExternalStore } from 'react'

import type { User } from '@/types/domain'

/**
 * Minimal persisted session store (no extra library).
 * Holds the logged-in user; auth services decide who that is.
 */
const STORAGE_KEY = 'adc-sg-session'
type Listener = () => void

const listeners = new Set<Listener>()
let currentUser: User | null = readStoredUser()

function readStoredUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as User) : null
  } catch {
    return null
  }
}

function persist(user: User | null): void {
  try {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    else localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Storage can be unavailable (private mode); the session still works in memory.
  }
}

function emit(): void {
  listeners.forEach((listener) => listener())
}

export const sessionStore = {
  getUser: (): User | null => currentUser,
  setUser(user: User | null): void {
    currentUser = user
    persist(user)
    emit()
  },
  subscribe(listener: Listener): () => void {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
}

export function useSessionUser(): User | null {
  return useSyncExternalStore(sessionStore.subscribe, sessionStore.getUser)
}

/** For screens inside the authenticated layout, where a user always exists. */
export function useRequiredUser(): User {
  const user = useSessionUser()
  if (!user) throw new Error('useRequiredUser used outside an authenticated route')
  return user
}
