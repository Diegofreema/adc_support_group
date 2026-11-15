import { ClipboardCheck, FileWarning, ShieldCheck, type LucideIcon } from 'lucide-react'

import type { Tone } from '@/components/shared'
import type { TodoItem, TodoKind } from '../types/home.types'

interface TodoStyle {
  icon: LucideIcon
  tone: Tone
  label: (count: number) => string
  /** One plain line on why it matters. */
  hint: string
}

const TODO_STYLES: Record<TodoKind, TodoStyle> = {
  'approve-activities': { icon: ClipboardCheck, tone: 'amber', label: (count) => `Approve ${count === 1 ? '1 activity' : `${count} activities`}`, hint: 'Members are waiting for you' },
  'fix-upload': { icon: FileWarning, tone: 'red', label: (count) => `Fix ${count === 1 ? '1 member' : `${count} members`}`, hint: "From your upload: they weren't added yet" },
  'verify-pending': { icon: ShieldCheck, tone: 'blue', label: () => 'Group being checked', hint: 'Usually 1–3 days' },
}

export function todoStyle(item: TodoItem): { icon: LucideIcon; tone: Tone; label: string; hint: string } {
  const style = TODO_STYLES[item.kind]
  return { icon: style.icon, tone: style.tone, label: style.label(item.count), hint: style.hint }
}
