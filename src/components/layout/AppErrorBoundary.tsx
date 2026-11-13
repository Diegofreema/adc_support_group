import { Component, type ErrorInfo, type ReactNode } from 'react'

import { ErrorPage } from './ErrorPage'

interface State {
  error: unknown
}

/**
 * Last line of defence around the whole app (router included): a crash
 * anywhere still ends on the error page, never a blank screen.
 */
export class AppErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: unknown): State {
    return { error }
  }

  componentDidCatch(error: unknown, info: ErrorInfo) {
    console.error(error, info.componentStack)
  }

  render() {
    return this.state.error ? <ErrorPage error={this.state.error} /> : this.props.children
  }
}
