import { RefreshCw } from 'lucide-react'

import { Button, Card, CardHead, QrCode } from '@/components/shared'
import { useJoinLinkActions } from '../hooks/use-join-link-actions'
import { ShareLinkButtons } from './ShareLinkButtons'

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
  const { link, copy, whatsappUrl } = useJoinLinkActions(joinCode, inviteName)
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
