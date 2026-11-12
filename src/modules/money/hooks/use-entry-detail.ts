import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { notify } from '@/lib/toast'
import { proofUrlQuery, voidEntry } from '../services/money.service'
import type { MoneyEntry } from '../types'
import { moneyKeys } from '../utils/money-keys'

/** The open entry: its proof link, and the void step (reason, then save). */
export function useEntryDetail() {
  const queryClient = useQueryClient()
  const [entry, setEntry] = useState<MoneyEntry | null>(null)
  const [voiding, setVoiding] = useState(false)
  const [reason, setReason] = useState('')
  const proof = useQuery({ ...proofUrlQuery(entry?.proofPath ?? ''), enabled: Boolean(entry?.proofPath) })
  const close = () => { setEntry(null); setVoiding(false); setReason('') }
  const mutation = useMutation({
    mutationFn: () => voidEntry(entry!.id, reason.trim()),
    onSuccess: () => { notify('Entry voided'); close(); void queryClient.invalidateQueries({ queryKey: moneyKeys.all }) },
  })

  return {
    entry, open: setEntry, close,
    proofUrl: proof.data, proofLoading: proof.isLoading,
    voiding, startVoid: () => setVoiding(true), stopVoid: () => setVoiding(false),
    reason, setReason,
    confirmVoid: () => mutation.mutate(),
    busy: mutation.isPending,
  }
}

export type EntryDetail = ReturnType<typeof useEntryDetail>
