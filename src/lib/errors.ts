/**
 * Server errors → words a person can act on.
 *
 * Every error text that reaches the screen goes through `friendlyError`. It
 * never shows internal names, codes, SQL or anything with underscores, and
 * never says which security check failed. Messages the backend already writes
 * in plain English ("This event is closed") pass through unchanged. The raw
 * error is kept for the console only.
 *
 * Logic that needs the raw text (e.g. "not found", "already exists") keeps
 * reading `error.message`; only what is shown is translated.
 */

export type ErrorCause = 'offline' | 'logged-out' | 'not-allowed' | 'not-found' | 'duplicate' | 'invalid' | 'too-many' | 'timeout' | 'server' | 'unknown'

/** What a person reads for each cause, when the server's own words can't be shown. */
const MESSAGES: Record<ErrorCause, string> = {
  offline: 'No connection. Check your data or Wi-Fi, then try again.',
  'logged-out': 'You were logged out. Please log in again.',
  'not-allowed': "You don't have permission to do that. If you think you should, ask your group leader.",
  'not-found': "We couldn't find that. It may have been removed.",
  duplicate: 'That already exists.',
  invalid: "Some details aren't right. Please check them and try again.",
  'too-many': 'Too many tries. Please wait a minute, then try again.',
  timeout: 'This is taking too long. Please try again in a moment.',
  server: 'Something went wrong on our side. Please try again.',
  unknown: 'Something went wrong. Please try again.',
}

interface ErrorShape {
  message: string
  code?: string
  status?: number
}

function shapeOf(error: unknown): ErrorShape {
  if (typeof error === 'string') return { message: error }
  if (error && typeof error === 'object') {
    const record = error as Record<string, unknown>
    const status = Number(record.status ?? record.statusCode)
    return {
      message: typeof record.message === 'string' ? record.message : '',
      code: typeof record.code === 'string' ? record.code : undefined,
      status: Number.isFinite(status) ? status : undefined,
    }
  }
  return { message: '' }
}

const RULES: [ErrorCause, (e: ErrorShape) => boolean][] = [
  ['offline', (e) => /failed to fetch|networkerror|network request failed|load failed|fetch failed|network connection was lost|err_internet_disconnected/i.test(e.message)],
  ['logged-out', (e) => e.status === 401 || /jwt|not authenticated|auth session missing|session (has )?expired|refresh token|invalid claim/i.test(e.message)],
  ['not-allowed', (e) => e.status === 403 || e.code === '42501' || /permission denied|row-level security|not allowed|forbidden|insufficient privilege/i.test(e.message)],
  ['too-many', (e) => e.status === 429 || /rate limit|too many requests/i.test(e.message)],
  ['timeout', (e) => e.code === '57014' || e.status === 504 || /timeout|timed out|statement canceled/i.test(e.message)],
  ['not-found', (e) => e.code === 'PGRST116' || e.status === 404 || /no rows|not found|does not exist/i.test(e.message)],
  ['duplicate', (e) => e.code === '23505' || /duplicate key|already exists/i.test(e.message)],
  ['invalid', (e) => ['22P02', '23502', '23503', '23514', '22001', '22003'].includes(e.code ?? '') || /invalid input|violates|null value|out of range|too long for type/i.test(e.message)],
  ['server', (e) => (e.status ?? 0) >= 500 || /edge function|non-2xx|internal server error/i.test(e.message)],
]

/** Why it failed, from codes and wording. */
export function errorCause(error: unknown): ErrorCause {
  if (typeof navigator !== 'undefined' && navigator.onLine === false) return 'offline'
  const shape = shapeOf(error)
  return RULES.find(([, matches]) => matches(shape))?.[0] ?? 'unknown'
}

/** Text that looks like it was written for a person, not a log. */
const TECHNICAL = /_|\b(function|relation|column|schema|constraint|syntax|sql|postgres|pgrst|rpc|jwt|uuid|null|undefined|typeerror|referenceerror|stack|exception|status code|http|json|payload|bucket|storage api)\b|[{}[\]<>`$\\]|\b\d{5,}\b|\w+\(\)|::/i

/** Database and platform phrases that read like English but are raw internals. */
const RAW_PHRASES = /violates|row-level|duplicate key|invalid input|permission denied|null value|does not exist|the resource|non-2xx|could not find the|new row|foreign key|unique constraint/i

export function isPlainLanguage(message: string): boolean {
  const text = message.trim()
  return text.length > 0 && text.length <= 220 && /\s/.test(text) && /^[A-Z"'‘“(₦0-9]/.test(text) && !TECHNICAL.test(text) && !RAW_PHRASES.test(text)
}

/**
 * The one message to show for an error. The backend's own plain sentences
 * pass through; everything else becomes a plain sentence by cause.
 * "Could not upload the photo: <raw>" keeps its plain first half.
 */
export function friendlyError(error: unknown, fallback?: string): string {
  const { message } = shapeOf(error)
  const cause = errorCause(error)
  // Some causes always read better in our words, whatever the server said.
  if (cause === 'offline' || cause === 'logged-out' || cause === 'timeout' || cause === 'too-many') return MESSAGES[cause]
  if (isPlainLanguage(message)) return message.trim()
  const [head, ...rest] = message.split(': ')
  if (rest.length && isPlainLanguage(head)) return `${head.trim()}. ${cause === 'unknown' ? 'Please try again.' : MESSAGES[cause]}`
  if (cause !== 'unknown') return MESSAGES[cause]
  return fallback ?? MESSAGES.unknown
}

/** Keep the raw error where developers can see it, never on screen. */
export function logRawError(error: unknown, where?: string): void {
  if (import.meta.env?.DEV) console.warn(`[error${where ? ` · ${where}` : ''}]`, error)
}
