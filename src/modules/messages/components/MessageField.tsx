import { Field, TextArea } from '@/components/shared'
import { SMS_PAGE_CHARS } from '@/lib/sms'

interface MessageFieldProps {
  value: string
  onChange: (value: string) => void
  pages: number
}

const MAX_CHARS = SMS_PAGE_CHARS * 3

export function MessageField({ value, onChange, pages }: MessageFieldProps) {
  return (
    <Field label="Message" htmlFor="msg-body">
      <TextArea id="msg-body" maxLength={MAX_CHARS} placeholder="Type your message" value={value} onChange={(event) => onChange(event.target.value)} />
      <div className="row-between faint small mt-2">
        <span className="num">{value.length} / {SMS_PAGE_CHARS * pages}</span>
        <span>{pages} SMS {pages === 1 ? 'page' : 'pages'}</span>
      </div>
    </Field>
  )
}
