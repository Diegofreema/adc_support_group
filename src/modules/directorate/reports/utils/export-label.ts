import { PERIOD_OPTIONS } from '../../shared/constants/options'
import type { ExportSpec, ExportSubject } from '../types'

const SUBJECT_LABEL: Record<ExportSubject, string> = { groups: 'Groups', members: 'Members', activities: 'Activities', payments: 'Payments' }

/** "Groups · Kano · This month" */
export function exportLabel(spec: ExportSpec): string {
  const period = PERIOD_OPTIONS.find((option) => option.value === spec.period)?.label
  const scope = [spec.state, spec.category].filter(Boolean).join(' · ') || 'All'
  return [SUBJECT_LABEL[spec.subject], scope, spec.period === 'all' ? undefined : period].filter(Boolean).join(' · ')
}
