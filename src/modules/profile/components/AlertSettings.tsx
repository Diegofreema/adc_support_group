import { Languages, Mail, MessageSquare } from 'lucide-react'

import { List, SectionTitle, SelectInput, Toggle } from '@/components/shared'
import { useAlertPreferences } from '../hooks/use-alert-preferences'
import { LANGUAGES } from '../services/profile.mock'
import type { Profile } from '../types/profile.types'
import { SettingRow } from './SettingRow'

export function AlertSettings({ profile }: { profile: Profile }) {
  const { toggle } = useAlertPreferences(profile.alerts)
  return (
    <>
      <SectionTitle title="Alerts" />
      <List>
        <SettingRow icon={Mail} label="Email" control={<Toggle label="Email alerts" checked={profile.alerts.email} onChange={toggle('email')} />} />
        <SettingRow icon={MessageSquare} label="SMS" control={<Toggle label="SMS alerts" checked={profile.alerts.sms} onChange={toggle('sms')} />} />
        <SettingRow icon={Languages} label="Language" control={<SelectInput small options={LANGUAGES} defaultValue={profile.language} aria-label="Language" />} />
      </List>
    </>
  )
}
