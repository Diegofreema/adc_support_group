import { Button } from '@/components/shared'
import { useRestoreGroup } from '../hooks/use-groups'

export function RestoreButton({ groupId }: { groupId: string }) {
  const restore = useRestoreGroup()
  return <Button size="sm" disabled={restore.isPending} onClick={(event) => { event.stopPropagation(); restore.mutate(groupId) }}>Restore</Button>
}
