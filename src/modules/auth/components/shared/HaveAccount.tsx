import { Link } from '@tanstack/react-router'

/** "Have an account? Log in"; `redirect` brings them back here afterwards. */
export function HaveAccount({ redirect }: { redirect?: string }) {
  return (
    <p className="center small muted">
      Have an account? <Link to="/" search={{ redirect }} className="bold">Log in</Link>
    </p>
  )
}
