import { ArrowLeft } from 'lucide-react'

export function NotFound() {
  return (
    <div className="min-h-dvh bg-background text-foreground flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-display">404</h1>
        <p className="text-body text-muted-foreground mt-2">Página no encontrada / Page not found</p>
        <a href="/" className="text-foreground link-hover mt-4 inline-flex items-center gap-1.5">
          <ArrowLeft size={14} aria-hidden="true" /> Volver al inicio / Back to home
        </a>
      </div>
    </div>
  )
}
