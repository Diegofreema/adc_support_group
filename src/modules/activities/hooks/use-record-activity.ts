import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { activityDetailsSchema, type ActivityDetailsForm } from '../utils/activity-schema'
import { activitySummary, buildActivityInput } from '../utils/build-activity-input'
import { useActivityTypes } from './use-activities'
import { useCreateActivity } from './use-create-activity'
import { usePhotoList } from './use-photo-list'
import { ACTIVITY_TYPES } from '@/config/activity-types'
import { useWizard } from '@/hooks/use-wizard'
import type { ActivityTypeOption } from '../types'

const STEPS = 4

/** Local calendar day, so late-evening entries don't land on tomorrow. */
const today = () => {
  const now = new Date()
  return new Date(now.getTime() - now.getTimezoneOffset() * 60_000).toISOString().slice(0, 10)
}

function useDetailsForm() {
  return useForm<ActivityDetailsForm>({
    resolver: zodResolver(activityDetailsSchema),
    defaultValues: { title: '', date: today(), peopleReached: '', state: '', lga: '', ward: '', note: '' },
  })
}

/** Enabled types from the backend (config list until they load); the pick falls back to the first one offered. */
function useTypeChoice() {
  const loaded = useActivityTypes().data
  const types: ActivityTypeOption[] = loaded?.length ? loaded : ACTIVITY_TYPES
  const [picked, setType] = useState('rally')
  const type = types.some((option) => option.value === picked) ? picked : types[0]!.value
  return { types, type, setType }
}

/** All state for the "Record activity" wizard. */
export function useRecordActivity() {
  const wizard = useWizard(STEPS)
  const form = useDetailsForm()
  const photos = usePhotoList()
  const { types, type, setType } = useTypeChoice()
  const [videoUrl, setVideoUrl] = useState('')
  const create = useCreateActivity()

  const draft = () => ({ type, details: form.getValues(), photos: photos.items.map((photo) => photo.file), videoUrl })

  return {
    wizard, form, photos, types, type, setType, videoUrl, setVideoUrl,
    submitDetails: form.handleSubmit(() => wizard.next()),
    summary: () => activitySummary(draft(), types),
    send: () => create.mutate(buildActivityInput(draft())),
    isSending: create.isPending,
    sentStatus: create.data?.status,
  }
}
