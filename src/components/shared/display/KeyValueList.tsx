import type { ReactNode } from 'react'

export interface KeyValue {
  label: string
  value: ReactNode
}

/** Label ……… value rows, like a printed form. */
export function KeyValueList({ items }: { items: KeyValue[] }) {
  return (
    <dl className="kv">
      {items.map((item) => (
        <div key={item.label}>
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}
