import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { registerGroup } from '../services/register.service'
import { startSignup } from '../services/verification.service'
import { missingPlaceFields, registerGroupSchema, type RegisterGroupValues } from '../utils/schemas'
import { useStepValidation } from './use-step-validation'
import { useDisclosure } from '@/hooks/use-disclosure'
import { useWizard } from '@/hooks/use-wizard'
import { notify } from '@/lib/toast'

const DEFAULTS: RegisterGroupValues = {
  fullName: '', phone: '', code: '', password: '',
  groupName: '', category: '', about: '',
  location: 'nigeria', level: 'national', state: '', lga: '', ward: '', country: '', city: '',
  leaderTitle: '', photoName: '', cacNumber: '', confirmed: false,
}

export const REGISTER_STEPS = 5

/**
 * Register-a-group wizard: account → group → where → leader → check →
 * submitted. The account is created (and the code checked) on submit.
 */
export function useRegisterFlow() {
  const form = useForm<RegisterGroupValues>({ resolver: zodResolver(registerGroupSchema), defaultValues: DEFAULTS })
  const wizard = useWizard(REGISTER_STEPS)
  const done = useDisclosure()
  const goNext = useStepValidation(form, wizard)
  const [challengeId, setChallengeId] = useState<string | null>(null)

  const send = useMutation({
    mutationFn: () => startSignup(form.getValues('fullName'), form.getValues('phone')),
    onSuccess: (challenge) => {
      setChallengeId(challenge.challengeId)
      notify(`Code sent to ${challenge.sentTo}`)
    },
  })
  const submit = useMutation({
    mutationFn: (values: RegisterGroupValues) => registerGroup(values, challengeId),
    onSuccess: done.open,
  })

  const sendCode = async () => {
    if (await form.trigger(['fullName', 'phone'])) send.mutate()
  }

  const submitWhere = () => {
    const missing = missingPlaceFields(form.getValues())
    missing.forEach((field) => form.setError(field, { message: 'Required' }))
    if (missing.length === 0) wizard.next()
  }

  return {
    form,
    wizard,
    done,
    isPending: submit.isPending,
    isSendingCode: send.isPending,
    sendCode,
    submitAccount: () => goNext(['fullName', 'phone', 'code', 'password']),
    submitGroup: () => goNext(['groupName', 'category']),
    submitWhere,
    submitLeader: () => goNext(['leaderTitle']),
    finish: form.handleSubmit((values) => submit.mutate(values)),
  }
}
