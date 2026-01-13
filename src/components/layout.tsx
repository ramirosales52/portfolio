import { useState } from "react"
import { Link } from "react-router-dom"
import { Container, TuiSection } from "@/components/tui-grid"
import { ContactFooter } from "@/components/contact-footer"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <div className="min-h-screen">
      {/* Header */}
      <TuiSection>
        <Container className="tui-cell">
          <div className="flex items-center justify-between">
            <Link to="/" className="block">
              <span className="text-label">portafolio</span>
              <h1 className="text-heading mt-1">Ramiro</h1>
            </Link>
            
            {/* Desktop nav */}
            <nav className="hidden sm:flex gap-6 text-small text-muted-foreground">
              <a href="/#trabajo" className="nav-link">trabajo</a>
              <a href="/#sobre-mi" className="nav-link">sobre mí</a>
              <a href="/#contacto" className="nav-link">contacto</a>
            </nav>

            {/* Mobile menu button - only visible on small screens */}
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
        </Container>
      </TuiSection>

      {/* Divider after header */}
      <TuiSection>
        <Container corners={[]}>
          <div className="tui-divider" />
        </Container>
      </TuiSection>

      {/* Mobile nav overlay */}
      {mobileNavOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/70 z-40"
            onClick={() => setMobileNavOpen(false)}
          />
          <nav className="fixed top-0 right-0 bottom-0 w-full max-w-[280px] bg-background border-l border-border p-6 z-50">
            <div className="flex justify-between items-center mb-8">
              <span className="text-label">menú</span>
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
                href="/#trabajo" 
                className="block text-heading link-hover"
                onClick={() => setMobileNavOpen(false)}
              >
                trabajo
              </a>
              <a 
                href="/#sobre-mi" 
                className="block text-heading link-hover"
                onClick={() => setMobileNavOpen(false)}
              >
                sobre mí
              </a>
              <a 
                href="/#contacto" 
                className="block text-heading link-hover"
                onClick={() => setMobileNavOpen(false)}
              >
                contacto
              </a>
            </div>
          </nav>
        </>
      )}

      {/* Main content */}
      <main>
        {children}
      </main>

      {/* Contact Footer with Dither background */}
      <ContactFooter />
    </div>
  )
}
