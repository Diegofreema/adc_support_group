import { useState } from 'react'

import { useChapterOptions } from './use-members'
import { useGroup } from '@/modules/groups'

/** Join code + name for the whole group or one chapter. */
export function useInviteTarget(groupId: string) {
  const group = useGroup(groupId)
  const chapters = useChapterOptions(groupId)
  const [chapterId, setChapterId] = useState('')
  const chapter = chapters.data?.find((item) => item.id === chapterId)
  return {
    chapterId, setChapterId,
    chapters: chapters.data ?? [],
    joinCode: chapter?.joinCode ?? group.data?.joinCode ?? '',
    inviteName: chapter ? `${group.data?.name} · ${chapter.name}` : group.data?.name ?? '',
  }
}
