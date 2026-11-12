import { Plus } from 'lucide-react'

import { Button, PageHeader, SearchInput, SkeletonTable } from '@/components/shared'
import { useDisclosure } from '@/hooks/use-disclosure'
import { countLabel } from '@/lib/format'
import { useGroupLocked } from '@/hooks/use-group-verified'
import { useActiveGroupId } from '@/modules/groups'
import { useRequiredUser } from '@/stores/session-store'
import { ChaptersTable } from '../components/ChaptersTable'
import { NewChapterDialog } from '../components/NewChapterDialog'
import { useChapterSearch } from '../hooks/use-chapter-search'

export function ChaptersPage() {
  const groupId = useActiveGroupId()
  const user = useRequiredUser()
  const chapters = useChapterSearch(groupId)
  const dialog = useDisclosure()
  // Only the leader of a verified group creates chapters (the server refuses anyone else).
  const locked = useGroupLocked()
  const canCreate = user.role === 'leader' && !locked
  return (
    <>
      <PageHeader title="Chapters" subtitle={countLabel(chapters.total, 'chapter', 'chapters')} actions={canCreate ? <Button variant="primary" icon={Plus} onClick={dialog.open}>New chapter</Button> : undefined} />
      <SearchInput value={chapters.search} onChange={chapters.setSearch} placeholder="Search chapters" />
      <div className="mt-4">{chapters.isLoading ? <SkeletonTable /> : <ChaptersTable chapters={chapters.results} />}</div>
      {canCreate && <NewChapterDialog open={dialog.isOpen} onOpenChange={dialog.setOpen} groupId={groupId} groupName={user.activeGroupName ?? ''} />}
    </>
  )
}
