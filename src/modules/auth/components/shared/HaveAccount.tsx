import { Link } from '@tanstack/react-router'

export function HaveAccount() {
  return (
    <p className="center small muted">
      Have an account? <Link to="/" className="bold">Log in</Link>
    </p>
  )
}
