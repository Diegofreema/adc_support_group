import { useState } from 'react'

import { PageHeader, Tabs } from '@/components/shared'
import { ActivityTypesSection } from '../components/ActivityTypesSection'
import { CategoriesSection } from '../components/CategoriesSection'
import { HandoversSection } from '../components/HandoversSection'
import { SmsBudgetSection } from '../components/SmsBudgetSection'
import { StaffSection } from '../components/StaffSection'
import { SmsBudgetWarning } from '../../shared/components/SmsBudgetWarning'
import { useHandovers } from '../hooks/use-settings'
import type { SettingsTab } from '../types'

const SECTIONS: Record<SettingsTab, () => React.JSX.Element | null> = {
  categories: CategoriesSection,
  types: ActivityTypesSection,
  sms: SmsBudgetSection,
  staff: StaffSection,
  handovers: HandoversSection,
}

export function SettingsPage() {
  const [tab, setTab] = useState<SettingsTab>('categories')
  const handoverCount = useHandovers().items.length
  const Section = SECTIONS[tab]
  const tabs = [
    { value: 'categories' as const, label: 'Categories' },
    { value: 'types' as const, label: 'Activity types' },
    { value: 'sms' as const, label: 'SMS budget' },
    { value: 'staff' as const, label: 'Staff' },
    { value: 'handovers' as const, label: 'Handovers', count: handoverCount },
  ]
  return (
    <>
      <PageHeader title="Settings" />
      {tab !== 'sms' && <SmsBudgetWarning className="mb-4" />}
      <Tabs label="Settings" tabs={tabs} value={tab} onChange={setTab} />
      <section className="mt-4"><Section /></section>
    </>
  )
}
