import { useMutation, useQueryClient } from '@tanstack/react-query'

import { chapterKeys } from './query-keys'
import { changeCoordinator, createChapter } from '../services/chapters.service'
import type { NewChapterInput } from '../types'
import { notify } from '@/lib/toast'

export function useCreateChapter(groupId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: NewChapterInput) => createChapter(groupId, input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: chapterKeys.all })
      void queryClient.invalidateQueries({ queryKey: ['members'] })
      notify('Chapter created')
    },
  })
}

export function useChangeCoordinator(chapterId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (coordinator: string) => changeCoordinator(chapterId, coordinator),
    onSuccess: (chapter) => {
      queryClient.setQueryData(chapterKeys.detail(chapterId), chapter)
      // The coordinator's role changed: chapter lists and the member list too.
      void queryClient.invalidateQueries({ queryKey: chapterKeys.all })
      void queryClient.invalidateQueries({ queryKey: ['members'] })
      notify('Coordinator changed')
    },
  })
}
