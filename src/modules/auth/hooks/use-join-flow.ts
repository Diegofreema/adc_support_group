import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { joinAsSignedIn, joinGroup, type JoinResult } from '../services/join.service'
import { isExistingAccountError, startSignup } from '../services/verification.service'
import type { Invite } from '../types/auth.types'
import { joinSchema, type JoinValues } from '../utils/schemas'
import { useStepValidation } from './use-step-validation'
import { useDisclosure } from '@/hooks/use-disclosure'
import { useWizard } from '@/hooks/use-wizard'
import { notify } from '@/lib/toast'
import { useSessionUser } from '@/stores/session-store'

const DEFAULTS: JoinValues = {
  phone: '', code: '', fullName: '', state: '', lga: '', ward: '', password: '', email: '', gender: '',
}

export const JOIN_STEPS = 4

/**
 * Join wizard: invite → name + phone (code sent) → code → place + password →
 * done. The code is checked when the account is created at the end, so a
 * wrong code fails "Finish". Someone already signed in joins with one tap.
 * A phone that already has an account is offered "Log in to join", which
 * comes back to this link.
 */
export function useJoinFlow(invite: Invite | undefined) {
  const form = useForm<JoinValues>({ resolver: zodResolver(joinSchema), defaultValues: DEFAULTS })
  const wizard = useWizard(JOIN_STEPS)
  const done = useDisclosure()
  const goNext = useStepValidation(form, wizard)
  const signedIn = useSessionUser()
  const [challengeId, setChallengeId] = useState<string | null>(null)

  const send = useMutation({
    mutationFn: () => startSignup(form.getValues('fullName').trim(), form.getValues('phone')),
    meta: { inlineError: true },
    onSuccess: (challenge) => setChallengeId(challenge.challengeId),
  })
  const join = useMutation({
    mutationFn: (values: JoinValues) => {
      if (!challengeId) throw new Error('Send yourself a code first')
      return joinGroup(values, invite!, challengeId)
    },
    onSuccess: (result: JoinResult) => {
      if (result.email && result.emailCodeSent) notify(`We sent a code to ${result.email}. Enter it in your profile to add your email.`)
      if (result.email && !result.emailCodeSent) notify("You're in, but we couldn't send a code to your email. Add it in your profile.", 'error')
      done.open()
    },
  })
  const quickJoin = useMutation({ mutationFn: () => joinAsSignedIn(invite!), onSuccess: done.open })

  const sendError = send.error
  const accountExists = sendError ? isExistingAccountError(sendError) : false

  return {
    form,
    wizard,
    done,
    signedInName: signedIn?.fullName,
    isPending: send.isPending || join.isPending || quickJoin.isPending,
    sendError: sendError?.message,
    /** Where "Log in to join" returns to, when the phone already has an account. */
    loginToJoin: accountExists && invite ? `/join/${invite.code}` : undefined,
    start: () => (signedIn ? quickJoin.mutate() : wizard.next()),
    submitPhone: () => goNext(['fullName', 'phone'], () => send.mutateAsync()).catch(() => undefined),
    resendCode: () => send.mutateAsync().then(() => notify('Code sent again'), (error: Error) => notify(error.message, 'error')),
    submitCode: () => goNext(['code']),
    finish: form.handleSubmit((values) => join.mutate(values)),
  }
}
