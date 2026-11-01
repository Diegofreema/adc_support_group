import { RefreshCw } from 'lucide-react'

import { Button } from '../actions/Button'
import { ShareLinkButtons } from '../actions/ShareLinkButtons'
import { Card, CardHead } from './Card'
import { QrCode } from './QrCode'
import { useJoinLink } from '@/hooks/use-join-link'

interface JoinLinkCardProps {
  joinCode: string
  /** Name used in the WhatsApp invite text. */
  inviteName: string
  title?: string
  /** Shows "New link" when given (leaders only). */
  onNewLink?: () => void
}

/** QR + link + WhatsApp/Copy. Used for groups and chapters. */
export function JoinLinkCard({ joinCode, inviteName, title = 'Join link', onNewLink }: JoinLinkCardProps) {
  const { link, copy, whatsappUrl } = useJoinLink(joinCode, inviteName)
  const newLinkButton = onNewLink && <Button variant="ghost" size="sm" icon={RefreshCw} onClick={onNewLink}>New link</Button>
  return (
    <Card>
      <CardHead title={title} action={newLinkButton} />
      <div className="row items-center gap-4">
        <QrCode value={link} small />
        <div className="grow">
          <p className="small muted truncate">{link}</p>
          <ShareLinkButtons whatsappUrl={whatsappUrl} onCopy={copy} className="grid mt-3" />
        </div>
      </div>
    </Card>
  )
}
