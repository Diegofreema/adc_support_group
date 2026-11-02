import { LogOut } from 'lucide-react'

import { Button } from '@/components/shared'
import { useDisclosure } from '@/hooks/use-disclosure'
import { LogoutConfirm } from '@/modules/auth'

export function LogoutButton() {
  const confirm = useDisclosure()
  return (
    <>
      <Button variant="danger" block icon={LogOut} className="mt-6" onClick={confirm.open}>Log out</Button>
      <LogoutConfirm open={confirm.isOpen} onOpenChange={confirm.setOpen} />
    </>
  )
}
