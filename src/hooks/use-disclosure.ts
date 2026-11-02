import { useState } from 'react'

export interface Disclosure {
  isOpen: boolean
  open: () => void
  close: () => void
  setOpen: (open: boolean) => void
}

/** Open/close state for dialogs and collapsible areas. */
export function useDisclosure(initial = false): Disclosure {
  const [isOpen, setOpen] = useState(initial)
  return { isOpen, open: () => setOpen(true), close: () => setOpen(false), setOpen }
}
