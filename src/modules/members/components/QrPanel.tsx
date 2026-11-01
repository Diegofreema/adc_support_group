import { Download } from 'lucide-react'

import { Button, Card, QrCode } from '@/components/shared'
import { joinLink } from '@/lib/share'
import { notify } from '@/lib/toast'

/** Big QR for people to scan at meetings. */
export function QrPanel({ joinCode }: { joinCode: string }) {
  return (
    <Card className="center">
      <div className="mx-auto w-fit"><QrCode value={joinLink(joinCode)} /></div>
      <p className="small muted mt-3">Scan to join</p>
      <Button variant="primary" block icon={Download} className="mt-4" onClick={() => notify('QR saved')}>Download</Button>
    </Card>
  )
}
