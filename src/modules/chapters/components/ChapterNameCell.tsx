import { Link } from '@tanstack/react-router'
import { ChevronRight, MapPin } from 'lucide-react'

import { IconTile } from '@/components/shared'
import { levelLabel } from '@/modules/groups'
import type { ChapterRecord } from '../types'

/** Pin, chapter name and level; links to the chapter. */
export function ChapterNameCell({ chapter }: { chapter: ChapterRecord }) {
  return (
    <Link to="/chapters/$chapterId" params={{ chapterId: chapter.id }} className="row text-inherit">
      <IconTile icon={MapPin} tone="grey" />
      <span className="grow">
        <span className="bold block">{chapter.name}</span>
        <span className="tiny muted">{levelLabel(chapter.level)}</span>
      </span>
      <ChevronRight className="i faint" aria-hidden />
    </Link>
  )
}
