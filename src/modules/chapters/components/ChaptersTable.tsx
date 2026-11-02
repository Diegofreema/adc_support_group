import { useNavigate } from '@tanstack/react-router'

import { Avatar, DataTable, type Column } from '@/components/shared'
import { formatNumber } from '@/lib/format'
import type { ChapterRecord } from '../types'
import { ChapterNameCell } from './ChapterNameCell'

const COLUMNS: Column<ChapterRecord>[] = [
  { key: 'name', header: 'Chapter', main: true, cell: (chapter) => <ChapterNameCell chapter={chapter} /> },
  { key: 'coordinator', header: 'Coordinator', cell: (chapter) => <span className="row !gap-2 justify-end lg:justify-start"><span className="hide-mobile"><Avatar name={chapter.coordinatorName} size="sm" /></span>{chapter.coordinatorName}</span> },
  { key: 'members', header: 'Members', numeric: true, cell: (chapter) => formatNumber(chapter.memberCount) },
  { key: 'activities', header: 'Activities', numeric: true, cell: (chapter) => formatNumber(chapter.activityCount) },
]

export function ChaptersTable({ chapters }: { chapters: ChapterRecord[] }) {
  const navigate = useNavigate()
  const open = (chapter: ChapterRecord) => void navigate({ to: '/chapters/$chapterId', params: { chapterId: chapter.id } })
  return <DataTable rows={chapters} columns={COLUMNS} rowKey={(chapter) => chapter.id} onRowClick={open} />
}
