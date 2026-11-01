import { Card } from '@/components/shared'
import type { ColumnMapping, ParsedSheet } from '../types'
import { isValidPhone } from '../utils/phone'

const PREVIEW_ROWS = 3

/** First few rows as they will be read; bad phones in red. */
export function ImportPreviewTable({ sheet, mapping }: { sheet: ParsedSheet; mapping: ColumnMapping }) {
  return (
    <Card flush className="table-scroll">
      <table className="table">
        <thead><tr><th>Name</th><th>Phone</th><th>Ward</th></tr></thead>
        <tbody>
          {sheet.rows.slice(0, PREVIEW_ROWS).map((row, index) => (
            <tr key={index}>
              <td>{row[mapping.fullName]}</td>
              <td className={isValidPhone(row[mapping.phone] ?? '') ? 'num' : 'num red'}>{row[mapping.phone]}</td>
              <td>{row[mapping.ward]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}
