import { Mail, MessageSquare } from 'lucide-react'

import { SectionTitle } from '@/components/shared'
import type { Profile } from '../types/profile.types'

/** How important updates reach this person: email when they have one, else SMS. */
export function DeliveryNote({ profile }: { profile: Profile }) {
  const byEmail = !!profile.email
  const Icon = byEmail ? Mail : MessageSquare
  return (
    <>
      <SectionTitle title="How we reach you" />
      <p className="small row gap-2">
        <Icon className="i faint" aria-hidden />
        {byEmail ? `We email you at ${profile.email} for important updates.` : `We text you at ${profile.phone} for important updates.`}
      </p>
      <p className="faint small mt-1">Everything else stays in the app.</p>
    </>
  )
}
