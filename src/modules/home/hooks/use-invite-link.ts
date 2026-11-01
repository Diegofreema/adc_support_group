import { useCopy } from '@/hooks/use-copy'
import { joinLink, whatsappShareUrl } from '@/lib/share'

/** Join link for a group code, plus copy and WhatsApp share actions. */
export function useInviteLink(code: string, groupName: string) {
  const copy = useCopy()
  const link = joinLink(code)
  return {
    link,
    copyLink: () => copy(`https://${link}`, 'Link copied'),
    whatsappUrl: whatsappShareUrl(`Join ${groupName}: https://${link}`),
  }
}
