import { canManageGroup } from '@/modules/groups'
import { EmptyState, JoinLinkCard, PageLoader } from '@/components/shared'
import { MapPinOff } from 'lucide-react'
import { useRequiredUser } from '@/stores/session-store'
import { ChapterActivities } from '../components/ChapterActivities'
import { ChapterHeader } from '../components/ChapterHeader'
import { ChapterStats } from '../components/ChapterStats'
import { CoordinatorSection } from '../components/CoordinatorSection'
import { useChapter } from '../hooks/use-chapters'
import { useChapterIdParam } from '../hooks/use-chapter-id-param'

export function ChapterPage() {
  const chapterId = useChapterIdParam()
  const user = useRequiredUser()
  const { data: chapter, isLoading } = useChapter(chapterId)
  if (isLoading) return <PageLoader />
  if (!chapter) return <EmptyState icon={MapPinOff} title="Chapter not found" />
  const groupName = user.activeGroupName ?? ''
  return (
    <>
      <ChapterHeader chapter={chapter} groupName={groupName} />
      <div className="mt-6"><ChapterStats chapter={chapter} /></div>
      <div className="grid-2 mt-6 items-start">
        <div>
          <CoordinatorSection chapter={chapter} canManage={canManageGroup(user)} />
          <div className="mt-6"><JoinLinkCard joinCode={chapter.joinCode} inviteName={`${groupName} · ${chapter.name}`} title="Chapter link" /></div>
        </div>
        <ChapterActivities chapterId={chapter.id} />
      </div>
    </>
  )
}
