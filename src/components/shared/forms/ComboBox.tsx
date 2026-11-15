import { Search, X } from 'lucide-react'
import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'

import { Avatar } from '../display/Avatar'
import { cn } from '@/lib/utils'

export interface ComboOption {
  id: string
  label: string
  /** Second line: phone, email, role… */
  detail?: string
}

interface ComboBoxProps {
  id?: string
  /** The chosen option; null shows the search box. */
  selected: ComboOption | null
  onSelect: (option: ComboOption | null) => void
  query: string
  onQueryChange: (query: string) => void
  /** Matches for the query (the caller searches, usually on the server). */
  options: ComboOption[]
  loading?: boolean
  placeholder?: string
  /** Shown when a typed search finds nothing. */
  emptyText?: (query: string) => string
  /** A line under the list, e.g. "Showing 8 of 1,240. Type to narrow it down." */
  footer?: string
  invalid?: boolean
}

/**
 * Search-and-pick for long lists (WAI-ARIA combobox). Type to filter, arrows
 * to move, Enter to pick, Esc to close. Once picked, the choice shows as a
 * card with a big "Change" button instead of a text box.
 */
export function ComboBox({
  id, selected, onSelect, query, onQueryChange, options, loading, placeholder = 'Search',
  emptyText = (q) => `Nothing matches "${q}"`, footer, invalid,
}: ComboBoxProps) {
  const listId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const [refocus, setRefocus] = useState(false)

  // Close when focus or a tap lands outside.
  useEffect(() => {
    if (!open) return
    const away = (event: PointerEvent) => { if (!rootRef.current?.contains(event.target as Node)) setOpen(false) }
    document.addEventListener('pointerdown', away)
    return () => document.removeEventListener('pointerdown', away)
  }, [open])

  // After "Change", put the cursor straight in the search box.
  useEffect(() => {
    if (refocus && !selected) { inputRef.current?.focus(); setRefocus(false) }
  }, [refocus, selected])

  const pick = (option: ComboOption) => { onSelect(option); setOpen(false); onQueryChange('') }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') { event.preventDefault(); setOpen(true); setActive((i) => Math.min(i + 1, options.length - 1)) }
    else if (event.key === 'ArrowUp') { event.preventDefault(); setActive((i) => Math.max(i - 1, 0)) }
    else if (event.key === 'Enter' && open && options[active]) { event.preventDefault(); pick(options[active]) }
    else if (event.key === 'Escape' && open) { event.preventDefault(); setOpen(false) }
  }

  if (selected) {
    return (
      <div className={cn('combo-picked', invalid && 'is-invalid')}>
        <Avatar name={selected.label} />
        <span className="combo-text">
          <span className="combo-label">{selected.label}</span>
          {selected.detail && <span className="combo-detail">{selected.detail}</span>}
        </span>
        <button type="button" id={id} className="btn combo-change" onClick={() => { onSelect(null); setOpen(true); setRefocus(true) }}>
          Change
        </button>
      </div>
    )
  }

  const typed = query.trim().length > 0
  const activeId = open && options[active] ? `${listId}-${active}` : undefined
  return (
    <div className="combo" ref={rootRef}>
      <div className="search">
        <Search className="i" aria-hidden />
        <input
          ref={inputRef}
          id={id}
          className="input"
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={activeId}
          aria-invalid={invalid || undefined}
          autoComplete="off"
          enterKeyHint="search"
          placeholder={placeholder}
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(event) => { onQueryChange(event.target.value); setActive(0); setOpen(true) }}
          onKeyDown={onKeyDown}
        />
        {loading && <span className="spinner combo-spinner" aria-hidden />}
        {!loading && typed && (
          <button type="button" className="combo-clear" aria-label="Clear search" onClick={() => { onQueryChange(''); inputRef.current?.focus() }}>
            <X className="i i-sm" aria-hidden />
          </button>
        )}
      </div>
      {open && (
        <div className="combo-panel">
          <ul id={listId} role="listbox" className="combo-list">
            {options.map((option, index) => (
              <li
                key={option.id}
                id={`${listId}-${index}`}
                role="option"
                aria-selected={index === active}
                className={cn('combo-option', index === active && 'is-active')}
                onPointerEnter={() => setActive(index)}
                // pointerdown would blur the input first; click keeps it simple and tap-safe.
                onClick={() => pick(option)}
              >
                <Avatar name={option.label} size="sm" />
                <span className="combo-text">
                  <span className="combo-label">{option.label}</span>
                  {option.detail && <span className="combo-detail">{option.detail}</span>}
                </span>
              </li>
            ))}
          </ul>
          <p className="combo-status" role="status">
            {loading ? 'Searching…' : typed && options.length === 0 ? emptyText(query.trim()) : footer}
          </p>
        </div>
      )}
    </div>
  )
}
