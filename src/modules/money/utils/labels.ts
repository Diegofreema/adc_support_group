import type { SelectOption } from '@/components/shared'
import type { EntryKind, ExpenseCategory, MoneyEntry } from '../types'

export const CATEGORY_LABELS: Record<ExpenseCategory, string> = {
  transport: 'Transport',
  printing: 'Printing',
  food: 'Food',
  venue: 'Venue',
  airtime: 'Airtime / data',
  other: 'Other',
}

export const CATEGORY_OPTIONS: SelectOption[] = Object.entries(CATEGORY_LABELS).map(([value, label]) => ({ value, label }))

export const KIND_LABELS: Record<EntryKind, string> = { dues: 'Dues', income: 'Income', expense: 'Expense' }

/** Money going out is shown with a minus. */
export const isOut = (kind: EntryKind) => kind === 'expense'

/** The row's main line: who paid dues, or what the money was. */
export function entryTitle(entry: MoneyEntry): string {
  if (entry.kind === 'dues') return `Dues: ${entry.profileName ?? 'Member'}`
  return entry.description ?? KIND_LABELS[entry.kind]
}

/** Short second line: periods for dues, category for expenses, payer for income. */
export function entryDetail(entry: MoneyEntry): string | undefined {
  if (entry.kind === 'dues') return entry.periods.join(', ') || undefined
  if (entry.kind === 'expense') return entry.category && CATEGORY_LABELS[entry.category]
  return entry.profileName && `From ${entry.profileName}`
}

/** Photos show inline; a PDF opens in a new tab. */
export const isPdf = (path: string) => path.toLowerCase().endsWith('.pdf')
