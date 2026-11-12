import { Mail, Phone, type LucideIcon } from 'lucide-react'

import { Avatar, Card, CardHead } from '@/components/shared'
import type { ReviewGroup } from '../types'

/** One tap-to-call / tap-to-email row, a full 44px+ target. */
function ContactLink({ href, icon: Icon, children }: { href: string; icon: LucideIcon; children: string }) {
  return (
    <a href={href} className="flex min-h-11 min-w-0 items-center gap-2 font-semibold text-primary">
      <Icon className="i i-sm shrink-0" aria-hidden />
      <span className="min-w-0 [overflow-wrap:anywhere]">{children}</span>
    </a>
  )
}

function LeaderContact({ group }: { group: ReviewGroup }) {
  if (!group.leaderPhone && !group.leaderEmail) return <p className="small faint mt-1">No phone or email on file</p>
  return (
    <div className="mt-1">
      {group.leaderPhone && <ContactLink href={`tel:${group.leaderPhone}`} icon={Phone}>{group.leaderPhone}</ContactLink>}
      {group.leaderEmail && <ContactLink href={`mailto:${group.leaderEmail}`} icon={Mail}>{group.leaderEmail}</ContactLink>}
    </div>
  )
}

export function LeaderCard({ group }: { group: ReviewGroup }) {
  return (
    <Card className="mt-4">
      <CardHead title="Leader" />
      <div className="row !items-start">
        <Avatar name={group.leaderName} size="lg" />
        <div className="grow min-w-0">
          <div className="bold">{group.leaderName}</div>
          <LeaderContact group={group} />
          {group.leaderPhoneChecked && <span className="chip chip-verified mt-1"><Phone className="i" aria-hidden />Phone checked</span>}
        </div>
      </div>
    </Card>
  )
}
