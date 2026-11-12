/** How often dues fall due. Periods are calendar-aligned (1 Nov, 1 Oct, 1 Jan). */
export type DuesPeriod = 'month' | 'quarter' | 'year'

export type EntryKind = 'dues' | 'income' | 'expense'

/** The Records tab: one kind, or everything. */
export type EntryTab = 'all' | EntryKind

export type ExpenseCategory = 'transport' | 'printing' | 'food' | 'venue' | 'airtime' | 'other'

export type DuesFilter = 'unpaid' | 'paid' | 'all'

export interface PaidPeriod {
  start: string
  label: string
}

export interface DuesInfo {
  enabled: boolean
  amount?: number
  period?: DuesPeriod
  startOn?: string
  /** First day of the period we're in (YYYY-MM-DD). */
  currentPeriod?: string
  currentLabel?: string
  iPaidCurrent: boolean
  myPaid: PaidPeriod[]
}

export interface MoneySummary {
  moneyIn: number
  moneyOut: number
  balance: number
  monthIn: number
  monthOut: number
  givenToCampaign: number
  dues: DuesInfo
  canManage: boolean
  canSetDues: boolean
  canSeeEntries: boolean
}

export interface MoneyEntry {
  id: string
  kind: EntryKind
  amount: number
  occurredOn: string
  profileName?: string
  category?: ExpenseCategory
  description?: string
  proofPath?: string
  recordedByName?: string
  createdAt: string
  voided: boolean
  voidReason?: string
  /** Dues only: "Nov 2026", "Dec 2026". */
  periods: string[]
}

export interface EntryPage {
  total: number
  rows: MoneyEntry[]
}

export interface DuesStatusRow {
  profileId: string
  name: string
  phone?: string
  paid: boolean
}

export interface DuesStatusPage {
  period: string
  label: string
  paidCount: number
  memberCount: number
  total: number
  rows: DuesStatusRow[]
}

export interface MemberOption {
  id: string
  name: string
  phone?: string
}

export interface DuesSettingsInput {
  enabled: boolean
  amount: number
  period: DuesPeriod
  startOn: string
}

export interface RecordDuesInput {
  groupId: string
  profileId: string
  fromPeriod: string
  periods: number
  paidOn: string
  proof: File
  note?: string
}

export interface RecordIncomeInput {
  groupId: string
  amount: number
  occurredOn: string
  description: string
  profileId?: string
  proof?: File
}

export interface RecordExpenseInput {
  groupId: string
  amount: number
  occurredOn: string
  category: ExpenseCategory
  description: string
  receipt: File
}
