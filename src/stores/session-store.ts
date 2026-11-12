import { useSyncExternalStore } from 'react'

import type { User } from '@/types/domain'

/**
 * The signed-in user, as the app sees it. Supabase persists the session
 * itself; auth's session.service rebuilds this User from it at start-up
 * (bootstrapSession) and after anything that changes it (login, join,
 * register). Route guards read it synchronously.
 */
type Listener = () => void

const listeners = new Set<Listener>()
let currentUser: User | null = null

function emit(): void {
  listeners.forEach((listener) => listener())
}

export const sessionStore = {
  getUser: (): User | null => currentUser,
  setUser(user: User | null): void {
    currentUser = user
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
