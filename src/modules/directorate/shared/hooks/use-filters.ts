import { useState } from 'react'

/** Generic filter state: one setter per key. */
export function useFilters<T extends Record<string, string>>(initial: T) {
  const [filters, setFilters] = useState<T>(initial)
  const setFilter = <K extends keyof T>(key: K) => (value: T[K]) => setFilters((current) => ({ ...current, [key]: value }))
  return { filters, setFilter }
}
