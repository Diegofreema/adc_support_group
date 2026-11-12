import { Banner } from '@/components/shared'
import type { AddedMember } from '../types'
import { WelcomeShareList } from './WelcomeShareList'

const HOW: Record<'email' | 'sms', string> = {
  email: 'Welcome sent by email.',
  sms: 'Welcome sent by SMS.',
}

/** After adding one person: how they'll hear about it. */
export function AddedMemberNote({ added }: { added: AddedMember }) {
  if (added.welcome === 'share') {
    return <div className="mt-5"><WelcomeShareList people={added.share} /></div>
  }
  const how = added.welcome ? HOW[added.welcome] : 'They already had an account, so we told them in the app.'
  return <Banner tone="success" className="mt-5" title={`${added.fullName} added`}>{how}</Banner>
}
