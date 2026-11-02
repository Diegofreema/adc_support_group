import { ChoiceList, Progress, type ChoiceOption } from '@/components/shared'
import { formatDay, formatNairaShort } from '@/lib/format'
import type { Cause } from '@/types/domain'

interface CauseChoicesProps {
  causes: Cause[]
  value: string | undefined
  onChange: (causeId: string) => void
}

function toOption(cause: Cause): ChoiceOption<string> {
  return {
    value: cause.id,
    title: cause.title,
    children: <CauseProgress cause={cause} />,
  }
}

export function CauseChoices({ causes, value, onChange }: CauseChoicesProps) {
  return <ChoiceList name="cause" label="Cause" options={causes.map(toOption)} value={value} onChange={onChange} />
}

function CauseProgress({ cause }: { cause: Cause }) {
  return (
    <>
      <span className="mt-3 block"><Progress value={cause.raised} max={cause.target} small label={cause.title} /></span>
      <span className="row-between choice-desc mt-2">
        <span>{formatNairaShort(cause.raised)} of {formatNairaShort(cause.target)}</span>
        <span>{formatDay(cause.deadline)}</span>
      </span>
    </>
  )
}
