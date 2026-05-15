import { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

interface Props {
  children: ReactNode
  /** Optional label shown in the recovery UI (e.g. "the placement test"). */
  area?: string
}

interface State {
  error: Error | null
}

/**
 * Catches render-time errors in the subtree and shows a recovery screen
 * instead of a blank page. Used to wrap the assessment routes so a single
 * component crash doesn't strand the learner mid-test.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Surface to the console; in production this would also POST to a
    // monitoring endpoint, but we don't have one wired up yet.
    console.error('[ErrorBoundary] caught render error:', error, info.componentStack)
  }

  private reset = () => this.setState({ error: null })

  render() {
    if (!this.state.error) return this.props.children

    const message = this.state.error.message || 'Unexpected error'
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white border border-gray-200 rounded-xl p-6 text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
            <AlertTriangle className="h-6 w-6 text-amber-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Something went wrong</h2>
          <p className="mt-2 text-sm text-gray-600">
            {this.props.area
              ? `An error occurred in ${this.props.area}. Your progress is saved on the server — you can retry without losing answers.`
              : 'An unexpected error occurred. Your progress is saved on the server — you can retry safely.'}
          </p>
          <p className="mt-3 text-xs text-gray-400 font-mono break-words">{message}</p>
          <div className="mt-5 flex gap-2 justify-center">
            <button
              onClick={this.reset}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700"
            >
              <RefreshCw className="h-4 w-4" />
              Try again
            </button>
            <button
              onClick={() => { window.location.href = '/' }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50"
            >
              <Home className="h-4 w-4" />
              Home
            </button>
          </div>
        </div>
      </div>
    )
  }
}
