import { useState } from 'react'

import { Button, Field, Modal, SelectInput } from '@/components/shared'
import type { ChapterOption, MemberRecord } from '../types'

interface MoveChapterDialogProps {
  member: MemberRecord | null
  chapters: ChapterOption[]
  onClose: () => void
  onMove: (chapterId: string) => void
}

/** The select's value for "no chapter" (an empty value would read as nothing chosen). */
const WHOLE_GROUP = 'whole-group'

export function MoveChapterDialog({ member, chapters, onClose, onMove }: MoveChapterDialogProps) {
  const current = member?.chapterId ?? WHOLE_GROUP
  const [chapterId, setChapterId] = useState(current)
  if (!member) return null
  const options = [{ value: WHOLE_GROUP, label: 'Whole group' }, ...chapters.map((chapter) => ({ value: chapter.id, label: chapter.name }))]
  const actions = (
    <>
      <Button onClick={onClose}>Cancel</Button>
      <Button variant="primary" disabled={chapterId === current} onClick={() => onMove(chapterId === WHOLE_GROUP ? '' : chapterId)}>Move</Button>
    </>
  )
  return (
    <Modal open onOpenChange={(open) => !open && onClose()} title="Move chapter" actions={actions}>
      <Field label="Chapter" htmlFor="move-chapter">
        <SelectInput id="move-chapter" options={options} value={chapterId} onChange={(event) => setChapterId(event.target.value)} />
      </Field>
    </Modal>
  )
}
