import type { ChoiceOption } from '@/components/shared'

export interface ReasonChoice {
  value: string
  label: string
}

export interface ReasonInput {
  reason: string
  note: string
}

/** Turn reason choices into ChoiceList options. */
export function toReasonOptions(reasons: readonly ReasonChoice[]): ChoiceOption<string>[] {
  return reasons.map((reason) => ({ value: reason.value, title: reason.label }))
}

export function reasonLabel(reasons: readonly ReasonChoice[], value: string): string {
  return reasons.find((reason) => reason.value === value)?.label ?? value
}

/** One line the other side will read: "Duplicate group. Join Atiku Women Network." */
export function reasonMessage(reasons: readonly ReasonChoice[], input: ReasonInput): string {
  return [reasonLabel(reasons, input.reason), input.note.trim()].filter(Boolean).join('. ')
}
