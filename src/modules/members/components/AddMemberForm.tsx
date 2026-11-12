import { Button, Card, Field, PhoneInput, PlaceSelects, TextInput } from '@/components/shared'
import { useAddMemberForm } from '../hooks/use-add-member-form'
import type { ChapterOption } from '../types'
import { AddedMemberNote } from './AddedMemberNote'
import { ChapterSelect } from './ChapterSelect'

/** Add one person by hand; they're welcomed by email, SMS, or a link the leader sends. */
export function AddMemberForm({ chapters }: { chapters: ChapterOption[] }) {
  const { form, onSubmit, isSaving, lastAdded, place, setPlace, chapterId, setChapterId } = useAddMemberForm()
  const { errors } = form.formState
  return (
    <>
      <Card>
        <form onSubmit={onSubmit} noValidate>
          <Field label="Full name" htmlFor="am-name" error={errors.fullName?.message}>
            <TextInput id="am-name" placeholder="As people know them" {...form.register('fullName')} />
          </Field>
          <Field label="Phone" htmlFor="am-phone" error={errors.phone?.message}>
            <PhoneInput id="am-phone" {...form.register('phone')} />
          </Field>
          <PlaceSelects idPrefix="am" value={place} onChange={setPlace} errors={{ state: errors.state?.message, lga: errors.lga?.message, ward: errors.ward?.message }} />
          <ChapterSelect id="am-chapter" chapters={chapters} value={chapterId} onChange={setChapterId} />
          <Field label="Email" htmlFor="am-email" optional error={errors.email?.message}>
            <TextInput id="am-email" type="email" placeholder="name@email.com" {...form.register('email')} />
          </Field>
          <Button variant="primary" size="lg" block type="submit" className="mt-6" disabled={isSaving}>Add member</Button>
        </form>
      </Card>
      {lastAdded && <AddedMemberNote added={lastAdded} />}
    </>
  )
}
