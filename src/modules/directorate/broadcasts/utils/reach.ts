import { formatNumber } from '@/lib/format'
import type { Channel, RecipientCount } from '../types'

/** "312 have no email" for the chosen channel, or '' when everyone has it. */
export function missingContact(count: RecipientCount, channel: Channel): string {
  const missing = count.total - (channel === 'sms' ? count.withPhone : count.withEmail)
  if (missing <= 0) return ''
  return `${formatNumber(missing)} ${missing === 1 ? 'has' : 'have'} no ${channel === 'sms' ? 'phone' : 'email'}`
}

/** "Send to 1,240 members by app and SMS?" */
export function confirmTitle(count: RecipientCount | undefined, who: 'leaders' | 'members', channel: Channel): string {
  const by = channel === 'sms' ? 'app and SMS' : 'app and email'
  if (!count) return `Send to these ${who} by ${by}?`
  const noun = count.total === 1 ? who.slice(0, -1) : who
  return `Send to ${formatNumber(count.total)} ${noun} by ${by}?`
}
