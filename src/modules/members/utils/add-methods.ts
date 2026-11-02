import { FileSpreadsheet, Link2, QrCode, UserPlus } from 'lucide-react'

import type { TileOption } from '@/components/shared'

export type AddMethod = 'link' | 'qr' | 'one' | 'excel'

export const ADD_METHODS: TileOption<AddMethod>[] = [
  { value: 'link', label: 'Link', icon: Link2 },
  { value: 'qr', label: 'QR code', icon: QrCode },
  { value: 'one', label: 'One person', icon: UserPlus },
  { value: 'excel', label: 'Excel / CSV', icon: FileSpreadsheet },
]
