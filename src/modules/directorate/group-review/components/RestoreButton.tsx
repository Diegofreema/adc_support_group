import { RotateCcw } from 'lucide-react'

import { Button } from '@/components/shared'
import { useRestoreGroup } from '../hooks/use-groups'

/** Small in table rows; full width (block) on the review page. */
export function RestoreButton({ groupId, block }: { groupId: string; block?: boolean }) {
  const restore = useRestoreGroup()
  return (
    <Button size={block ? undefined : 'sm'} block={block} icon={block ? RotateCcw : undefined} className={block ? undefined : '!min-h-11'} disabled={restore.isPending} onClick={(event) => { event.stopPropagation(); restore.mutate(groupId) }}>
      Restore
    </Button>
  )
}
