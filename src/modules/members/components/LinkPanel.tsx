import { Card } from '@/components/shared'
import { ShareLinkButtons, useJoinLinkActions } from '@/modules/groups'
import type { ChapterOption } from '../types'
import { ChapterSelect } from './ChapterSelect'

interface LinkPanelProps {
  joinCode: string
  inviteName: string
  chapters: ChapterOption[]
  chapterId: string
  onChapterChange: (chapterId: string) => void
}

/** Pick group or chapter, then copy or WhatsApp the link. */
export function LinkPanel({ joinCode, inviteName, chapters, chapterId, onChapterChange }: LinkPanelProps) {
  const { link, copy, whatsappUrl } = useJoinLinkActions(joinCode, inviteName)
  return (
    <Card>
      <ChapterSelect id="link-chapter" chapters={chapters} value={chapterId} onChange={onChapterChange} />
      <div className="input-group mt-4">
        <span className="prefix tiny">Link</span>
        <input className="input" value={link} readOnly aria-label="Join link" />
      </div>
      <ShareLinkButtons whatsappUrl={whatsappUrl} onCopy={copy} className="grid-2 mt-4 !grid-cols-2" />
    </Card>
  )
}
