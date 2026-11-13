import { useState } from 'react'

import { Button, Card, KeyValueList, SectionTitle } from '@/components/shared'
import { EMPTY_CHOICE, useSaveVotingArea, VotingAreaPicker, type VotingArea } from '@/modules/voting-area'

/** "Where I vote": the saved polling unit, and a change form with the same picker. */
export function VotingAreaCard({ area }: { area: VotingArea | null }) {
  const [editing, setEditing] = useState(false)
  const [choice, setChoice] = useState(EMPTY_CHOICE)
  const save = useSaveVotingArea(() => setEditing(false))
  return (
    <>
      <SectionTitle title="Where I vote" />
      <Card>
        {editing ? (
          <form onSubmit={(event) => { event.preventDefault(); if (choice.code) save.mutate(choice.code) }} noValidate>
            <VotingAreaPicker idPrefix="profile-voting" value={choice} onChange={setChoice} />
            <div className="grid-2 mt-6 !grid-cols-2">
              <Button onClick={() => setEditing(false)}>Cancel</Button>
              <Button type="submit" variant="primary" disabled={!choice.code || save.isPending}>Save</Button>
            </div>
          </form>
        ) : (
          <>
            {area && <KeyValueList items={[
              { label: 'Polling unit', value: `${area.pollingUnitName} (${area.pollingUnitCode})` },
              { label: 'Ward', value: area.ward },
              { label: 'LGA', value: area.lga },
              { label: 'State', value: area.state },
            ]} />}
            <Button block className={area ? 'mt-4' : undefined} onClick={() => { setChoice(EMPTY_CHOICE); setEditing(true) }}>
              {area ? 'Change' : 'Choose where I vote'}
            </Button>
          </>
        )}
      </Card>
    </>
  )
}
