import { useActivityOptions, useChapterOptions, useOpenCauses } from './use-payments'
import { useRequiredUser } from '@/stores/session-store'
import type { DraftLookups } from '../utils/pay-draft'

/** Reference data the pay wizard and offline form need. */
export function usePayLookups(): DraftLookups {
  const user = useRequiredUser()
  return {
    groupName: user.activeGroupName ?? 'Your group',
    payerName: user.fullName,
    causes: useOpenCauses().data ?? [],
    chapters: useChapterOptions().data ?? [],
    // Leaders have no chapter of their own; members default to theirs.
    defaultChapterLabel: user.role === 'leader' ? 'Whole group' : 'My chapter',
    activities: useActivityOptions().data ?? [],
  }
}
