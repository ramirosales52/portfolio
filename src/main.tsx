import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { NavProvider } from './components/nav-context'
import { ErrorBoundary } from './components/error-boundary'
import { trackPageView, initGA } from './lib/analytics'
import './index.css'
import HomePage from './pages/home'
import ProjectPage from './pages/project'

// Analytics tracker component
function AnalyticsTracker() {
  const location = useLocation()

  useEffect(() => {
    // Initialize GA after hydration
    initGA('G-XXXXXXXXXX')
  }, [])

  useEffect(() => {
    trackPageView(location.pathname + location.search)
  }, [location])

  return null
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <AnalyticsTracker />
        <NavProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/proyectos/:id" element={<ProjectPage />} />
          </Routes>
        </NavProvider>
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
