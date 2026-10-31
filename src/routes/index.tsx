import { createFileRoute, Link } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const Route = createFileRoute('/')({
  component: HomePage,
})

const pillars = [
  { title: 'Organise', body: 'Connect supporters in every ward, LGA and state.' },
  { title: 'Mobilise', body: 'Coordinate volunteers, events and outreach.' },
  { title: 'Inform', body: 'Share verified updates with the grassroots.' },
]

function HomePage() {
  return (
    <div className="flex flex-col gap-12">
      <section className="flex flex-col items-start gap-5">
        <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
          African Democratic Congress
        </span>
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-balance sm:text-5xl">
          Building a stronger <span className="text-primary">ADC</span>, one supporter at a time.
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          Register as a supporter, find others near you, and help grow the movement.
        </p>
        <div className="flex gap-3">
          <Button asChild size="lg">
            <Link to="/join">Become a supporter</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/supporters">See supporters</Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {pillars.map((p) => (
          <Card key={p.title}>
            <CardHeader>
              <CardTitle>{p.title}</CardTitle>
              <CardDescription>{p.body}</CardDescription>
            </CardHeader>
            <CardContent />
          </Card>
        ))}
      </section>
    </div>
  )
}
