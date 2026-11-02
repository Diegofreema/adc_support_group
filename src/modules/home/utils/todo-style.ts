import { ClipboardCheck, FileWarning, ShieldCheck, type LucideIcon } from 'lucide-react'

import type { Tone } from '@/components/shared'
import type { TodoItem, TodoKind } from '../types/home.types'

interface TodoStyle {
  icon: LucideIcon
  tone: Tone
  label: (count: number) => string
}

const TODO_STYLES: Record<TodoKind, TodoStyle> = {
  'approve-activities': { icon: ClipboardCheck, tone: 'amber', label: (count) => `Approve ${count} activities` },
  'fix-upload': { icon: FileWarning, tone: 'red', label: (count) => `Fix ${count} upload errors` },
  'verify-pending': { icon: ShieldCheck, tone: 'blue', label: () => 'Group being checked' },
}

export function todoStyle(item: TodoItem): { icon: LucideIcon; tone: Tone; label: string } {
  const style = TODO_STYLES[item.kind]
  return { icon: style.icon, tone: style.tone, label: style.label(item.count) }
}
