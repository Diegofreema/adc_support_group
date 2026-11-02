import type { CauseStatus } from '@/types/domain'

/** Fields the Directorate types in; all strings because they come from inputs. */
export interface CauseFormValues {
  title: string
  description: string
  target: string
  deadline: string
  visibleTo: string
}

export interface CauseInput {
  title: string
  description?: string
  target: number
  deadline: string
  visibleTo: string
}

export type CauseFilter = CauseStatus
