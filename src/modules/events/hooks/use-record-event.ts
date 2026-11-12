import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { notify } from '@/lib/toast'
import { recordEventActivity } from '../services/event-record.service'
import { recordFormSchema, toCount, type RecordForm } from '../utils/event-schema'
import type { GroupEvent, RecordEventInput } from '../types'
import { useEventCache } from './use-event-cache'
import { useEventPhotos } from './use-event-photos'

const PHOTO_REQUIRED = 'Add at least one photo'

function useRecordMutation(eventId: string) {
  const cache = useEventCache()
  const navigate = useNavigate()
  return useMutation({
    mutationFn: (input: RecordEventInput) => recordEventActivity(eventId, input),
    onSuccess: async (activityId) => {
      void cache.refreshAll()
      notify('Activity recorded')
      await navigate({ to: '/activities/$activityId', params: { activityId }, replace: true })
    },
  })
}

/** "Make it an activity": guests, people reached (present + guests until edited), photos, note. */
export function useRecordEvent(event: GroupEvent) {
  const form = useForm<RecordForm>({
    resolver: zodResolver(recordFormSchema),
    defaultValues: { guests: '', peopleReached: String(event.presentCount || ''), note: '' },
  })
  const photos = useEventPhotos()
  const [clientRef] = useState(() => crypto.randomUUID())
  const record = useRecordMutation(event.id)

  /** Keep people reached in step with guests until someone types their own number. */
  const onGuestsChange = (guests: string) => {
    if (form.getFieldState('peopleReached').isDirty) return
    const total = event.presentCount + toCount(guests)
    form.setValue('peopleReached', total > 0 ? String(total) : '')
  }

  const submit = form.handleSubmit((values) => {
    if (photos.adding) return
    if (photos.items.length === 0) return photos.setError(PHOTO_REQUIRED)
    record.mutate({
      guests: toCount(values.guests),
      peopleReached: toCount(values.peopleReached),
      note: values.note.trim() || undefined,
      photos: photos.items.map((item) => item.shrunk),
      clientRef,
    })
  })

  return { form, photos, onGuestsChange, submit, isSending: record.isPending }
}
