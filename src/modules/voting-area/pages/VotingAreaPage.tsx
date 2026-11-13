import { useNavigate, useSearch } from '@tanstack/react-router'
import { Vote } from 'lucide-react'
import { useState } from 'react'

import { AuthLayout } from '@/components/layout/AuthLayout'
import { Button, IconTile } from '@/components/shared'
import { VotingAreaPicker } from '../components/VotingAreaPicker'
import { useSaveVotingArea } from '../hooks/use-save-voting-area'
import { EMPTY_CHOICE } from '../types'

/** The step every member does once, before the app: where they vote. */
export function VotingAreaPage() {
  const navigate = useNavigate()
  const { redirect } = useSearch({ from: '/voting-area' })
  const [choice, setChoice] = useState(EMPTY_CHOICE)
  const save = useSaveVotingArea(() => (redirect ? navigate({ href: redirect }) : navigate({ to: '/home' })))
  return (
    <AuthLayout headline={<>Where do you vote?<br /><span>Your unit counts.</span></>}>
      <form onSubmit={(event) => { event.preventDefault(); if (choice.code) save.mutate(choice.code) }} noValidate>
        <IconTile icon={Vote} className="mb-4" />
        <h1 className="h1">Your voting area</h1>
        <p className="muted mt-1">Choose the polling unit where you are registered to vote. You can change it later on your profile.</p>
        <div className="mt-6"><VotingAreaPicker idPrefix="voting" value={choice} onChange={setChoice} /></div>
        <Button type="submit" variant="primary" size="lg" block className="mt-6" disabled={!choice.code || save.isPending}>Save and continue</Button>
      </form>
    </AuthLayout>
  )
}
