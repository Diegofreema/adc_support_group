import { useRequiredUser } from '@/stores/session-store'

/** The group the logged-in leader or member is working with. */
export function useActiveGroupId(): string {
  const user = useRequiredUser()
  if (!user.activeGroupId) throw new Error('No active group for this user')
  return user.activeGroupId
}
