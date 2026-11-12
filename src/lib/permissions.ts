import type { Power, User } from '@/types/domain'

/** Does the user hold this power in their group? The backend enforces it; this only shapes the UI. */
export function hasPower(user: User, power: Power): boolean {
  return user.powers.includes(power)
}

/** Leader, executive or coordinator with at least one power. */
export function hasAnyPower(user: User): boolean {
  return user.powers.length > 0
}
