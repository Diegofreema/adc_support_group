import { Button, Card, Field, SectionTitle, TextInput } from '@/components/shared'
import { PlaceSelects, usePlaceBinding } from '@/modules/auth'
import { useProfileForm } from '../hooks/use-profile-form'
import type { Profile } from '../types/profile.types'

export function ProfileDetailsForm({ profile }: { profile: Profile }) {
  const { form, onSubmit, isPending } = useProfileForm(profile)
  const place = usePlaceBinding(form)
  const errors = form.formState.errors
  return (
    <>
      <SectionTitle title="Details" />
      <Card>
        <form onSubmit={onSubmit} noValidate>
          <Field label="Full name" htmlFor="profile-name" error={errors.fullName?.message}>
            <TextInput id="profile-name" autoComplete="name" {...form.register('fullName')} />
          </Field>
          <Field label="Email" htmlFor="profile-email" optional error={errors.email?.message}>
            <TextInput id="profile-email" type="email" autoComplete="email" {...form.register('email')} />
          </Field>
          <PlaceSelects idPrefix="profile" value={place.value} onChange={place.onChange} errors={place.errors} />
          <Button type="submit" variant="primary" block className="mt-6" disabled={isPending}>Save</Button>
        </form>
      </Card>
    </>
  )
}
