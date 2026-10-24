import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { NavProvider } from './components/nav-context'
import { ThemeProvider } from './components/theme-context'
import { ErrorBoundary } from './components/error-boundary'
import './index.css'

const HomePage = lazy(() => import('./pages/home'))
const ProjectPage = lazy(() => import('./pages/project'))

function NotFound() {
  return (
    <div className="min-h-dvh bg-background text-foreground flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-display">404</h1>
        <p className="text-body text-muted-foreground mt-2">Página no encontrada</p>
        <a href="/" className="text-accent link-hover mt-4 inline-block">← Volver al inicio</a>
      </div>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider>
          <NavProvider>
            <Suspense fallback={<div className="min-h-dvh bg-background" />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/proyectos/:id" element={<ProjectPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </NavProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
)

// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration)
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError)
      })
  })
}
