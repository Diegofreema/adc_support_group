import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

import type { AddMethod } from '../utils/add-methods'

/** Selected way to add members; "Excel" goes to the upload screen. */
export function useAddMethod() {
  const [method, setMethod] = useState<AddMethod>('link')
  const navigate = useNavigate()
  const choose = (next: AddMethod) => {
    if (next === 'excel') void navigate({ to: '/members/import' })
    else setMethod(next)
  }
  return { method, choose }
}
