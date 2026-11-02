import { Avatar, List, SectionTitle } from '@/components/shared'
import type { LeaderNote } from '../types/home.types'

/** Short messages from the member's group leaders. */
export function LeaderNotes({ notes }: { notes: LeaderNote[] }) {
  return (
    <>
      <SectionTitle title="From your leaders" />
      <List>
        {notes.map((note) => (
          <LeaderNoteItem key={note.id} note={note} />
        ))}
      </List>
    </>
  )
}

function LeaderNoteItem({ note }: { note: LeaderNote }) {
  return (
    <article className="border-line px-4 py-3.5 [&+&]:border-t">
      <div className="row">
        <Avatar name={note.author} size="sm" />
        <span className="grow">
          <b className="small block">{note.author}</b>
          <span className="meta tiny block">{note.groupName} · {note.time}</span>
        </span>
      </div>
      <p className="mt-2">{note.body}</p>
    </article>
  )
}
