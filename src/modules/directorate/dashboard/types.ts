export interface DashboardTotals {
  verifiedGroups: number
  waitingGroups: number
  supporters: number
  activities: number
  activitiesThisWeek: number
  raised: number
  raisedOffline: number
}

export interface DashboardTodo {
  groupsToVerify: number
  activitiesToCheck: number
  offlineToConfirm: number
  handovers: number
}

export interface StateRow {
  state: string
  groups: number
  members: number
  activities: number
  raised: number
}

export interface GroupScore {
  id: string
  name: string
  activities: number
  members: number
  money: number
}

export interface CategoryCount {
  label: string
  value: number
}

export interface Dashboard {
  totals: DashboardTotals
  todo: DashboardTodo
  states: StateRow[]
  topGroups: GroupScore[]
  categories: CategoryCount[]
}

export type Period = 'all' | 'month' | 'week'
export type ScoreMetric = 'activities' | 'members' | 'money'
