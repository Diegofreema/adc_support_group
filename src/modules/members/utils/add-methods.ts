import { FileSpreadsheet, Link2, QrCode, UserPlus } from 'lucide-react'

import type { TileOption } from '@/components/shared'

export type AddMethod = 'link' | 'qr' | 'one' | 'excel'

export const ADD_METHODS: TileOption<AddMethod>[] = [
  { value: 'link', label: 'Send a link', icon: Link2 },
  { value: 'qr', label: 'Show a QR code', icon: QrCode },
  { value: 'one', label: 'Type in one person', icon: UserPlus },
  { value: 'excel', label: 'Upload a list', icon: FileSpreadsheet },
]
