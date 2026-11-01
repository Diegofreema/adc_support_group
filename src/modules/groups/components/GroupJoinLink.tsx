import { useDisclosure } from '@/hooks/use-disclosure'
import type { Group } from '@/types/domain'
import { useRegenerateJoinCode } from '../hooks/use-group-mutations'
import { JoinLinkCard } from './JoinLinkCard'
import { NewLinkDialog } from './NewLinkDialog'

/** Group join link; leaders can replace it after confirming. */
export function GroupJoinLink({ group, canManage }: { group: Group; canManage: boolean }) {
  const confirm = useDisclosure()
  const regenerate = useRegenerateJoinCode(group.id)
  return (
    <>
      <JoinLinkCard joinCode={group.joinCode} inviteName={group.name} onNewLink={canManage ? confirm.open : undefined} />
      <NewLinkDialog open={confirm.isOpen} onOpenChange={confirm.setOpen} onConfirm={() => regenerate.mutate()} />
    </>
  )
}
