import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { editActivity } from '../services/activities.service'
import { activitySummary, buildActivityInput } from '../utils/build-activity-input'
import { useActivityDraft, type ActivityWizardFlow, type DraftStart } from './use-activity-draft'
import { activityKeys } from './use-activities'
import { notify } from '@/lib/toast'
import type { ActivityDetail, NewActivityInput } from '../types'

/** The saved activity as the wizard's starting point. */
function startFrom(activity: ActivityDetail): DraftStart {
  return {
    type: activity.type,
    details: {
      title: activity.title,
      date: activity.date.slice(0, 10),
      peopleReached: String(activity.peopleReached),
      state: activity.state ?? '',
      lga: activity.lga ?? '',
      ward: activity.ward ?? '',
      note: activity.note ?? '',
    },
    photoUrls: activity.photoUrls ?? [],
    videoUrl: activity.videoUrl ?? '',
  }
}

function useSaveEdit(id: string) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  return useMutation({
    mutationFn: (input: NewActivityInput) => editActivity(id, input),
    onSuccess: async (saved) => {
      notify(saved.status === 'approved' ? 'Saved' : 'Sent for approval')
      // Leave first, so the edit screen never re-renders the saved (maybe now locked) activity.
      await navigate({ to: '/activities/$activityId', params: { activityId: id } })
      return queryClient.invalidateQueries({ queryKey: activityKeys.all })
    },
  })
}

/** The record wizard, prefilled, saving through edit_support_group_activity. Chapter can't change. */
export function useEditActivity(activity: ActivityDetail): ActivityWizardFlow {
  const base = useActivityDraft(startFrom(activity))
  const save = useSaveEdit(activity.id)
  const lookups = { types: base.types, chapters: [], defaultChapterLabel: activity.chapterName ?? 'Whole group' }

  return {
    ...base, chapters: [], defaultChapterLabel: lookups.defaultChapterLabel,
    submitDetails: () => void base.form.handleSubmit(() => base.wizard.next())(),
    summary: () => activitySummary(base.draft(), lookups),
    send: () => save.mutate(buildActivityInput(base.draft())),
    sendLabel: 'Send again',
    isSending: save.isPending,
  }
}
