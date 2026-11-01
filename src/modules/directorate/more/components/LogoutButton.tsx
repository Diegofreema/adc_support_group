import { LogOut } from 'lucide-react'

import { Button, ConfirmDialog } from '@/components/shared'
import { useDisclosure } from '@/hooks/use-disclosure'
import { useLogout } from '../hooks/use-logout'

export function LogoutButton() {
  const confirm = useDisclosure()
  const logout = useLogout()
  return (
    <>
      <Button variant="danger" block icon={LogOut} className="mt-6" onClick={confirm.open}>Log out</Button>
      <ConfirmDialog open={confirm.isOpen} onOpenChange={confirm.setOpen} title="Log out?" confirmLabel="Log out" destructive onConfirm={logout} />
    </>
  )
}
