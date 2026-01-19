import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    // Aquí podrías enviar el error a un servicio de monitoring
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="tui-cell h-dvh flex flex-col items-center justify-center text-center">
          <h2 className="text-2xl mb-4">Oops! Algo salió mal</h2>
          <p className="text-muted-foreground mb-6">
            Ha ocurrido un error inesperado. Por favor, recarga la página.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="tui-button"
            type="button"
          >
            Recargar página
          </button>
        </div>
      )
    }

    return this.props.children
  }
}