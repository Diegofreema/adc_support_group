import { useState } from 'react'

import { ComboBox, type ComboOption } from '@/components/shared'
import { usePayerSearch } from '../hooks/use-payments'
import type { PayerOption } from '../types'
import { PAYER_UNCHOSEN } from '../utils/offline-schema'

interface PayerPickerProps {
  id?: string
  /** '' means the person recording it paid. */
  value: string
  onChange: (payerId: string) => void
  myName: string
  invalid?: boolean
}

const ME = ''
const detailOf = (payer: PayerOption) => [payer.phone, payer.email].filter(Boolean).join(' · ') || undefined

/**
 * "Who paid": search the group by name, email or phone instead of scrolling
 * a list of every member. "You" is the default and always one tap away.
 */
export function PayerPicker({ id, value, onChange, myName, invalid }: PayerPickerProps) {
  const me: ComboOption = { id: ME, label: `${myName} (you)` }
  const [query, setQuery] = useState('')
  const [picked, setPicked] = useState<ComboOption | null>(value === ME ? me : null)
  const search = usePayerSearch(query, picked === null)

  const typed = query.trim().toLowerCase()
  const matches = (search.data?.payers ?? []).map((payer) => ({ id: payer.id, label: payer.name, detail: detailOf(payer) }))
  const showMe = !typed || myName.toLowerCase().includes(typed)
  const options = showMe ? [me, ...matches] : matches
  const total = search.data?.total ?? 0
  const footer = total > matches.length
    ? `Showing ${matches.length} of ${total.toLocaleString('en-NG')} members. Type a name, email or phone to find someone.`
    : undefined

  return (
    <ComboBox
      id={id}
      selected={picked}
      onSelect={(option) => { setPicked(option); onChange(option ? option.id : PAYER_UNCHOSEN) }}
      query={query}
      onQueryChange={setQuery}
      options={options}
      loading={search.isFetching && Boolean(typed)}
      placeholder="Name, email or phone"
      emptyText={(q) => `No member matches "${q}". Check the spelling, or try their phone number.`}
      footer={footer}
      invalid={invalid}
    />
  )
}
