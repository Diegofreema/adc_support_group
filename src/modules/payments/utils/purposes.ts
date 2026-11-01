import { Ellipsis, Package, Radio, Bus, Users, type LucideIcon } from 'lucide-react'

import type { TileOption } from '@/components/shared'
import type { Payment } from '@/types/domain'
import type { GeneralPurposeId } from '../types'

export const GENERAL_PURPOSES: TileOption<GeneralPurposeId>[] = [
  { value: 'mobilisation', label: 'Mobilisation', icon: Users },
  { value: 'logistics', label: 'Logistics', icon: Bus },
  { value: 'media', label: 'Media', icon: Radio },
  { value: 'materials', label: 'Materials', icon: Package },
  { value: 'other', label: 'Other', icon: Ellipsis },
]

export function purposeLabel(purpose: string): string {
  return GENERAL_PURPOSES.find((option) => option.value === purpose)?.label ?? 'General support'
}

export function purposeIcon(purpose: string): LucideIcon {
  return GENERAL_PURPOSES.find((option) => option.value === purpose)?.icon ?? Ellipsis
}

/** What a payment was for, in a few words. */
export function paymentTitle(payment: Payment): string {
  return payment.purpose.kind === 'cause' ? payment.purpose.causeTitle : purposeLabel(payment.purpose.purpose)
}
