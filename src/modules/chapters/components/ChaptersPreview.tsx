import { Link } from '@tanstack/react-router'
import { MapPin } from 'lucide-react'

import { IconTile, List, ListItem, SectionTitle } from '@/components/shared'
import { formatNumber } from '@/lib/format'
import { useChapters } from '../hooks/use-chapters'

const PREVIEW_COUNT = 3

/** Biggest chapters with a link to all of them. */
export function ChaptersPreview({ groupId }: { groupId: string }) {
  const { data: chapters = [] } = useChapters(groupId)
  if (chapters.length === 0) return null
  return (
    <section>
      <SectionTitle title="Chapters" action={<Link to="/chapters">See all</Link>} />
      <List>
        {chapters.slice(0, PREVIEW_COUNT).map((chapter) => (
          <ListItem
            key={chapter.id}
            to="/chapters/$chapterId"
            params={{ chapterId: chapter.id }}
            leading={<IconTile icon={MapPin} tone="grey" />}
            title={chapter.name}
            meta={`${formatNumber(chapter.memberCount)} members`}
          />
        ))}
      </List>
    </section>
  )
}
