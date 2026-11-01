import { Button, ChoiceList, Modal } from '@/components/shared'
import { SMS_PACKS, packOption } from '../utils/sms-packs'

interface BuyPointsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  packId: string
  onPackChange: (packId: string) => void
  onConfirm: () => void
  busy?: boolean
}

export function BuyPointsDialog({ open, onOpenChange, packId, onPackChange, onConfirm, busy }: BuyPointsDialogProps) {
  const actions = (
    <>
      <Button onClick={() => onOpenChange(false)}>Cancel</Button>
      <Button variant="primary" onClick={onConfirm} disabled={busy}>{busy ? 'Please wait…' : 'Pay with Funz'}</Button>
    </>
  )
  return (
    <Modal open={open} onOpenChange={onOpenChange} title="Buy SMS points" actions={actions}>
      <ChoiceList name="sms-pack" label="Pack" options={SMS_PACKS.map(packOption)} value={packId} onChange={onPackChange} />
    </Modal>
  )
}
