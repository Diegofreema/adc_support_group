import { Check, Clock } from 'lucide-react'

export type TimelineState = 'done' | 'now' | 'todo'

export interface TimelineStep {
  title: string
  meta?: string
  state: TimelineState
}

export function Timeline({ steps }: { steps: TimelineStep[] }) {
  return (
    <ol className="timeline">
      {steps.map((step) => (
        <TimelineItem key={step.title} step={step} />
      ))}
    </ol>
  )
}

function TimelineItem({ step }: { step: TimelineStep }) {
  return (
    <li className={`tl-item ${step.state}`}>
      <span className="tl-dot" aria-hidden>
        {step.state === 'done' && <Check className="i" />}
        {step.state === 'now' && <Clock className="i" />}
      </span>
      <div>
        <div className="tl-title">{step.title}</div>
        {step.meta && <div className="tl-meta">{step.meta}</div>}
      </div>
    </li>
  )
}
