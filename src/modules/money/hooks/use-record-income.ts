import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useRequiredUser } from '@/stores/session-store'
import { recordIncome } from '../services/record.service'
import { parseAmount, today } from '../utils/amount'
import { incomeSchema, type IncomeForm } from '../utils/schemas'
import { useMoneyMutation } from './use-money-mutation'

/** "Record income": amount, date, where it came from, optional payer and proof. */
export function useRecordIncome() {
  const user = useRequiredUser()
  const save = useMoneyMutation(recordIncome, 'Income recorded')
  const form = useForm<IncomeForm>({
    resolver: zodResolver(incomeSchema),
    defaultValues: { amount: '', occurredOn: today(), description: '', member: null },
  })
  const onValid = (values: IncomeForm) =>
    save.mutate({
      groupId: user.activeGroupId ?? '',
      amount: parseAmount(values.amount),
      occurredOn: values.occurredOn,
      description: values.description,
      profileId: values.member?.id,
      proof: values.proof,
    })
  return { form, submit: form.handleSubmit(onValid), isSaving: save.isPending }
}
