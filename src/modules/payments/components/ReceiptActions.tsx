import { Download, Share2 } from 'lucide-react'

import { Button } from '@/components/shared'

interface ReceiptActionsProps {
  onShare: () => void
  onDownload: () => void
}

export function ReceiptActions({ onShare, onDownload }: ReceiptActionsProps) {
  return (
    <div className="row mt-5">
      <Button icon={Share2} className="grow" onClick={onShare}>Share</Button>
      <Button variant="primary" icon={Download} className="grow" onClick={onDownload}>Download</Button>
    </div>
  )
}
