import type { UseQueryResult } from '@tanstack/react-query'

export interface LoadFailure {
  /** Set only when nothing could be loaded; a failed refresh keeps showing the last data. */
  error: Error | null
  retry: () => void
}

/**
 * "It failed" for a list or setting, so a screen never shows a failed load as
 * "nothing here" (which tells staff there is nothing to do when there may be).
 */
export function loadFailure(query: Pick<UseQueryResult<unknown, Error>, 'data' | 'error' | 'refetch'>): LoadFailure {
  return { error: query.data === undefined ? query.error : null, retry: () => void query.refetch() }
}
