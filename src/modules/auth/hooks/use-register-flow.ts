import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { registerGroup } from '../services/register.service'
import { sendCode } from '../services/verification.service'
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

/** Register-a-group wizard: account → group → where → leader → check → submitted. */
export function useRegisterFlow() {
  const form = useForm<RegisterGroupValues>({ resolver: zodResolver(registerGroupSchema), defaultValues: DEFAULTS })
  const wizard = useWizard(REGISTER_STEPS)
  const done = useDisclosure()
  const goNext = useStepValidation(form, wizard)
  const send = useMutation({ mutationFn: sendCode, onSuccess: () => notify('Code sent') })
  const submit = useMutation({ mutationFn: registerGroup, onSuccess: done.open })

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
    sendCode: () => send.mutate(form.getValues('phone')),
    submitAccount: () => goNext(['fullName', 'phone', 'code', 'password']),
    submitGroup: () => goNext(['groupName', 'category']),
    submitWhere,
    submitLeader: () => goNext(['leaderTitle']),
    finish: form.handleSubmit((values) => submit.mutate(values)),
  }
}
