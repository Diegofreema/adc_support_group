import type { Cause, CauseStatus } from '@/types/domain'

/** A cause plus who it is shown to, as stored (empty = everyone). */
export interface DirectorateCause extends Cause {
  visibleStates: string[]
  visibleCategoryIds: string[]
}

/** Fields the Directorate types in; all strings because they come from inputs. */
export interface CauseFormValues {
  title: string
  description: string
  target: string
  deadline: string
  /** An audience key from utils/visibility ('all', 'zone:…', 'state:…', 'category:…', 'keep'). */
  visibleTo: string
}

export interface CauseInput {
  title: string
  description?: string
  target: number
  deadline: string
  visibleStates: string[]
  visibleCategoryIds: string[]
}

export type CauseFilter = CauseStatus
