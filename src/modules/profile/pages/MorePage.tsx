import { LogOut } from 'lucide-react'

import { Button } from '@/components/shared'
import { useDisclosure } from '@/hooks/use-disclosure'
import { useGroupLocked } from '@/hooks/use-group-verified'
import { LogoutConfirm } from '@/modules/auth'
import { useRequiredUser } from '@/stores/session-store'
import { MenuSection } from '../components/MenuSection'
import { MoreProfileCard } from '../components/MoreProfileCard'
import { useMenuCounts } from '../hooks/use-menu-counts'
import { accountLinks, groupLinks } from '../utils/menu-links'

/** Phone menu for everything not in the bottom tabs. */
export function MorePage() {
  const user = useRequiredUser()
  const counts = useMenuCounts()
  const logout = useDisclosure()
  // Group pages open once the Directorate verifies the group.
  const locked = useGroupLocked()
  return (
    <div className="main-narrow mx-auto">
      <MoreProfileCard user={user} />
      {!locked && <MenuSection title="Group" links={groupLinks(counts)} />}
      <MenuSection title="Account" links={accountLinks(counts)} />
      <Button variant="danger" block icon={LogOut} className="mt-8" onClick={logout.open}>Log out</Button>
      <LogoutConfirm open={logout.isOpen} onOpenChange={logout.setOpen} />
    </div>
  )
}
