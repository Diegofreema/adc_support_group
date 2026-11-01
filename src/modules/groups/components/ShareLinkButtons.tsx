import { Copy, MessageCircle } from 'lucide-react'

import { Button, buttonClassName } from '@/components/shared'

interface ShareLinkButtonsProps {
  whatsappUrl: string
  onCopy: () => void
  className?: string
}

/** WhatsApp (primary) + Copy for any join link. */
export function ShareLinkButtons({ whatsappUrl, onCopy, className = 'grid' }: ShareLinkButtonsProps) {
  return (
    <div className={className}>
      <a className={buttonClassName('primary', 'md', true)} href={whatsappUrl} target="_blank" rel="noreferrer">
        <MessageCircle className="i" aria-hidden />WhatsApp
      </a>
      <Button block icon={Copy} onClick={onCopy}>Copy</Button>
    </div>
  )
}
