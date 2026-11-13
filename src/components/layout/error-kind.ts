/** What went wrong, in words a member can act on. */
export interface ErrorKind {
  kind: 'update' | 'offline' | 'unknown'
  title: string
  helper: string
}

/** A lazily loaded part of the app is gone: a new version was deployed since this tab opened. */
const STALE_CHUNK = /dynamically imported module|Importing a module script failed|Loading chunk \d+ failed|Unable to preload CSS/i

export function describeError(error: unknown): ErrorKind {
  const message = error instanceof Error ? error.message : String(error ?? '')
  if (STALE_CHUNK.test(message)) {
    return { kind: 'update', title: 'A new version is out', helper: 'The app was updated while this page was open. Reload to get the latest version.' }
  }
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return { kind: 'offline', title: "You're offline", helper: 'Check your data or Wi-Fi, then try again.' }
  }
  return { kind: 'unknown', title: 'Something went wrong', helper: "This wasn't your fault. Try again; if it keeps happening, tell your group leader or the Directorate and quote the reference below." }
}

/** Short reference to quote when reporting, also written to the console next to the error. */
export function errorReference(): string {
  return `ERR-${Date.now().toString(36).slice(-4).toUpperCase()}${Math.random().toString(36).slice(2, 5).toUpperCase()}`
}
