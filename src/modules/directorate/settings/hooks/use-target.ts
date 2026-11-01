import { useState } from 'react'

/** Remember which item a dialog is acting on (null = closed). */
export function useTarget<T>() {
  const [target, setTarget] = useState<T | null>(null)
  return { target, isOpen: target !== null, open: setTarget, close: () => setTarget(null), setOpen: (open: boolean) => !open && setTarget(null) }
}
