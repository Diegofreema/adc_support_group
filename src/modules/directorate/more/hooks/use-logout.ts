import { useNavigate } from '@tanstack/react-router'

import { logout } from '@/modules/auth/services/auth.service'

/** Clear the session and go back to the login page. */
export function useLogout(): () => void {
  const navigate = useNavigate()
  return () => {
    logout()
    navigate({ to: '/' })
  }
}
