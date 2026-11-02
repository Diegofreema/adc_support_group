import { useActivityOptions, useChapterOptions, useOpenCauses } from './use-payments'
import { useRequiredUser } from '@/stores/session-store'
import type { DraftLookups } from '../utils/pay-draft'

/** Reference data the pay wizard needs. */
export function usePayLookups(): DraftLookups {
  const user = useRequiredUser()
  return {
    groupName: user.activeGroupName ?? 'Your group',
    causes: useOpenCauses().data ?? [],
    chapters: useChapterOptions().data ?? [],
    activities: useActivityOptions().data ?? [],
  }
}
