import { GroupMark } from '@/components/shared'
import { levelLabel } from '@/modules/groups'
import type { ChapterRecord } from '../types'

export function ChapterHeader({ chapter, groupName }: { chapter: ChapterRecord; groupName: string }) {
  return (
    <div className="row gap-3.5">
      <GroupMark name={chapter.name} className="!size-15 !text-xl" />
      <div className="grow">
        <h1 className="h1 !text-2xl">{chapter.name}</h1>
        <p className="muted small mt-1">{groupName} · {levelLabel(chapter.level)} chapter</p>
      </div>
    </div>
  )
}
