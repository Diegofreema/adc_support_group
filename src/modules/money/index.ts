/** Public API of the money module (for nav and other screens). */
export { moneySummaryQuery } from './services/money.service'
export { moneyKeys } from './utils/money-keys'
export type { MoneySummary } from './types'

/** Where the group's money lives. */
export const MONEY_PATH = '/money'
