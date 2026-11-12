import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'

import { useRequiredUser } from '@/stores/session-store'
import { recordDues } from '../services/record.service'
import type { DuesInfo, MemberOption } from '../types'
import { today } from '../utils/amount'
import { recordDuesSchema, type RecordDuesForm } from '../utils/schemas'
import { useMoneyMutation } from './use-money-mutation'

interface Prefill {
  member?: MemberOption
  period?: string
}

/** "Record dues" form: who, which periods, when, proof. The total is periods × dues. */
export function useRecordDues(dues: DuesInfo, prefill: Prefill) {
  const user = useRequiredUser()
  const save = useMoneyMutation(recordDues, 'Dues recorded')
  const form = useForm<RecordDuesForm>({
    resolver: zodResolver(recordDuesSchema),
    defaultValues: {
      member: prefill.member ? { id: prefill.member.id, name: prefill.member.name } : null,
      fromPeriod: prefill.period ?? dues.currentPeriod ?? '',
      periods: 1,
      paidOn: today(),
      note: '',
    },
  })

  const onValid = (values: RecordDuesForm) =>
    save.mutate({
      groupId: user.activeGroupId ?? '',
      profileId: values.member!.id,
      fromPeriod: values.fromPeriod,
      periods: values.periods,
      paidOn: values.paidOn,
      proof: values.proof,
      note: values.note,
    })

  const periods = useWatch({ control: form.control, name: 'periods' })
  const fromPeriod = useWatch({ control: form.control, name: 'fromPeriod' })
  return { form, fromPeriod, periods, total: (dues.amount ?? 0) * periods, submit: form.handleSubmit(onValid), isSaving: save.isPending }
}
