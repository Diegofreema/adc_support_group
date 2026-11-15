import { zodResolver } from '@hookform/resolvers/zod'

import { ACTIVITY_TYPES } from '@/config/activity-types'
import { useRequiredUser } from '@/stores/session-store'
import { buildEventInput, emptyEventForm, eventToForm } from '../utils/build-event-input'
import { eventFormSchema, type EventForm } from '../utils/event-schema'
import type { EventTypeOption, GroupEvent } from '../types'
import { useEventChapters, useEventTypes } from './use-events'
import { useSaveEvent } from './use-save-event'
import { useVenueLocation } from './use-venue-location'
import { useAppForm } from '@/hooks/use-app-form'
import { friendlyError } from '@/lib/errors'

/** Backend types; the config list until they load. */
function useTypeOptions(): EventTypeOption[] {
  const loaded = useEventTypes().data
  return loaded?.length ? loaded : ACTIVITY_TYPES
}

/**
 * Who picks the chapter: leaders and executives when creating. A
 * coordinator's events are always their chapter's; an event's chapter
 * can't change after it's made.
 */
function useChapterChoice(editing: boolean) {
  const coordinator = Boolean(useRequiredUser().powerChapterId)
  const canPick = !editing && !coordinator
  const chapters = useEventChapters(canPick).data ?? []
  return { chapters: canPick ? chapters : [], coordinator }
}

/** Everything the new / edit event screen needs. */
export function useEventForm(event?: GroupEvent) {
  const types = useTypeOptions()
  const form = useAppForm<EventForm>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: event ? eventToForm(event) : emptyEventForm(types[0]?.value),
  })
  const location = useVenueLocation(event?.hasVenueLocation)
  const save = useSaveEvent(event?.id)
  const chapter = useChapterChoice(Boolean(event))

  return {
    form,
    types,
    location,
    ...chapter,
    submit: form.handleSubmit((values) => save.mutate(buildEventInput(values, location.point))),
    isSaving: save.isPending,
    saveError: save.error ? friendlyError(save.error) : undefined,
  }
}

export type EventFormFlow = ReturnType<typeof useEventForm>
