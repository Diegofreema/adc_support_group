export interface RankedEntry {
  id: string
  name: string
  value: string
}

/** Numbered rows: 1 Atiku Women Network ……… 412 */
export function RankedList({ entries }: { entries: RankedEntry[] }) {
  return (
    <ol className="mt-3">
      {entries.map((entry, index) => (
        <li key={entry.id} className="setting !px-0 !py-3">
          <span className="row grow">
            <span className="faint bold num w-[18px]">{index + 1}</span>
            <span className="grow truncate bold">{entry.name}</span>
          </span>
          <span className="num">{entry.value}</span>
        </li>
      ))}
    </ol>
  )
}
