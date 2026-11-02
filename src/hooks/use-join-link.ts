import { useCopy } from '@/hooks/use-copy'
import { joinLink, whatsappShareUrl } from '@/lib/share'

export interface JoinLinkActions {
  link: string
  copy: () => void
  whatsappUrl: string
}

/** Link text, copy action and WhatsApp share URL for a group or chapter join code. */
export function useJoinLink(joinCode: string, inviteName: string): JoinLinkActions {
  const copyText = useCopy()
  const link = joinLink(joinCode)
  return {
    link,
    copy: () => void copyText(`https://${link}`, 'Link copied'),
    whatsappUrl: whatsappShareUrl(`Join ${inviteName}: https://${link}`),
  }
}
