import { FileText, ImageIcon } from 'lucide-react'

import { isPdf } from '../utils/labels'

interface ProofPreviewProps {
  path?: string
  url?: string
  loading: boolean
}

/** The proof or receipt: a photo inline (tap for full size), a PDF as a link. */
export function ProofPreview({ path, url, loading }: ProofPreviewProps) {
  if (!path) return <ProofNote text="No proof added" />
  if (!url) return <ProofNote text={loading ? 'Loading proof…' : 'Could not open the proof'} />
  if (isPdf(path)) {
    return (
      <a href={url} target="_blank" rel="noreferrer" className="dropzone mb-3">
        <FileText className="i i-lg" aria-hidden />
        <span className="bold">Open PDF</span>
      </a>
    )
  }
  return (
    <a href={url} target="_blank" rel="noreferrer" className="mb-3 block">
      <img src={url} alt="Proof" className="max-h-80 w-full rounded object-contain" />
    </a>
  )
}

function ProofNote({ text }: { text: string }) {
  return (
    <div className="dropzone mb-3 !cursor-default">
      <ImageIcon className="i i-lg" aria-hidden />
      <span className="small">{text}</span>
    </div>
  )
}
