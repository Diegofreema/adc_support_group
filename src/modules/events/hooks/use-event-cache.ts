import { useQueryClient, type InfiniteData } from '@tanstack/react-query'

import { eventKeys } from '../utils/event-keys'
import type { EventPage, GroupEvent } from '../types'

const replaceRow = (event: GroupEvent) => (data: InfiniteData<EventPage> | undefined) => data && {
  ...data,
  pages: data.pages.map((page) => ({ ...page, rows: page.rows.map((row) => (row.id === event.id ? event : row)) })),
}

/**
 * Put a fresh event from an RPC into the cache: its page and its row in any
 * loaded list, so a tap costs no extra download.
 */
export function useEventCache() {
  const queryClient = useQueryClient()
  return {
    put: (event: GroupEvent) => {
      queryClient.setQueryData(eventKeys.detail(event.id), event)
      queryClient.setQueriesData<InfiniteData<EventPage>>({ queryKey: eventKeys.lists() }, replaceRow(event))
    },
    /** Lists may now be in a different order or tab. */
    refreshLists: () => queryClient.invalidateQueries({ queryKey: eventKeys.lists() }),
    refreshAll: () => queryClient.invalidateQueries({ queryKey: eventKeys.all }),
  }
}
