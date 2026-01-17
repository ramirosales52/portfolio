import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ScrambleText } from "@/components/scramble-text"
import { useNav } from "@/components/nav-context"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [logoScrambleKey, setLogoScrambleKey] = useState(0)
  const { showLogoInNav, activeSection } = useNav()

  // Control del scramble del logo - cada vez que aparece
  useEffect(() => {
    if (showLogoInNav) {
      setLogoScrambleKey(prev => prev + 1)
    }
  }, [showLogoInNav])

  return (
    <div className="min-h-dvh">
      {/* Fixed Navbar */}
      <header className="fixed top-0 left-0 right-0 z-30 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container-content">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Logo - aparece con scramble cuando scrolleas */}
            <div className="w-24">
              <Link
                to="/"
                className="block text-lg font-semibold transition-opacity duration-200"
                style={{
                  opacity: showLogoInNav ? 1 : 0,
                  pointerEvents: showLogoInNav ? 'auto' : 'none'
                }}
                onClick={(e) => {
                  e.preventDefault()
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                <ScrambleText
                  text="RAMIRO"
                  autoScramble={logoScrambleKey}
                  loop={false}
                />
              </Link>
            </div>

            {/* Desktop nav */}
            <nav className="hidden sm:flex gap-8">
              <ScrambleText
                as="a"
                href="#proyectos"
                text="Proyectos"
                className={`nav-link text-sm transition-colors duration-200 ${activeSection === "proyectos" ? "text-foreground" : "text-muted-foreground"
                  }`}
              />
              <ScrambleText
                as="a"
                href="#contacto"
                text="Contacto"
                className={`nav-link text-sm transition-colors duration-200 ${activeSection === "contacto" ? "text-foreground" : "text-muted-foreground"
                  }`}
              />
            </nav>

            {/* Mobile menu button */}
            <button
              className="tui-button inline-flex sm:!hidden"
              onClick={() => setMobileNavOpen(true)}
              aria-label="Abrir menú"
            >
              <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
                <rect width="16" height="1.5" />
                <rect y="5" width="16" height="1.5" />
                <rect y="10" width="16" height="1.5" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile nav overlay */}
      {mobileNavOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/70 z-40"
            onClick={() => setMobileNavOpen(false)}
          />
          <nav className="fixed top-0 right-0 bottom-0 w-full max-w-xs bg-background border-l border-border p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] z-50">
            <div className="flex justify-between items-center mb-8">
              <span className="text-label">MENÚ</span>
              <button
                className="tui-button"
                onClick={() => setMobileNavOpen(false)}
                aria-label="Cerrar menú"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <a
                href="#proyectos"
                className={`block text-heading uppercase ${activeSection === "proyectos" ? "text-foreground" : "text-muted-foreground"
                  }`}
                onClick={() => setMobileNavOpen(false)}
              >
                Proyectos
              </a>
              <a
                href="#contacto"
                className={`block text-heading uppercase ${activeSection === "contacto" ? "text-foreground" : "text-muted-foreground"
                  }`}
                onClick={() => setMobileNavOpen(false)}
              >
                Contacto
              </a>
            </div>
          </nav>
        </>
      )}

      {/* Main content */}
      <main>
        {children}
      </main>
    </div>
  )
}
