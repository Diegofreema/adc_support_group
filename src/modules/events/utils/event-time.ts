/** Times show in the phone's own time zone (Lagos for members at home). */
const dayFormat = new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })
const timeFormat = new Intl.DateTimeFormat('en-GB', { hour: 'numeric', minute: '2-digit', hour12: true })

const HOUR = 60 * 60_000
/** Check-in and ticking open this long before the start. */
const OPENS_BEFORE = HOUR

/** "Sat 14 Nov, 10:00 am" or "Sat 14 Nov, 10:00 am – 1:00 pm" */
export function eventWhenLabel(startsAt: string, endsAt?: string): string {
  const start = new Date(startsAt)
  const label = `${dayFormat.format(start)}, ${timeFormat.format(start)}`
  return endsAt ? `${label} – ${timeFormat.format(new Date(endsAt))}` : label
}

const pad = (value: number) => String(value).padStart(2, '0')

/** ISO → the form's local "YYYY-MM-DD" and "HH:MM". */
export function toLocalInputs(iso: string): { date: string; time: string } {
  const at = new Date(iso)
  return {
    date: `${at.getFullYear()}-${pad(at.getMonth() + 1)}-${pad(at.getDate())}`,
    time: `${pad(at.getHours())}:${pad(at.getMinutes())}`,
  }
}

/** The form's local date and time → ISO. */
export function fromLocalInputs(date: string, time: string): string {
  return new Date(`${date}T${time}`).toISOString()
}

/** Today in the phone's time zone, for the date picker's default. */
export function todayInput(): string {
  return toLocalInputs(new Date().toISOString()).date
}

export function hasStarted(startsAt: string, now = Date.now()): boolean {
  return new Date(startsAt).getTime() <= now
}

/** Organisers can tick people from an hour before the start. */
export function attendanceOpen(startsAt: string, now = Date.now()): boolean {
  return now >= new Date(startsAt).getTime() - OPENS_BEFORE
}

/** The backend refuses a start more than an hour in the past. */
export function isTooLate(iso: string, now = Date.now()): boolean {
  return new Date(iso).getTime() < now - HOUR
}
