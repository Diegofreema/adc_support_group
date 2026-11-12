import { Link } from '@tanstack/react-router'

/** Small "Log in" link for the top of public pages; `redirect` returns here after. */
export function LoginLink({ redirect }: { redirect?: string }) {
  return <Link to="/" search={{ redirect }} className="small bold">Log in</Link>
}
