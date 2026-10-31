import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useCreateSupporter } from '@/features/supporters/queries'
import { NIGERIAN_STATES, supporterFormSchema, type SupporterFormValues } from '@/features/supporters/schema'

export const Route = createFileRoute('/join')({
  component: JoinPage,
})

function JoinPage() {
  const navigate = useNavigate()
  const createSupporter = useCreateSupporter()

  const form = useForm<SupporterFormValues>({
    resolver: zodResolver(supporterFormSchema),
    defaultValues: { fullName: '', email: '', phone: '', lga: '', message: '' },
  })

  const onSubmit = form.handleSubmit((values) =>
    createSupporter.mutate(values, {
      onSuccess: (supporter) => {
        toast.success(`Welcome aboard, ${supporter.fullName.split(' ')[0]}!`)
        form.reset()
        navigate({ to: '/supporters', search: { state: supporter.state } })
      },
      onError: (error) => toast.error(error.message),
    }),
  )

  const { errors } = form.formState

  return (
    <Card className="mx-auto max-w-xl">
      <CardHeader>
        <CardTitle className="text-2xl">Become a supporter</CardTitle>
        <CardDescription>Tell us a little about yourself and where you are.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} noValidate>
          <FieldGroup>
            <Field data-invalid={!!errors.fullName}>
              <FieldLabel htmlFor="fullName">Full name</FieldLabel>
              <Input id="fullName" autoComplete="name" aria-invalid={!!errors.fullName} {...form.register('fullName')} />
              <FieldError errors={[errors.fullName]} />
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field data-invalid={!!errors.email}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" type="email" autoComplete="email" aria-invalid={!!errors.email} {...form.register('email')} />
                <FieldError errors={[errors.email]} />
              </Field>
              <Field data-invalid={!!errors.phone}>
                <FieldLabel htmlFor="phone">Phone</FieldLabel>
                <Input id="phone" type="tel" autoComplete="tel" placeholder="08031234567" aria-invalid={!!errors.phone} {...form.register('phone')} />
                <FieldError errors={[errors.phone]} />
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Controller
                control={form.control}
                name="state"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="state">State</FieldLabel>
                    <Select value={field.value ?? ''} onValueChange={field.onChange}>
                      <SelectTrigger id="state" className="w-full" aria-invalid={fieldState.invalid} onBlur={field.onBlur}>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {NIGERIAN_STATES.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
              <Field data-invalid={!!errors.lga}>
                <FieldLabel htmlFor="lga">Local government area</FieldLabel>
                <Input id="lga" aria-invalid={!!errors.lga} {...form.register('lga')} />
                <FieldError errors={[errors.lga]} />
              </Field>
            </div>

            <Field data-invalid={!!errors.message}>
              <FieldLabel htmlFor="message">Why are you joining? (optional)</FieldLabel>
              <Textarea id="message" rows={4} aria-invalid={!!errors.message} {...form.register('message')} />
              <FieldError errors={[errors.message]} />
            </Field>

            <Button type="submit" size="lg" disabled={createSupporter.isPending}>
              {createSupporter.isPending ? 'Submitting…' : 'Join the movement'}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
