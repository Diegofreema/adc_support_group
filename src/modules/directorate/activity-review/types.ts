import type { Activity } from '@/types/domain'

/** Directorate queues: leader-approved and waiting, checked, rejected. */
export type ReviewStage = 'to-check' | 'checked' | 'rejected'

/** Activity as seen by the Directorate review queue. */
export interface ReviewActivity extends Activity {
  /** Public photo URLs (activity-media bucket). */
  photoUrls: string[]
}

export interface ActivityFilterValues extends Record<string, string> {
  search: string
  type: string
  state: string
}
