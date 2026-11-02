import type { ChoiceOption } from '@/components/shared'
import { formatNaira, formatNumber } from '@/lib/format'
import type { SmsPack } from '../types'
import { smsForPoints } from '@/lib/sms'

export const SMS_PACKS: SmsPack[] = [
  { id: 'pack_5k', points: 5_000, price: 5_000 },
  { id: 'pack_25k', points: 25_000, price: 25_000 },
  { id: 'pack_100k', points: 100_000, price: 100_000 },
]

export function packOption(pack: SmsPack): ChoiceOption<string> {
  return {
    value: pack.id,
    title: <span className="num">{formatNumber(pack.points)} points</span>,
    description: `About ${formatNumber(smsForPoints(pack.points))} SMS`,
    trailing: <span className="bold num">{formatNaira(pack.price)}</span>,
  }
}

/** Smallest pack that covers a shortfall (or the biggest pack). */
export function suggestedPack(shortBy: number): SmsPack {
  return SMS_PACKS.find((pack) => pack.points >= shortBy) ?? SMS_PACKS[SMS_PACKS.length - 1]!
}
