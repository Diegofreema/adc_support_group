/**
 * Helpers for the in-memory mock services. Every module service uses these so
 * swapping to a real backend later only touches the service files.
 */
export function delay(ms = 350): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/** Resolve a value after a short, realistic delay. */
export async function respond<T>(value: T, ms?: number): Promise<T> {
  await delay(ms)
  return structuredClone(value)
}

export function notFound(entity: string, id: string): never {
  throw new Error(`${entity} ${id} not found`)
}

export function newId(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`
}
