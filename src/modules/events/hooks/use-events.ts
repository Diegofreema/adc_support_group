import { queryOptions, useQuery } from '@tanstack/react-query'

import { getEvent, listChapterOptions, listEventTypes } from '../services/events.service'
import { eventKeys } from '../utils/event-keys'

export const eventQuery = (id: string) => queryOptions({ queryKey: eventKeys.detail(id), queryFn: () => getEvent(id) })

export function useEvent(id: string) {
  return useQuery(eventQuery(id))
}

export function useEventTypes() {
  return useQuery(queryOptions({ queryKey: eventKeys.types(), queryFn: listEventTypes, staleTime: 10 * 60_000 }))
}

/** Chapters an event can be for (only asked for when the picker shows). */
export function useEventChapters(enabled: boolean) {
  return useQuery(queryOptions({ queryKey: eventKeys.chapters(), queryFn: listChapterOptions, staleTime: 5 * 60_000, enabled }))
}
