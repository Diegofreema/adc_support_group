import type { Dashboard } from '../types'

export const DASHBOARD: Dashboard = {
  totals: { verifiedGroups: 4812, waitingGroups: 18, supporters: 1_180_000, activities: 38_950, activitiesThisWeek: 1204, raised: 412_000_000, raisedOffline: 41_000_000 },
  todo: { groupsToVerify: 18, activitiesToCheck: 42, offlineToConfirm: 5, handovers: 2 },
  states: [
    { state: 'Lagos', groups: 341, members: 96_410, activities: 3212, raised: 48_200_000 },
    { state: 'Kano', groups: 312, members: 118_903, activities: 3604, raised: 39_500_000 },
    { state: 'Adamawa', groups: 288, members: 84_117, activities: 2980, raised: 35_100_000 },
    { state: 'Kaduna', groups: 241, members: 71_526, activities: 2415, raised: 22_800_000 },
    { state: 'FCT', groups: 166, members: 40_288, activities: 1702, raised: 30_400_000 },
    { state: 'Rivers', groups: 147, members: 38_904, activities: 1310, raised: 19_700_000 },
    { state: 'Anambra', groups: 158, members: 35_220, activities: 1288, raised: 21_300_000 },
  ],
  topGroups: [
    { id: 'grp_awn', name: 'Atiku Women Network', activities: 412, members: 3482, money: 4_200_000 },
    { id: 'grp_kkr', name: 'Kano Keke Riders', activities: 288, members: 2140, money: 2_100_000 },
    { id: 'grp_nyv', name: 'Northern Youth Vanguard', activities: 251, members: 22_140, money: 3_400_000 },
    { id: 'grp_otf', name: 'Onitsha Traders Forum', activities: 197, members: 5_210, money: 6_900_000 },
    { id: 'grp_yp', name: 'Yola Professionals', activities: 120, members: 980, money: 18_600_000 },
  ],
  categories: [
    { label: 'Women', value: 1104 },
    { label: 'Youth', value: 986 },
    { label: 'Community', value: 614 },
    { label: 'Traders', value: 521 },
    { label: 'Students', value: 412 },
    { label: 'Transport', value: 377 },
  ],
}

/** Rough scaling so the period filter visibly changes the mock numbers. */
export const PERIOD_FACTOR = { all: 1, month: 0.18, week: 0.05 } as const
