import { queryOptions } from '@tanstack/react-query'

import { proofUrl } from '@/lib/proof-upload'
import { rpc } from '@/lib/supabase'
import type { DuesPeriod, DuesSettingsInput, EntryKind, EntryPage, ExpenseCategory, MoneyEntry, MoneySummary } from '../types'
import { moneyKeys } from '../utils/money-keys'

type Num = number | string | null

interface SummaryJson {
  money_in: Num
  money_out: Num
  balance: Num
  month_in: Num
  month_out: Num
  given_to_campaign: Num
  dues: {
    enabled: boolean
    amount: Num
    period: DuesPeriod | null
    start_on: string | null
    current_period: string | null
    current_label: string | null
    i_paid_current: boolean
    my_paid: { period_start: string; label: string }[] | null
  }
  can_manage: boolean
  can_set_dues: boolean
  can_see_entries: boolean
}

interface EntryJson {
  id: string
  kind: EntryKind
  amount: Num
  occurred_on: string
  profile_name: string | null
  category: ExpenseCategory | null
  description: string | null
  proof_path: string | null
  recorded_by_name: string | null
  created_at: string
  voided: boolean
  void_reason: string | null
  periods: string[] | null
}

const num = (value: Num) => Number(value ?? 0)

function toDues(json: SummaryJson['dues']): MoneySummary['dues'] {
  return {
    enabled: json.enabled,
    amount: json.amount === null ? undefined : num(json.amount),
    period: json.period ?? undefined,
    startOn: json.start_on ?? undefined,
    currentPeriod: json.current_period ?? undefined,
    currentLabel: json.current_label ?? undefined,
    iPaidCurrent: json.i_paid_current,
    myPaid: (json.my_paid ?? []).map((paid) => ({ start: paid.period_start, label: paid.label })),
  }
}

function toSummary(json: SummaryJson): MoneySummary {
  return {
    moneyIn: num(json.money_in),
    moneyOut: num(json.money_out),
    balance: num(json.balance),
    monthIn: num(json.month_in),
    monthOut: num(json.month_out),
    givenToCampaign: num(json.given_to_campaign),
    dues: toDues(json.dues),
    canManage: json.can_manage,
    canSetDues: json.can_set_dues,
    canSeeEntries: json.can_see_entries,
  }
}

function toEntry(json: EntryJson): MoneyEntry {
  return {
    id: json.id,
    kind: json.kind,
    amount: num(json.amount),
    occurredOn: json.occurred_on,
    profileName: json.profile_name ?? undefined,
    category: json.category ?? undefined,
    description: json.description ?? undefined,
    proofPath: json.proof_path ?? undefined,
    recordedByName: json.recorded_by_name ?? undefined,
    createdAt: json.created_at,
    voided: json.voided,
    voidReason: json.void_reason ?? undefined,
    periods: json.periods ?? [],
  }
}

/** Balance, totals, dues settings and what this person may do. */
export async function fetchMoneySummary(): Promise<MoneySummary> {
  return toSummary(await rpc<SummaryJson>('get_support_group_money_summary'))
}

export const moneySummaryQuery = queryOptions({ queryKey: moneyKeys.summary(), queryFn: fetchMoneySummary })

/** Leader or treasurer: turn dues on/off and set the amount and how often. */
export async function saveDuesSettings(input: DuesSettingsInput): Promise<MoneySummary> {
  const args = input.enabled
    ? { p_enabled: true, p_amount: input.amount, p_period: input.period, p_start_on: input.startOn }
    : { p_enabled: false }
  return toSummary(await rpc<SummaryJson>('set_support_group_dues', args))
}

/** Rows per "Load more". */
export const ENTRY_PAGE_SIZE = 30

/** Any power: every entry, newest first; voided ones stay, marked. */
export async function listEntriesPage(kind: EntryKind | undefined, offset: number): Promise<EntryPage> {
  const page = await rpc<{ total: Num; rows: EntryJson[] }>('get_support_group_money_entries', {
    p_kind: kind ?? null,
    p_limit: ENTRY_PAGE_SIZE,
    p_offset: offset,
  })
  return { total: num(page.total), rows: page.rows.map(toEntry) }
}

/** Money power: mark a wrong entry as void. Nothing is deleted. */
export async function voidEntry(entryId: string, reason: string): Promise<void> {
  await rpc('void_support_group_money_entry', { p_entry_id: entryId, p_reason: reason })
}

export const proofUrlQuery = (path: string) =>
  queryOptions({ queryKey: moneyKeys.proof(path), queryFn: () => proofUrl(path), staleTime: 4 * 60_000 })
