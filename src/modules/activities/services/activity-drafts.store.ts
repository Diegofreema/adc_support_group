import type { ActivityDraft } from '../types'

/**
 * Activities saved on the phone while there was no signal (raw IndexedDB:
 * photo blobs are too big for localStorage). Keyed by clientRef.
 */
const DB_NAME = 'adc-activity-drafts'
const STORE = 'drafts'

let opening: Promise<IDBDatabase> | undefined

function openDb(): Promise<IDBDatabase> {
  opening ??= new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1)
    request.onupgradeneeded = () => request.result.createObjectStore(STORE, { keyPath: 'clientRef' })
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => { opening = undefined; reject(request.error ?? new Error('Could not open phone storage')) }
  })
  return opening
}

/** Run one request in its own transaction and resolve with its result once committed. */
async function run<T>(mode: IDBTransactionMode, make: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  const db = await openDb()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, mode)
    const request = make(tx.objectStore(STORE))
    tx.oncomplete = () => resolve(request.result)
    tx.onerror = () => reject(tx.error ?? new Error('Could not use phone storage'))
    tx.onabort = () => reject(tx.error ?? new Error('Could not use phone storage'))
  })
}

export async function putDraft(draft: ActivityDraft): Promise<void> {
  await run('readwrite', (store) => store.put(draft))
}

export async function getDraft(clientRef: string): Promise<ActivityDraft | undefined> {
  return run<ActivityDraft | undefined>('readonly', (store) => store.get(clientRef))
}

export async function deleteDraft(clientRef: string): Promise<void> {
  await run('readwrite', (store) => store.delete(clientRef))
}

/** This user's drafts, oldest first. */
export async function listDrafts(ownerId: string): Promise<ActivityDraft[]> {
  const all = await run<ActivityDraft[]>('readonly', (store) => store.getAll())
  return all.filter((draft) => draft.ownerId === ownerId).sort((a, b) => a.createdAt.localeCompare(b.createdAt))
}
