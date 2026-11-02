import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { joinGroup } from '../services/join.service'
import { sendCode, verifyCode } from '../services/verification.service'
import type { Invite } from '../types/auth.types'
import { joinSchema, type JoinValues } from '../utils/schemas'
import { useStepValidation } from './use-step-validation'
import { useDisclosure } from '@/hooks/use-disclosure'
import { useWizard } from '@/hooks/use-wizard'
import { notify } from '@/lib/toast'

const DEFAULTS: JoinValues = {
  phone: '', code: '', fullName: '', state: '', lga: '', ward: '', password: '',
  email: '', gender: '', ageRange: '', occupation: '', pollingUnit: '',
}

export const JOIN_STEPS = 4

/** Join wizard: invite → phone → code → details → done. */
export function useJoinFlow(invite: Invite | undefined) {
  const form = useForm<JoinValues>({ resolver: zodResolver(joinSchema), defaultValues: DEFAULTS })
  const wizard = useWizard(JOIN_STEPS)
  const done = useDisclosure()
  const goNext = useStepValidation(form, wizard)
  const send = useMutation({ mutationFn: sendCode })
  const verify = useMutation({ mutationFn: verifyCode })
  const join = useMutation({ mutationFn: (values: JoinValues) => joinGroup(values, invite!), onSuccess: done.open })

  return {
    form,
    wizard,
    done,
    isPending: send.isPending || verify.isPending || join.isPending,
    start: () => wizard.next(),
    submitPhone: () => goNext(['phone'], () => send.mutateAsync(form.getValues('phone'))),
    resendCode: () => send.mutateAsync(form.getValues('phone')).then(() => notify('Code sent again')),
    submitCode: () => goNext(['code'], () => verify.mutateAsync(form.getValues('code'))),
    finish: form.handleSubmit((values) => join.mutate(values)),
  }
}
