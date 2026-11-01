import { useState } from 'react'

import { Button, ChoiceList, Modal, type ChoiceOption } from '@/components/shared'
import { formatNaira, formatNumber } from '@/lib/format'
import { useBuyPoints, usePointPacks } from '../hooks/use-broadcast-data'
import { smsForPoints } from '../utils/sms-cost'
import type { PointPack } from '../types'

function packOption(pack: PointPack): ChoiceOption<string> {
  return {
    value: pack.id,
    title: `${formatNumber(pack.points)} points`,
    description: `About ${formatNumber(smsForPoints(pack.points))} SMS`,
    trailing: <span className="bold num">{formatNaira(pack.naira)}</span>,
  }
}

/** Pick a pack and pay with Funz. */
export function BuyPointsModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const packs = usePointPacks()
  const [packId, setPackId] = useState('p100k')
  const buy = useBuyPoints()
  const pay = () => buy.mutate(packId, { onSuccess: () => onOpenChange(false) })
  return (
    <Modal open={open} onOpenChange={onOpenChange} title="Buy SMS points" actions={<><Button onClick={() => onOpenChange(false)}>Cancel</Button><Button variant="primary" disabled={buy.isPending} onClick={pay}>Pay with Funz</Button></>}>
      <ChoiceList name="pack" label="Pack" options={packs.map(packOption)} value={packId} onChange={setPackId} />
    </Modal>
  )
}
