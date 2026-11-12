import type { ActivityTab } from '../types'

/** People with the approvals power get a review tab; members just see their own work. */
export function tabsFor(canApprove: boolean): ActivityTab[] {
  return canApprove ? ['all', 'review', 'mine'] : ['all', 'mine']
}
