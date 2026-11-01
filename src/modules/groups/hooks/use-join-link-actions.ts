import { useCopy } from '@/hooks/use-copy'
import { joinLink, whatsappShareUrl } from '@/lib/share'

export interface JoinLinkActions {
  link: string
  copy: () => void
  whatsappUrl: string
}

/** Link text, copy action and WhatsApp share URL for a join code. */
export function useJoinLinkActions(joinCode: string, inviteName: string): JoinLinkActions {
  const copyText = useCopy()
  const link = joinLink(joinCode)
  return {
    link,
    copy: () => void copyText(`https://${link}`),
    whatsappUrl: whatsappShareUrl(`Join ${inviteName}: https://${link}`),
  }
}
