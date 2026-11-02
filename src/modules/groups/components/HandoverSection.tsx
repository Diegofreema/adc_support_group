import { UserRoundCog } from 'lucide-react'

import { Button } from '@/components/shared'
import { useDisclosure } from '@/hooks/use-disclosure'
import { HandoverDialog } from './HandoverDialog'

interface HandoverSectionProps {
  onRequest: (newLeader: string) => void
  pending?: boolean
}

/** Danger zone: ask the Directorate to change the leader. */
export function HandoverSection({ onRequest, pending }: HandoverSectionProps) {
  const dialog = useDisclosure()
  const submit = (newLeader: string) => {
    onRequest(newLeader)
    dialog.close()
  }
  return (
    <div className="danger-zone mt-8">
      <div className="row-between wrap">
        <div>
          <h2 className="h3">Hand over</h2>
          <p className="small muted mt-1">Needs Directorate approval.</p>
        </div>
        <Button variant="danger" icon={UserRoundCog} onClick={dialog.open}>Hand over</Button>
      </div>
      <HandoverDialog open={dialog.isOpen} onOpenChange={dialog.setOpen} onSubmit={submit} pending={pending} />
    </div>
  )
}
