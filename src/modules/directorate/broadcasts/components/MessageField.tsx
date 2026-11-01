import { Field, TextArea } from '@/components/shared'
import type { BroadcastComposer } from '../hooks/use-broadcast-composer'

export function MessageField({ composer }: { composer: BroadcastComposer }) {
  const { draft, update, pages } = composer
  return (
    <Field label="Message" htmlFor="b-text" className="mt-4">
      <TextArea id="b-text" placeholder="Type your message" value={draft.text} onChange={(event) => update('text')(event.target.value)} />
      <div className="row-between tiny faint mt-1 mono">
        <span>{draft.text.length} / 160</span>
        <span>{Math.max(pages, 1)} SMS page{pages > 1 ? 's' : ''}</span>
      </div>
    </Field>
  )
}
