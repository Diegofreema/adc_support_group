import type { Session } from '@supabase/supabase-js'

import { refreshSessionUser } from './session.service'
import { invokeFunction } from '@/lib/edge-functions'
import { supabase } from '@/lib/supabase'
import { sessionStore } from '@/stores/session-store'
import type { User } from '@/types/domain'

export interface Credentials {
  /** Phone number or email. */
  identifier: string
  password: string
}

/** Edge functions that sign someone in hand back a session to install. */
export async function installSession(session: Session): Promise<void> {
  const { error } = await supabase.auth.setSession({
    access_token: session.access_token,
    refresh_token: session.refresh_token,
  })
  if (error) throw new Error(error.message)
}

async function signIn({ identifier, password }: Credentials): Promise<void> {
  const value = identifier.trim()
  if (value.includes('@')) {
    const { error } = await supabase.auth.signInWithPassword({ email: value.toLowerCase(), password })
    if (error) throw new Error('Wrong email or password')
    return
  }
  // Phone accounts sign in through the shared edge function (the phone is
  // matched in every stored shape and the session comes back directly).
  const { session } = await invokeFunction<{ session: Session }>('auth-phone-login-initiate', { phone: value, password })
  await installSession(session)
}

/** Phone or email + password. Resolves with the signed-in User. */
export async function login(credentials: Credentials): Promise<User> {
  await signIn(credentials)
  const user = await refreshSessionUser()
  if (!user) {
    await supabase.auth.signOut()
    throw new Error('This account has no profile yet. Please contact support.')
  }
  return user
}

export async function logout(): Promise<void> {
  sessionStore.setUser(null)
  await supabase.auth.signOut()
}

/** Where each role lands after logging in. */
export function homePathFor(user: User): string {
  return user.role === 'directorate' ? '/admin' : '/home'
}
