import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { joinAsSignedIn, joinGroup } from '../services/join.service'
import { startSignup } from '../services/verification.service'
import type { Invite } from '../types/auth.types'
import { joinSchema, type JoinValues } from '../utils/schemas'
import { useStepValidation } from './use-step-validation'
import { useDisclosure } from '@/hooks/use-disclosure'
import { useWizard } from '@/hooks/use-wizard'
import { notify } from '@/lib/toast'
import { useSessionUser } from '@/stores/session-store'

const DEFAULTS: JoinValues = {
  phone: '', code: '', fullName: '', state: '', lga: '', ward: '', password: '',
  email: '', gender: '', ageRange: '', occupation: '', pollingUnit: '',
}

export const JOIN_STEPS = 4

/**
 * Join wizard: invite → phone → code → details → done. The code is checked
 * when the account is created at the end, so a wrong code fails "Join".
 * Someone already signed in joins with one tap from the invite step.
 */
export function useJoinFlow(invite: Invite | undefined) {
  const form = useForm<JoinValues>({ resolver: zodResolver(joinSchema), defaultValues: DEFAULTS })
  const wizard = useWizard(JOIN_STEPS)
  const done = useDisclosure()
  const goNext = useStepValidation(form, wizard)
  const signedIn = useSessionUser()
  const [challengeId, setChallengeId] = useState<string | null>(null)

  const sendCode = () =>
    startSignup(form.getValues('fullName') || 'ADC member', form.getValues('phone')).then((challenge) => {
      setChallengeId(challenge.challengeId)
      return challenge
    })
  const send = useMutation({ mutationFn: sendCode })
  const join = useMutation({
    mutationFn: (values: JoinValues) => {
      if (!challengeId) throw new Error('Send yourself a code first')
      return joinGroup(values, invite!, challengeId)
    },
    onSuccess: done.open,
  })
  const quickJoin = useMutation({ mutationFn: () => joinAsSignedIn(invite!), onSuccess: done.open })

  return {
    form,
    wizard,
    done,
    signedInName: signedIn?.fullName,
    isPending: send.isPending || join.isPending || quickJoin.isPending,
    start: () => (signedIn ? quickJoin.mutate() : wizard.next()),
    submitPhone: () => goNext(['phone'], () => send.mutateAsync()),
    resendCode: () => send.mutateAsync().then(() => notify('Code sent again')),
    submitCode: () => goNext(['code']),
    finish: form.handleSubmit((values) => join.mutate(values)),
  }
}
