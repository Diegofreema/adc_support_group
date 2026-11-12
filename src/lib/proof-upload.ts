import { shrinkForUpload } from './image'
import { supabase } from './supabase'

/**
 * Proofs and receipts go to the private support-group-payment-proofs bucket
 * under the group's folder ({groupId}/…); the backend checks that prefix.
 * Photos are shrunk first; PDFs pass through.
 */
const BUCKET = 'support-group-payment-proofs'
const PROOF_TYPES: Record<string, string> = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'application/pdf': 'pdf' }
const MAX_PROOF_BYTES = 10 * 1024 * 1024

/** Upload a proof or receipt; returns its storage path. `folder` groups them (e.g. 'money'). */
export async function uploadProof(groupId: string, original: File, folder?: string): Promise<string> {
  const file = await shrinkForUpload(original)
  const ext = PROOF_TYPES[file.type]
  if (!ext) throw new Error('Proof must be a photo (JPG, PNG, WebP) or a PDF')
  if (file.size > MAX_PROOF_BYTES) throw new Error('Proof must be under 10 MB')
  const path = [groupId, folder, `${crypto.randomUUID()}.${ext}`].filter(Boolean).join('/')
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, { contentType: file.type, upsert: false })
  if (error) throw new Error(`Could not upload the proof: ${error.message}`)
  return path
}

/** A short-lived link to view a proof (the bucket is private). */
export async function proofUrl(path: string, seconds = 300): Promise<string> {
  const { data, error } = await supabase.storage.from(BUCKET).createSignedUrl(path, seconds)
  if (error) throw new Error(`Could not open the proof: ${error.message}`)
  return data.signedUrl
}
