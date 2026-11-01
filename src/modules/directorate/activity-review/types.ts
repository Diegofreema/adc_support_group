import type { Activity } from '@/types/domain'

export type ReviewStage = 'to-check' | 'leader-approved' | 'flagged'

/** Activity as seen by the Directorate review queue. */
export interface ReviewActivity extends Activity {
  stage: ReviewStage
  flagReason?: string
}

export interface ActivityFilterValues extends Record<string, string> {
  search: string
  type: string
  state: string
}
