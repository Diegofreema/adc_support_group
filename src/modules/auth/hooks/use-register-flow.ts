import { zodResolver } from '@hookform/resolvers/zod'
import { queryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { fetchRegistrationDraft, registerGroup } from '../services/register.service'
import { startSignup } from '../services/verification.service'
import type { RegistrationDraft } from '../types/auth.types'
import { missingPlaceFields, registerGroupSchema, registerSignedInSchema, type RegisterGroupValues } from '../utils/schemas'
import { useStepValidation } from './use-step-validation'
import { useDisclosure } from '@/hooks/use-disclosure'
import { useWizard } from '@/hooks/use-wizard'
import { notify } from '@/lib/toast'
import { useSessionUser } from '@/stores/session-store'

const DEFAULTS: RegisterGroupValues = {
  fullName: '', phone: '', code: '', password: '',
  groupName: '', category: '', about: '',
  location: 'nigeria', level: 'national', state: '', lga: '', ward: '', country: '', city: '',
  leaderTitle: '', photoName: '', cacNumber: '', confirmed: false,
}

export const REGISTER_STEPS = 5
/** Signed-in leaders skip "Your account". */
const GROUP_STEP = 1

export const registrationDraftQuery = queryOptions({ queryKey: ['register', 'draft'], queryFn: fetchRegistrationDraft })

/** Edit mode: the pending/rejected group's current details. */
export function useRegistrationDraft(enabled: boolean) {
  return useQuery({ ...registrationDraftQuery, enabled })
}

/**
 * Register-a-group wizard: account → group → where → leader → check →
 * submitted. The account is created (and the code checked) on submit.
 * Signed in, it starts at "Your group"; with a draft it edits that group
 * (and resubmits it when rejected).
 */
export function useRegisterFlow(draft?: RegistrationDraft) {
  const user = useSessionUser()
  const signedIn = Boolean(user)
  const form = useForm<RegisterGroupValues>({
    resolver: zodResolver(signedIn ? registerSignedInSchema : registerGroupSchema),
    // Signed in: name and phone come from the account (shown on "Check").
    defaultValues: { ...DEFAULTS, fullName: user?.fullName ?? '', phone: user?.phone ?? '', ...draft?.values },
  })
  const firstStep = signedIn ? GROUP_STEP : 0
  const wizard = useWizard(REGISTER_STEPS, firstStep)
  const done = useDisclosure()
  const goNext = useStepValidation(form, wizard)
  const queryClient = useQueryClient()
  const [challengeId, setChallengeId] = useState<string | null>(null)
  const [photo, setPhoto] = useState<File | null>(null)

  const send = useMutation({
    mutationFn: () => startSignup(form.getValues('fullName'), form.getValues('phone')),
    onSuccess: (challenge) => {
      setChallengeId(challenge.challengeId)
      notify(`Code sent to ${challenge.sentTo}`)
    },
  })
  const submit = useMutation({
    mutationFn: (values: RegisterGroupValues) => registerGroup({ values, challengeId, photo, existingPhotoUrl: draft?.photoUrl }),
    onSuccess: (receipt) => {
      if (receipt.photoFailed) notify('Your group was sent, but the photo did not upload. Add it again from Edit details.', 'error')
      void queryClient.invalidateQueries()
      done.open()
    },
  })

  const sendCode = async () => {
    if (await form.trigger(['fullName', 'phone'])) send.mutate()
  }

  const submitWhere = () => {
    const missing = missingPlaceFields(form.getValues())
    missing.forEach((field) => form.setError(field, { message: 'Required' }))
    if (missing.length === 0) wizard.next()
  }

  const pickPhoto = (file: File) => {
    setPhoto(file)
    form.setValue('photoName', file.name)
  }

  return {
    form,
    wizard,
    done,
    /** Back is hidden on the first step shown. */
    back: wizard.step > firstStep ? wizard.back : undefined,
    isEditing: Boolean(draft),
    isResubmit: draft?.status === 'rejected',
    existingPhotoUrl: draft?.photoUrl,
    isPending: submit.isPending,
    isSendingCode: send.isPending,
    sendCode,
    pickPhoto,
    submitAccount: () => goNext(['fullName', 'phone', 'code', 'password']),
    submitGroup: () => goNext(['groupName', 'category']),
    submitWhere,
    submitLeader: () => goNext(['leaderTitle']),
    finish: form.handleSubmit((values) => submit.mutate(values)),
  }
}
