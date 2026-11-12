import { activitySummary, buildActivityInput } from '../utils/build-activity-input'
import { useActivityDraft, type ActivityWizardFlow } from './use-activity-draft'
import { useActivityChapters } from './use-activities'
import { useCreateActivity } from './use-create-activity'
import { useMemberChoice } from './use-member-choice'
import { hasAnyPower } from '@/lib/permissions'
import { useRequiredUser } from '@/stores/session-store'

/** The group's chapters; the default ("") is the recorder's own chapter, or the whole group for a leader. */
function useChapterChoice() {
  const user = useRequiredUser()
  return {
    chapters: useActivityChapters().data ?? [],
    defaultChapterLabel: user.chapterName ?? 'Whole group',
  }
}

/** All state for the "Record activity" wizard. */
export function useRecordActivity(): ActivityWizardFlow {
  const canRecordForOthers = hasAnyPower(useRequiredUser())
  const base = useActivityDraft()
  const who = useMemberChoice()
  const create = useCreateActivity()
  const { chapters, defaultChapterLabel } = useChapterChoice()
  const forProfileId = canRecordForOthers ? who.forProfileId : undefined

  const submitDetails = () => {
    const whoOk = !canRecordForOthers || who.validate()
    void base.form.handleSubmit(() => { if (whoOk) base.wizard.next() })()
  }

  return {
    ...base, chapters, defaultChapterLabel, submitDetails,
    who: canRecordForOthers ? who : undefined,
    summary: () => activitySummary(base.draft(), { types: base.types, chapters, defaultChapterLabel, forName: forProfileId ? who.member?.name : undefined }),
    send: () => create.mutate(buildActivityInput({ ...base.draft(), forProfileId })),
    sendLabel: 'Send',
    isSending: create.isPending,
    sentStatus: create.data?.kind === 'sent' ? create.data.activity.status : undefined,
  }
}
