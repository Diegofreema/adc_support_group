import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { useDebouncedValue } from '@/hooks/use-debounced-value'
import { groupSearchQuery, recipientCountQuery } from '../services/broadcasts.service'
import type { AudienceFilter, BroadcastDraft } from '../types'

/** Shortest search worth sending to the server. */
const MIN_GROUP_SEARCH = 2

function audienceFilter(draft: BroadcastDraft): AudienceFilter {
  return { audience: draft.audience, state: draft.state, category: draft.category, groupId: draft.group?.id }
}

/**
 * How many people the draft reaches, re-counted once the filters settle.
 * `ready` is false while a change is still being counted, so Send never
 * confirms a stale number. An unavailable count doesn't block sending.
 */
export function useRecipientCount(draft: BroadcastDraft) {
  const filter = audienceFilter(draft)
  const settled = useDebouncedValue(filter)
  const query = useQuery({ ...recipientCountQuery(settled), placeholderData: keepPreviousData })
  const pending = JSON.stringify(filter) !== JSON.stringify(settled) || query.isFetching
  const failed = query.isError && !pending
  return {
    count: failed ? undefined : query.data,
    counting: pending,
    failed,
    /** Counted, and nobody matches: nothing to send to. */
    empty: !pending && !failed && query.data?.total === 0,
    ready: failed || (!pending && query.data !== undefined),
  }
}

/** Verified groups matching what staff typed in the group picker. */
export function useGroupSearch(search: string) {
  const term = useDebouncedValue(search.trim())
  const enabled = term.length >= MIN_GROUP_SEARCH
  const query = useQuery({ ...groupSearchQuery(term), enabled, placeholderData: keepPreviousData })
  return { matches: enabled ? query.data ?? [] : [], searching: enabled && query.isFetching, enabled, term }
}
