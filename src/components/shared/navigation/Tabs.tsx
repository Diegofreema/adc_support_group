import { useEffect, useRef, useState } from 'react'

export interface TabItem<T extends string> {
  value: T
  label: string
  count?: number
}

interface TabsProps<T extends string> {
  tabs: TabItem<T>[]
  value: T
  onChange: (value: T) => void
  label?: string
}

type Overflow = 'none' | 'start' | 'end' | 'both'

function overflowOf(el: HTMLElement): Overflow {
  const start = el.scrollLeft > 4
  const end = el.scrollLeft + el.clientWidth < el.scrollWidth - 4
  if (start && end) return 'both'
  if (start) return 'start'
  return end ? 'end' : 'none'
}

/** Which edges have hidden tabs, kept up to date on scroll and resize. */
function useOverflow() {
  const ref = useRef<HTMLDivElement>(null)
  const [overflow, setOverflow] = useState<Overflow>('none')
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const update = () => setOverflow(overflowOf(el))
    update()
    el.addEventListener('scroll', update, { passive: true })
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => { el.removeEventListener('scroll', update); observer.disconnect() }
  }, [])
  return { ref, overflow }
}

/** Underlined tab bar. Scrolls sideways on small phones, with faded edges and the chosen tab kept in view. */
export function Tabs<T extends string>({ tabs, value, onChange, label }: TabsProps<T>) {
  const { ref, overflow } = useOverflow()
  useEffect(() => {
    ref.current?.querySelector<HTMLElement>('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
  }, [ref, value])
  return (
    <div ref={ref} className="tabs" role="tablist" aria-label={label} data-overflow={overflow}>
      {tabs.map((tab) => (
        <button key={tab.value} type="button" role="tab" className="tab" aria-selected={value === tab.value} onClick={() => onChange(tab.value)}>
          {tab.label}
          {tab.count !== undefined && <span className="count">{tab.count}</span>}
        </button>
      ))}
    </div>
  )
}
