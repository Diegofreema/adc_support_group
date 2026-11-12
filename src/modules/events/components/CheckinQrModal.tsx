import { Printer } from 'lucide-react'
import { useRef } from 'react'

import { Button, Modal, QrCode } from '@/components/shared'
import { checkinUrl, printQr } from '../utils/checkin'
import { eventWhenLabel } from '../utils/event-time'
import type { GroupEvent } from '../types'

interface CheckinQrModalProps {
  event: GroupEvent
  code: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

/** The venue QR members scan to check themselves in. Show it on a phone or print it. */
export function CheckinQrModal({ event, code, open, onOpenChange }: CheckinQrModalProps) {
  const holder = useRef<HTMLDivElement>(null)
  const print = () => {
    const svg = holder.current?.querySelector('svg')
    if (svg) printQr(svg.outerHTML, event.title, eventWhenLabel(event.startsAt, event.endsAt))
  }
  const actions = (
    <>
      <Button onClick={() => onOpenChange(false)}>Close</Button>
      <Button icon={Printer} onClick={print}>Print</Button>
    </>
  )
  return (
    <Modal open={open} onOpenChange={onOpenChange} title="Check-in QR" description="Members scan this at the venue." actions={actions} centered>
      <div ref={holder} className="flex justify-center [&_.qr]:h-64 [&_.qr]:w-64">
        <QrCode value={checkinUrl(code)} />
      </div>
    </Modal>
  )
}
