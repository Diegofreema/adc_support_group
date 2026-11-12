import { activityKeys } from '../utils/activity-keys'
import { myDrafts, sendMyDrafts } from './activity-drafts.service'
import { queryClient } from '@/lib/query-client'

const SYNC_EVERY_MS = 60_000

/** Send waiting drafts and refresh the lists when any went. Never throws. */
export async function syncActivityDrafts(): Promise<void> {
  try {
    if (!navigator.onLine || (await myDrafts()).length === 0) return
    if (await sendMyDrafts()) await queryClient.invalidateQueries({ queryKey: activityKeys.all })
    else await queryClient.invalidateQueries({ queryKey: [...activityKeys.all, 'drafts'] })
  } catch {
    // Phone storage unavailable (private mode): nothing was saved, nothing to send.
  }
}

/** Sends drafts now, when the signal comes back, and every minute while any wait. Returns a stop function. */
export function startActivityDraftSync(): () => void {
  const run = () => void syncActivityDrafts()
  run()
  window.addEventListener('online', run)
  const timer = window.setInterval(run, SYNC_EVERY_MS)
  return () => {
    window.removeEventListener('online', run)
    window.clearInterval(timer)
  }
}
