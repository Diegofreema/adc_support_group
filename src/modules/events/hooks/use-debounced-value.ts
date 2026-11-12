import { useEffect, useState } from 'react'

/** `value`, once it has stopped changing for `delay` ms (search boxes: one request per pause, not per letter). */
export function useDebouncedValue<T>(value: T, delay = 350): T {
  const [settled, setSettled] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setSettled(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return settled
}
