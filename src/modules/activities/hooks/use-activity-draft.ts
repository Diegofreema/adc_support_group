import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { activityDetailsSchema, type ActivityDetailsForm } from '../utils/activity-schema'
import type { Draft } from '../utils/build-activity-input'
import { useActivityTypes } from './use-activities'
import { useLocationFix } from './use-location-fix'
import type { MemberChoice } from './use-member-choice'
import { usePhotoList } from './use-photo-list'
import type { KeyValue } from '@/components/shared'
import { ACTIVITY_TYPES } from '@/config/activity-types'
import { useWizard } from '@/hooks/use-wizard'
import type { ActivityStatus } from '@/types/domain'
import type { ActivityTypeOption, ChapterOption } from '../types'

const STEPS = 4
const PHOTO_REQUIRED = 'Add at least one photo'

/** Local calendar day, so late-evening entries don't land on tomorrow. */
const today = () => {
  const now = new Date()
  return new Date(now.getTime() - now.getTimezoneOffset() * 60_000).toISOString().slice(0, 10)
}

/** What the wizard starts with: empty for a new activity, the saved one when editing. */
export interface DraftStart {
  type?: string
  details?: Partial<ActivityDetailsForm>
  photoUrls?: string[]
  videoUrl?: string
}

function useDetailsForm(details: Partial<ActivityDetailsForm> = {}) {
  return useForm<ActivityDetailsForm>({
    resolver: zodResolver(activityDetailsSchema),
    defaultValues: { title: '', date: today(), peopleReached: '', state: '', lga: '', ward: '', note: '', chapterId: '', ...details },
  })
}

/** Enabled types from the backend (config list until they load); the pick falls back to the first one offered. */
function useTypeChoice(initial = 'rally') {
  const loaded = useActivityTypes().data
  const types: ActivityTypeOption[] = loaded?.length ? loaded : ACTIVITY_TYPES
  const [picked, setType] = useState(initial)
  const type = types.some((option) => option.value === picked) ? picked : types[0]!.value
  return { types, type, setType }
}

/** Photos with the proof rule: the photos step can't be passed without one. */
function useProofPhotos(initialUrls: string[] | undefined, next: () => void) {
  const list = usePhotoList(initialUrls)
  const [error, setError] = useState<string>()
  const add = (files: File[]) => { setError(undefined); list.add(files) }
  const proceed = () => {
    if (list.items.length === 0) return setError(PHOTO_REQUIRED)
    setError(undefined)
    next()
  }
  return { photos: { ...list, add }, photoError: error, photosNext: proceed }
}

/** State shared by the record and edit wizards: steps, details form, type, photos, video, location. */
export function useActivityDraft(start: DraftStart = {}) {
  const wizard = useWizard(STEPS)
  const form = useDetailsForm(start.details)
  const { photos, photoError, photosNext } = useProofPhotos(start.photoUrls, wizard.next)
  const { types, type, setType } = useTypeChoice(start.type)
  const [videoUrl, setVideoUrl] = useState(start.videoUrl ?? '')
  const location = useLocationFix()

  const draft = (): Draft => ({ type, details: form.getValues(), photos: photos.items, videoUrl, location })

  return { wizard, form, photos, photoError, photosNext, types, type, setType, videoUrl, setVideoUrl, draft }
}

/** What each wizard adds on top of the shared draft. */
export interface WizardFlowExtras {
  chapters: ChapterOption[]
  defaultChapterLabel: string
  /** Only for people who can record for a member. */
  who?: MemberChoice
  submitDetails: () => void
  summary: () => KeyValue[]
  send: () => void
  sendLabel: string
  isSending: boolean
  sentStatus?: ActivityStatus
}

export type ActivityWizardFlow = ReturnType<typeof useActivityDraft> & WizardFlowExtras
