import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button, Field, Modal, TextInput } from '@/components/shared'
import { staffFormSchema, type StaffFormValues } from '../utils/staff-form'

const FORM_ID = 'add-staff'

interface AddStaffModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (values: StaffFormValues) => void
}

export function AddStaffModal({ open, onOpenChange, onAdd }: AddStaffModalProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<StaffFormValues>({ resolver: zodResolver(staffFormSchema), defaultValues: { fullName: '', contact: '' } })
  const submit = (values: StaffFormValues) => { onAdd(values); reset() }
  return (
    <Modal open={open} onOpenChange={onOpenChange} title="Add staff" actions={<><Button onClick={() => onOpenChange(false)}>Cancel</Button><Button variant="primary" type="submit" form={FORM_ID}>Add</Button></>}>
      <form id={FORM_ID} noValidate onSubmit={handleSubmit(submit)}>
        <Field label="Full name" htmlFor="staff-name" error={errors.fullName?.message}><TextInput id="staff-name" {...register('fullName')} /></Field>
        <Field label="Phone or email" htmlFor="staff-contact" error={errors.contact?.message}><TextInput id="staff-contact" {...register('contact')} /></Field>
      </form>
    </Modal>
  )
}
