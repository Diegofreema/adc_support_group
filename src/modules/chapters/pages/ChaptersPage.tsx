import { Plus } from 'lucide-react'

import { Button, PageHeader, PageLoader, SearchInput } from '@/components/shared'
import { useDisclosure } from '@/hooks/use-disclosure'
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
  return (
    <>
      <PageHeader title="Chapters" subtitle={`${chapters.total} chapters`} actions={<Button variant="primary" icon={Plus} onClick={dialog.open}>New chapter</Button>} />
      <SearchInput value={chapters.search} onChange={chapters.setSearch} placeholder="Search chapters" />
      <div className="mt-4">{chapters.isLoading ? <PageLoader /> : <ChaptersTable chapters={chapters.results} />}</div>
      <NewChapterDialog open={dialog.isOpen} onOpenChange={dialog.setOpen} groupId={groupId} groupName={user.activeGroupName ?? ''} />
    </>
  )
}
