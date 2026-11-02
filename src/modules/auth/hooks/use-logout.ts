import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { logout } from '../services/auth.service'

/** End the session, drop cached data and go back to login. */
export function useLogout(): () => void {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  return () => {
    logout()
    queryClient.clear()
    navigate({ to: '/' })
  }
}
