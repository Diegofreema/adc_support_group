import { HandCoins, Send, Share2, UserPlus } from 'lucide-react'

import { QuickActions, type QuickAction } from '@/components/shared'

/** Add · Invite · Pay · Message */
export function LeaderQuickActions({ onInvite }: { onInvite: () => void }) {
  const actions: QuickAction[] = [
    { label: 'Add', icon: UserPlus, to: '/members/add' },
    { label: 'Invite', icon: Share2, onClick: onInvite },
    { label: 'Pay', icon: HandCoins, to: '/payments/new' },
    { label: 'Message', icon: Send, to: '/messages' },
  ]
  return <div className="mt-6"><QuickActions actions={actions} /></div>
}
