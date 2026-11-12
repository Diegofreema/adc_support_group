import { getRouteApi } from '@tanstack/react-router'

import { PageHeader, Tabs } from '@/components/shared'
import { ActivityTypesSection } from '../components/ActivityTypesSection'
import { CategoriesSection } from '../components/CategoriesSection'
import { GivingLimitSection } from '../components/GivingLimitSection'
import { HandoversSection } from '../components/HandoversSection'
import { NameChangesSection } from '../components/NameChangesSection'
import { SmsBudgetSection } from '../components/SmsBudgetSection'
import { StaffSection } from '../components/StaffSection'
import { SmsBudgetWarning } from '../../shared/components/SmsBudgetWarning'
import { useHandovers, useNameChanges } from '../hooks/use-settings'
import { useRequiredUser } from '@/stores/session-store'
import type { SettingsTab } from '../types'

const SECTIONS: Record<SettingsTab, () => React.JSX.Element | null> = {
  categories: CategoriesSection,
  types: ActivityTypesSection,
  sms: SmsBudgetSection,
  giving: GivingLimitSection,
  staff: StaffSection,
  handovers: HandoversSection,
  names: NameChangesSection,
}

const routeApi = getRouteApi('/admin/settings')

/** National settings: admins and super admins only (the server refuses state admins). */
const NATIONAL_TABS: { value: SettingsTab; label: string }[] = [
  { value: 'categories', label: 'Categories' },
  { value: 'types', label: 'Activity types' },
  { value: 'sms', label: 'SMS budget' },
  { value: 'giving', label: 'Giving limit' },
  { value: 'staff', label: 'Staff' },
]

export function SettingsPage() {
  const stateAdmin = useRequiredUser().stateAdmin === true
  const search = routeApi.useSearch()
  const navigate = routeApi.useNavigate()
  const national = new Set(NATIONAL_TABS.map((item) => item.value))
  const requested = search.tab && !(stateAdmin && national.has(search.tab)) ? search.tab : undefined
  const tab: SettingsTab = requested ?? (stateAdmin ? 'handovers' : 'categories')
  const setTab = (next: SettingsTab) => void navigate({ search: { tab: next }, replace: true })
  const handoverCount = useHandovers().count
  const nameChangeCount = useNameChanges().count
  const Section = SECTIONS[tab]
  const tabs = [
    ...(stateAdmin ? [] : NATIONAL_TABS),
    { value: 'handovers' as const, label: 'Handovers', count: handoverCount },
    { value: 'names' as const, label: 'Name changes', count: nameChangeCount },
  ]
  return (
    <>
      <PageHeader title="Settings" />
      {tab !== 'sms' && !stateAdmin && <SmsBudgetWarning className="mb-4" />}
      <Tabs label="Settings" tabs={tabs} value={tab} onChange={setTab} />
      <section className="mt-4"><Section /></section>
    </>
  )
}
