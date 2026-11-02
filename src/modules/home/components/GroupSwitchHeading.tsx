import { ChevronDown } from 'lucide-react'

/** Group name that opens the "switch group" dialog. */
export function GroupSwitchHeading({ name, onClick }: { name: string; onClick: () => void }) {
  return (
    <button type="button" className="row mt-0.5 !gap-2 text-left" onClick={onClick} aria-label={`Switch group. Current: ${name}`}>
      <span className="h3">{name}</span>
      <ChevronDown className="i hero-muted" aria-hidden />
    </button>
  )
}
