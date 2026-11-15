import { useEffect } from 'react'
import { useForm, type FieldValues, type UseFormProps, type UseFormReturn } from 'react-hook-form'

/**
 * useForm with forgiving validation: "reward early, punish late".
 * - Nothing is flagged while someone is still typing.
 * - Fields are checked on submit (or a wizard step's Next), and after that
 *   again when the person leaves a field.
 * - An error disappears the moment they start fixing it.
 * Use this instead of useForm for every form in the app.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useAppForm<T extends FieldValues, C = any, R = T>(props?: UseFormProps<T, C, R>): UseFormReturn<T, C, R> {
  const form = useForm<T, C, R>({ mode: 'onSubmit', reValidateMode: 'onBlur', ...props })
  const { subscribe, getFieldState, clearErrors } = form

  useEffect(
    () => subscribe({
      formState: { values: true },
      callback: ({ name, type }) => {
        if (type === 'change' && name && getFieldState(name as never).error) clearErrors(name as never)
      },
    }),
    [subscribe, getFieldState, clearErrors],
  )

  return form
}
