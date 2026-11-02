import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { activityDetailsSchema, type ActivityDetailsForm } from '../utils/activity-schema'
import { activitySummary, buildActivityInput } from '../utils/build-activity-input'
import { useCreateActivity } from './use-create-activity'
import { usePhotoList } from './use-photo-list'
import { useWizard } from '@/hooks/use-wizard'
import type { ActivityTypeId } from '../types'

const STEPS = 4

const today = () => new Date().toISOString().slice(0, 10)

function useDetailsForm() {
  return useForm<ActivityDetailsForm>({
    resolver: zodResolver(activityDetailsSchema),
    defaultValues: { title: '', date: today(), peopleReached: '', state: '', lga: '', ward: '', note: '' },
  })
}

/** All state for the "Record activity" wizard. */
export function useRecordActivity() {
  const wizard = useWizard(STEPS)
  const form = useDetailsForm()
  const photos = usePhotoList()
  const [type, setType] = useState<ActivityTypeId>('rally')
  const [videoUrl, setVideoUrl] = useState('')
  const create = useCreateActivity()

  const draft = () => ({ type, details: form.getValues(), photoTones: photos.items, videoUrl })

  return {
    wizard, form, photos, type, setType, videoUrl, setVideoUrl,
    submitDetails: form.handleSubmit(() => wizard.next()),
    summary: () => activitySummary(draft()),
    send: () => create.mutate(buildActivityInput(draft())),
    isSending: create.isPending,
    isSent: create.isSuccess,
  }
}
