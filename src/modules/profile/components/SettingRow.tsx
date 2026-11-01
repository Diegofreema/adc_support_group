import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

interface SettingRowProps {
  icon: LucideIcon
  label: string
  control: ReactNode
}

/** Label on the left, control on the right. */
export function SettingRow({ icon: Icon, label, control }: SettingRowProps) {
  return (
    <div className="setting">
      <span className="row"><Icon className="i faint" aria-hidden />{label}</span>
      {control}
    </div>
  )
}
