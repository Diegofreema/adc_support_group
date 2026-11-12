import { useRequiredUser } from '@/stores/session-store'

/** Thrown when a group screen opens for someone who isn't in a group. */
export class NoGroupError extends Error {
  constructor() {
    super("You're not in a group yet")
    this.name = 'NoGroupError'
  }
}

/**
 * The group the logged-in leader or member is working with. Route guards
 * send people without a group to /home first; if a screen still gets here,
 * the route error screen recognises NoGroupError and points them home.
 */
export function useActiveGroupId(): string {
  const user = useRequiredUser()
  if (!user.activeGroupId) throw new NoGroupError()
  return user.activeGroupId
}
