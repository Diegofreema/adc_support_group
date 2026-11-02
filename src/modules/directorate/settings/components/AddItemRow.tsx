import { Plus } from 'lucide-react'
import { useState, type FormEvent } from 'react'

import { Button, TextInput } from '@/components/shared'
import { cleanName } from '../utils/staff-form'

/** Input + Add, for growing a simple list. */
export function AddItemRow({ placeholder, onAdd }: { placeholder: string; onAdd: (name: string) => void }) {
  const [value, setValue] = useState('')
  const submit = (event: FormEvent) => {
    event.preventDefault()
    const name = cleanName(value)
    if (!name) return
    onAdd(name)
    setValue('')
  }
  return (
    <form className="row mt-4" onSubmit={submit}>
      <TextInput className="grow" placeholder={placeholder} aria-label={placeholder} value={value} onChange={(event) => setValue(event.target.value)} />
      <Button type="submit" variant="primary" icon={Plus}>Add</Button>
    </form>
  )
}
