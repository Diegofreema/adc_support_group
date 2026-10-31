import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { parseAsString, parseAsStringLiteral, useQueryStates } from 'nuqs'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { supportersQueryOptions } from '@/features/supporters/queries'
import { NIGERIAN_STATES } from '@/features/supporters/schema'

export const Route = createFileRoute('/supporters')({
  component: SupportersPage,
})

// Filters live in the URL (?q=...&state=...) so views are shareable and survive refresh.
const filterParsers = {
  q: parseAsString.withDefault('').withOptions({ throttleMs: 300 }),
  state: parseAsStringLiteral(NIGERIAN_STATES),
}

const ALL = 'all'

function SupportersPage() {
  const [filters, setFilters] = useQueryStates(filterParsers)
  const { data, isPending, isError, isPlaceholderData } = useQuery({
    ...supportersQueryOptions(filters),
    placeholderData: keepPreviousData,
  })

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Supporters</h1>
        <p className="text-muted-foreground">Search by name or LGA, or filter by state.</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          placeholder="Search supporters…"
          value={filters.q}
          onChange={(e) => setFilters({ q: e.target.value || null })}
          className="sm:max-w-xs"
        />
        <Select
          value={filters.state ?? ALL}
          onValueChange={(v) => setFilters({ state: v === ALL ? null : (v as (typeof NIGERIAN_STATES)[number]) })}
        >
          <SelectTrigger className="sm:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All states</SelectItem>
            {NIGERIAN_STATES.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {(filters.q || filters.state) && (
          <Button variant="ghost" onClick={() => setFilters(null)}>
            Clear
          </Button>
        )}
      </div>

      {isPending ? (
        <p className="text-muted-foreground">Loading supporters…</p>
      ) : isError ? (
        <p className="text-destructive">Couldn't load supporters. Try again.</p>
      ) : data.length === 0 ? (
        <p className="text-muted-foreground">No supporters match these filters.</p>
      ) : (
        <ul className={`grid gap-3 sm:grid-cols-2 ${isPlaceholderData ? 'opacity-60' : ''}`}>
          {data.map((s) => (
            <li key={s.id}>
              <Card>
                <CardContent className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium">{s.fullName}</p>
                    <p className="text-sm text-muted-foreground">
                      {s.lga} · joined {new Date(s.joinedAt).toLocaleDateString('en-NG')}
                    </p>
                  </div>
                  <Badge variant="secondary">{s.state}</Badge>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
