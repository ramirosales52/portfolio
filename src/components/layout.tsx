import { useState } from "react"
import { Link } from "react-router-dom"
import { Container, TuiSection } from "@/components/tui-grid"
import { ContactFooter } from "@/components/contact-footer"
import { ScrambleText } from "@/components/scramble-text"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <div className="min-h-dvh relative">
      {/* Header */}
      <TuiSection>
        <Container className="tui-cell">
          <div className="flex items-center justify-between">
            <Link to="/" className="block">
              <ScrambleText 
                as="h1" 
                text="Ramiro" 
                className="text-heading text-balance"
                loop
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden sm:flex gap-8 text-muted-foreground">
              <ScrambleText
                as="a"
                href="/#trabajo"
                text="Trabajo"
                className="nav-link text-sm"
              />
              <ScrambleText
                as="a"
                href="/#sobre-mi"
                text="Sobre mí"
                className="nav-link text-sm"
              />
              <ScrambleText
                as="a"
                href="/#contacto"
                text="Contacto"
                className="nav-link text-sm"
              />
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
          <nav className="fixed top-0 right-0 bottom-0 w-full max-w-xs bg-background border-l border-border p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] z-50">
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
                className="block text-heading link-hover uppercase"
                onClick={() => setMobileNavOpen(false)}
              >
                Trabajo
              </a>
              <a
                href="/#sobre-mi"
                className="block text-heading link-hover uppercase"
                onClick={() => setMobileNavOpen(false)}
              >
                Sobre mí
              </a>
              <a
                href="/#contacto"
                className="block text-heading link-hover uppercase"
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

      {/* Contact Footer with Dither background */}
      <ContactFooter />
    </div>
  )
}
