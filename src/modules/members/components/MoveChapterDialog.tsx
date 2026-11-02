import { useState } from 'react'

import { Button, Field, Modal, SelectInput } from '@/components/shared'
import type { ChapterOption, MemberRecord } from '../types'

interface MoveChapterDialogProps {
  member: MemberRecord | null
  chapters: ChapterOption[]
  onClose: () => void
  onMove: (chapterId: string) => void
}

export function MoveChapterDialog({ member, chapters, onClose, onMove }: MoveChapterDialogProps) {
  const [chapterId, setChapterId] = useState(member?.chapterId ?? '')
  if (!member) return null
  const actions = (
    <>
      <Button onClick={onClose}>Cancel</Button>
      <Button variant="primary" disabled={!chapterId} onClick={() => onMove(chapterId)}>Move</Button>
    </>
  )
  return (
    <Modal open onOpenChange={(open) => !open && onClose()} title="Move chapter" actions={actions}>
      <Field label="Chapter" htmlFor="move-chapter">
        <SelectInput id="move-chapter" placeholder="Choose" options={chapters.map((chapter) => ({ value: chapter.id, label: chapter.name }))} value={chapterId} onChange={(event) => setChapterId(event.target.value)} />
      </Field>
    </Modal>
  )
}
