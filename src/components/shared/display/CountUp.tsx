import { useEffect, useRef, useState } from 'react'

const DURATION_MS = 700

const reducedMotion = () => typeof window !== 'undefined' && Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)

/**
 * A big number that rolls up to its value (ease-out) when it appears or
 * changes. Screen readers and reduced-motion users get the final value only.
 */
export function CountUp({ value, format }: { value: number; format: (n: number) => string }) {
  const [shown, setShown] = useState(0)
  const from = useRef(0)

  useEffect(() => {
    if (reducedMotion()) return
    const start = performance.now()
    const origin = from.current
    let frame = requestAnimationFrame(function step(now) {
      const t = Math.min((now - start) / DURATION_MS, 1)
      setShown(Math.round(origin + (value - origin) * (1 - (1 - t) ** 3)))
      if (t < 1) frame = requestAnimationFrame(step)
    })
    from.current = value
    return () => cancelAnimationFrame(frame)
  }, [value])

  return (
    <>
      <span aria-hidden>{format(reducedMotion() ? value : shown)}</span>
      <span className="sr-only">{format(value)}</span>
    </>
  )
}
