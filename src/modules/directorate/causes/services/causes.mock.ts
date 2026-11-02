import type { Cause } from '@/types/domain'

export const CAUSES: Cause[] = [
  { id: 'cse_lagos', title: 'Lagos mega rally', description: 'Buses, sound and stage', target: 50_000_000, raised: 34_000_000, deadline: '2026-12-10', groupsCount: 41, status: 'open', visibleTo: 'All groups' },
  { id: 'cse_neradio', title: 'North East radio', description: 'Hausa and Fulfulde jingles', target: 20_000_000, raised: 18_400_000, deadline: '2026-11-30', groupsCount: 63, status: 'open', visibleTo: 'North East' },
  { id: 'cse_anambra', title: 'Anambra rally', target: 10_000_000, raised: 2_100_000, deadline: '2026-12-20', groupsCount: 9, status: 'open', visibleTo: 'South East' },
  { id: 'cse_nwposters', title: 'North West posters', target: 30_000_000, raised: 9_300_000, deadline: '2026-12-15', groupsCount: 22, status: 'open', visibleTo: 'North West' },
  { id: 'cse_kano', title: 'Kano road show: fuel', target: 6_000_000, raised: 6_300_000, deadline: '2026-10-25', groupsCount: 18, status: 'closed', visibleTo: 'Kano' },
]
