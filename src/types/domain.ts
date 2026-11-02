/** Shared domain types used across modules. Module-only types live in modules/<name>/types. */

export type Role = 'member' | 'leader' | 'directorate'
export type MemberRole = 'leader' | 'executive' | 'coordinator' | 'member'
export type JoinedVia = 'link' | 'excel' | 'manual'

export type GroupStatus = 'pending' | 'verified' | 'rejected' | 'suspended'
export type GroupLevel = 'national' | 'state' | 'lga' | 'ward' | 'abroad'
export type ActivityStatus = 'pending' | 'approved' | 'rejected'
export type PaymentStatus = 'paid' | 'checking' | 'failed' | 'rejected'
export type PaymentMethod = 'funz' | 'transfer' | 'cash'
export type CauseStatus = 'open' | 'closed'

/** Any status shown with a StatusChip. */
export type Status = GroupStatus | ActivityStatus | PaymentStatus | CauseStatus

export interface Place {
  state?: string
  lga?: string
  ward?: string
  country?: string
  city?: string
}

export interface User {
  id: string
  fullName: string
  phone: string
  email?: string
  role: Role
  /** Group currently being worked on (leaders, members). */
  activeGroupId?: string
  activeGroupName?: string
  title?: string
}

export interface Group extends Place {
  id: string
  name: string
  category: string
  level: GroupLevel
  status: GroupStatus
  memberCount: number
  memberGrowth: number
  chapterCount: number
  activityCount: number
  amountGiven: number
  leaderName: string
  leaderPhone: string
  cacNumber?: string
  joinCode: string
  submittedAt: string
  possibleDuplicateOf?: string
  rejectionReason?: string
}

export interface Chapter extends Place {
  id: string
  groupId: string
  name: string
  level: Exclude<GroupLevel, 'national'>
  coordinatorName: string
  coordinatorPhone: string
  memberCount: number
  memberGrowth: number
  activityCount: number
  amountGiven: number
  joinCode: string
}

export interface Member extends Place {
  id: string
  fullName: string
  phone: string
  email?: string
  role: MemberRole
  title?: string
  chapterId?: string
  chapterName?: string
  joinedVia: JoinedVia
  joinedAt: string
}

export interface Activity extends Place {
  id: string
  groupId: string
  groupName: string
  chapterName?: string
  type: string
  title: string
  date: string
  peopleReached: number
  photoTones: PhotoTone[]
  videoUrl?: string
  note?: string
  status: ActivityStatus
  loggedBy: string
  approvedBy?: string
  checkedByDirectorate?: boolean
  rejectionReason?: string
  paymentId?: string
}

export type PaymentPurpose =
  | { kind: 'cause'; causeId: string; causeTitle: string }
  | { kind: 'general'; purpose: string; note?: string }

export interface Payment {
  id: string
  groupId: string
  groupName: string
  chapterName?: string
  purpose: PaymentPurpose
  amount: number
  method: PaymentMethod
  status: PaymentStatus
  date: string
  reference: string
  payerName: string
  activityId?: string
  activityTitle?: string
  rejectionReason?: string
}

export interface Cause {
  id: string
  title: string
  description?: string
  target: number
  raised: number
  deadline: string
  groupsCount: number
  status: CauseStatus
  visibleTo: string
}

/** Placeholder photo colours until real uploads exist. */
export type PhotoTone = 1 | 2 | 3 | 4 | 5 | 6
