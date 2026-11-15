import { zodResolver } from '@hookform/resolvers/zod'

import { formatNumber } from '@/lib/format'
import { saveDuesSettings } from '../services/money.service'
import type { DuesInfo } from '../types'
import { parseAmount, today } from '../utils/amount'
import { duesSettingsSchema, type DuesSettingsForm } from '../utils/schemas'
import { useMoneyMutation } from './use-money-mutation'
import { useAppForm } from '@/hooks/use-app-form'

function defaults(dues: DuesInfo): DuesSettingsForm {
  return {
    enabled: dues.enabled,
    amount: dues.amount ? formatNumber(dues.amount) : '',
    period: dues.period ?? 'month',
    startOn: dues.startOn ?? today(),
  }
}

/** Dues on/off, amount, how often, first period. */
export function useDuesSettings(dues: DuesInfo) {
  const save = useMoneyMutation(saveDuesSettings, 'Dues saved')
  const form = useAppForm<DuesSettingsForm>({ resolver: zodResolver(duesSettingsSchema), defaultValues: defaults(dues) })
  const onValid = (values: DuesSettingsForm) => save.mutate({ ...values, amount: parseAmount(values.amount) })
  return { form, submit: form.handleSubmit(onValid), isSaving: save.isPending }
}
