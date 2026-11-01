export interface PasswordRule {
  label: string
  ok: boolean
}

export const MIN_PASSWORD_LENGTH = 8

/** The checklist shown under a new-password field. */
export function passwordRules(password: string, previous?: string): PasswordRule[] {
  const rules: PasswordRule[] = [
    { label: `${MIN_PASSWORD_LENGTH}+ characters`, ok: password.length >= MIN_PASSWORD_LENGTH },
    { label: 'A number', ok: /\d/.test(password) },
  ]
  if (previous !== undefined) rules.push({ label: 'Not the old one', ok: password.length > 0 && password !== previous })
  return rules
}

export function allRulesPass(rules: PasswordRule[]): boolean {
  return rules.every((rule) => rule.ok)
}
