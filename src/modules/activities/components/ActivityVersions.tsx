import { ChevronDown } from 'lucide-react'

import { Card, StatusChip } from '@/components/shared'
import { versionFacts, versionMeta } from '../utils/activity-versions'
import type { ActivityVersion } from '../types'

/** "Earlier versions": closed until tapped, newest first. */
export function ActivityVersions({ versions }: { versions: ActivityVersion[] }) {
  if (versions.length === 0) return null
  return (
    <Card>
      <details>
        <summary className="row-between cursor-pointer list-none font-semibold">
          Earlier versions ({versions.length})
          <ChevronDown className="i" aria-hidden />
        </summary>
        <div className="stack [--stack:16px] mt-4">
          {versions.map((version) => <VersionRow key={version.version} version={version} />)}
        </div>
      </details>
    </Card>
  )
}

function VersionRow({ version }: { version: ActivityVersion }) {
  return (
    <div className="border-t border-line pt-3">
      <div className="row-between gap-2">
        <span className="bold">Version {version.version}</span>
        <StatusChip status={version.status} label={version.status === 'rejected' ? 'Sent back' : undefined} />
      </div>
      <p className="small muted mt-1">{versionMeta(version)}</p>
      {version.rejectionReason && <p className="small mt-1">Reason: {version.rejectionReason}</p>}
      <p className="mt-2">{version.title}</p>
      <p className="small muted mt-1">{versionFacts(version)}</p>
      {version.note && <p className="small mt-1">{version.note}</p>}
    </div>
  )
}
