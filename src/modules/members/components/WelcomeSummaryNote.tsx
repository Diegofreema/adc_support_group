import { Mail, MessageSquare } from 'lucide-react'

import { formatNumber } from '@/lib/format'
import type { WelcomeSummary } from '../types'
import { WelcomeShareList } from './WelcomeShareList'

function people(count: number): string {
  return `${formatNumber(count)} ${count === 1 ? 'person' : 'people'}`
}

/** How each new person will be told: by email, by SMS, or via the leader. */
export function WelcomeSummaryNote({ summary }: { summary: WelcomeSummary }) {
  return (
    <div className="stack [--stack:12px]">
      {summary.email > 0 && <p className="small row gap-2"><Mail className="i" aria-hidden />Welcome sent by email to {people(summary.email)}</p>}
      {summary.sms > 0 && <p className="small row gap-2"><MessageSquare className="i" aria-hidden />Welcome sent by SMS to {people(summary.sms)}</p>}
      <WelcomeShareList people={summary.share} />
    </div>
  )
}
