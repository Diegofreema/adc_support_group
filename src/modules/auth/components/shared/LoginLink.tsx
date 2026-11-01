import { Link } from '@tanstack/react-router'

/** Small "Log in" link for the top of public pages. */
export function LoginLink() {
  return <Link to="/" className="small bold">Log in</Link>
}
