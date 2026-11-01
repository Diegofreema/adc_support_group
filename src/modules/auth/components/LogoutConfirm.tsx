import { ConfirmDialog } from '@/components/shared'
import { useLogout } from '../hooks/use-logout'

interface LogoutConfirmProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

/** "Log out?" confirmation used by Profile and More. */
export function LogoutConfirm({ open, onOpenChange }: LogoutConfirmProps) {
  const logout = useLogout()
  return <ConfirmDialog open={open} onOpenChange={onOpenChange} title="Log out?" confirmLabel="Log out" destructive onConfirm={logout} />
}
