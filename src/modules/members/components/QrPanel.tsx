import { Download } from 'lucide-react'
import { useRef } from 'react'

import { Button, Card, QrCode } from '@/components/shared'
import { joinLink } from '@/lib/share'
import { notify } from '@/lib/toast'
import { downloadSvgAsPng, qrFileName } from '../utils/qr-png'

/** Big QR for people to scan at meetings; Download saves it as a PNG. */
export function QrPanel({ joinCode, inviteName }: { joinCode: string; inviteName: string }) {
  const qrRef = useRef<HTMLDivElement>(null)
  const download = () => {
    const svg = qrRef.current?.querySelector('svg')
    if (!svg) return notify('The QR code is not ready yet', 'error')
    downloadSvgAsPng(svg, qrFileName(inviteName)).catch((error: Error) => notify(error.message, 'error'))
  }
  return (
    <Card className="center">
      <div ref={qrRef} className="mx-auto w-fit"><QrCode value={joinLink(joinCode)} /></div>
      <p className="small muted mt-3">Scan to join</p>
      <Button variant="primary" block icon={Download} className="mt-4" onClick={download}>Download</Button>
    </Card>
  )
}
