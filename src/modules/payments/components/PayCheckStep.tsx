import { Lock } from 'lucide-react'

import { Card, KeyValueList, type KeyValue } from '@/components/shared'
import { formatNaira } from '@/lib/format'

/** The last look before leaving for Funz: the amount big, the details below. */
export function PayCheckStep({ amount, summary }: { amount: number; summary: KeyValue[] }) {
  return (
    <>
      <h1 className="h1">Check and pay</h1>
      <Card className="mt-5">
        <p className="eyebrow">You are paying</p>
        <p className="display num mt-1 text-[2.5rem]">{formatNaira(amount)}</p>
        <hr className="divider" />
        <KeyValueList items={summary.filter((row) => row.label !== 'Amount')} />
      </Card>
      <p className="small muted mt-4 flex items-center gap-2"><Lock className="i i-sm" aria-hidden />Next, you pay safely on Funz. Your card details never come to us.</p>
    </>
  )
}
