import { ArrowRight, Link as LinkIcon } from 'lucide-react'

import { Button, Card, IconTile } from '@/components/shared'
import { JoinCodeForm } from '../login/JoinCodeForm'

/** The usual way in: a leader sent you a link. Paste it right here. */
export function JoinGroupCard() {
  return (
    <Card>
      <div className="flex items-start gap-3.5">
        <IconTile icon={LinkIcon} />
        <div>
          <h2 className="h3">Join a group</h2>
          <p className="small muted mt-0.5">Got an invite link from a leader? Paste it below.</p>
        </div>
      </div>
      <div className="mt-4">
        <JoinCodeForm
          id="get-started-invite"
          actions={<Button type="submit" variant="primary" block iconEnd={ArrowRight} className="mt-4">Continue</Button>}
        />
      </div>
    </Card>
  )
}
