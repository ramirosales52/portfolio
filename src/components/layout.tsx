import { useState, useEffect, useRef, useCallback } from "react"
import { Link, useLocation, useNavigate, useNavigationType } from "react-router-dom"
import { ScrambleText } from "@/components/scramble-text"
import { useNav } from "@/components/nav-context"
import { useTheme } from "@/components/theme-context"
import { useLanguage } from "@/components/lang-context"

/**
 * Scroll positions per history entry (keyed by location.key) so the browser
 * "back" button restores where the user was instead of jumping to the top.
 */
const scrollPositions = new Map<string, number>()

/**
 * SVG cross icon for grid intersections
 */
function Cross({ className }: { className?: string }) {
  return (
    <svg
      className={`tui-corner ${className || ''}`}
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="5.5" y1="0" x2="5.5" y2="11" stroke="currentColor" strokeWidth="1" />
      <line x1="0" y1="5.5" x2="11" y2="5.5" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [logoScrambleKey, setLogoScrambleKey] = useState(0)
  const { showLogoInNav, activeSection } = useNav()
  const { theme, toggleTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const headerRef = useRef<HTMLElement>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const navigationType = useNavigationType()
  const isHome = location.pathname === "/"

  useEffect(() => {
    if (!mobileNavOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileNavOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [mobileNavOpen])

  // Keep --navbar-height in sync with the real header height so spacers,
  // scroll offsets and 100dvh calcs never drift from the fixed header.
  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    const syncHeight = () => {
      document.documentElement.style.setProperty("--navbar-height", `${header.offsetHeight}px`)
    }
    syncHeight()

    const observer = new ResizeObserver(syncHeight)
    observer.observe(header)
    return () => observer.disconnect()
  }, [])

  // Save the scroll position of the entry we are leaving (Layout unmounts
  // on every route change, so cleanup runs before the new Layout mounts).
  useEffect(() => {
    return () => {
      scrollPositions.set(location.key, window.scrollY)
    }
  }, [location.key])

  // Scroll management on navigation: hash target if present, restored
  // position on browser back/forward, top of the page otherwise.
  useEffect(() => {
    if (location.hash) {
      const id = decodeURIComponent(location.hash.slice(1))
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
      })
      return
    }

    if (navigationType === "POP") {
      window.scrollTo({ top: scrollPositions.get(location.key) ?? 0, behavior: "instant" })
    } else {
      window.scrollTo({ top: 0, behavior: "instant" })
    }
  }, [location.key, location.hash, navigationType])

  // Scroll to a section if it exists on the current page, otherwise
  // navigate home with the hash so Layout scrolls to it there.
  const goToSection = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    } else {
      navigate({ pathname: "/", hash: `#${id}` })
    }
  }, [navigate])

  // Control del scramble del logo - cada vez que aparece
  useEffect(() => {
    if (showLogoInNav) {
      setLogoScrambleKey(prev => prev + 1)
    }
  }, [showLogoInNav])

  // The logo doubles as the "back to home" affordance on detail pages
  const logoVisible = !isHome || showLogoInNav

  return (
    <div className="min-h-dvh">
      {/* Fixed Navbar */}
      <header ref={headerRef} className="fixed top-0 left-0 right-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container-content relative">
          <Cross className="tui-corner-tl hidden sm:block" />
          <Cross className="tui-corner-tr hidden sm:block" />
          <Cross className="tui-corner-bl hidden sm:block" />
          <Cross className="tui-corner-br hidden sm:block" />
          <div className="flex items-center justify-between px-6 py-4">
            {/* Logo - aparece con scramble cuando scrolleas */}
            <div className="w-24">
              <Link
                to="/"
                className="block text-lg font-semibold transition-opacity duration-200"
                style={{
                  opacity: logoVisible ? 1 : 0,
                  pointerEvents: logoVisible ? 'auto' : 'none'
                }}
                onClick={(e) => {
                  if (isHome) {
                    e.preventDefault()
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }
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
            <nav className="hidden sm:flex items-center gap-6">
              <button
                className={`nav-link text-sm transition-colors duration-200 cursor-pointer touch-manipulation ${activeSection === "sobre-mi" ? "text-foreground" : "text-muted-foreground"
                  }`}
                onClick={() => goToSection("sobre-mi")}
                type="button"
              >
                <ScrambleText text={t("nav.about")} loop={false} />
              </button>
              <button
                className={`nav-link text-sm transition-colors duration-200 cursor-pointer touch-manipulation ${activeSection === "experiencia" ? "text-foreground" : "text-muted-foreground"
                  }`}
                onClick={() => goToSection("experiencia")}
                type="button"
              >
                <ScrambleText text={t("nav.experience")} loop={false} />
              </button>
              <button
                className={`nav-link text-sm transition-colors duration-200 cursor-pointer touch-manipulation ${activeSection === "proyectos" ? "text-foreground" : "text-muted-foreground"
                  }`}
                onClick={() => goToSection("proyectos")}
                type="button"
              >
                <ScrambleText text={t("nav.projects")} loop={false} />
              </button>
              <button
                className={`nav-link text-sm transition-colors duration-200 cursor-pointer touch-manipulation ${activeSection === "contacto" ? "text-foreground" : "text-muted-foreground"
                  }`}
                onClick={() => goToSection("contacto")}
                type="button"
              >
                <ScrambleText text={t("nav.contact")} loop={false} />
              </button>
              <button
                onClick={toggleTheme}
                type="button"
                className="nav-link text-muted-foreground cursor-pointer touch-manipulation"
                aria-label={theme === "dark" ? t("nav.changeLight") : t("nav.changeDark")}
              >
                {theme === "dark" ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <circle cx="8" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.2" />
                    <line x1="8" y1="0.5" x2="8" y2="2.5" stroke="currentColor" strokeWidth="1.2" />
                    <line x1="8" y1="13.5" x2="8" y2="15.5" stroke="currentColor" strokeWidth="1.2" />
                    <line x1="0.5" y1="8" x2="2.5" y2="8" stroke="currentColor" strokeWidth="1.2" />
                    <line x1="13.5" y1="8" x2="15.5" y2="8" stroke="currentColor" strokeWidth="1.2" />
                    <line x1="2.7" y1="2.7" x2="4.1" y2="4.1" stroke="currentColor" strokeWidth="1.2" />
                    <line x1="11.9" y1="11.9" x2="13.3" y2="13.3" stroke="currentColor" strokeWidth="1.2" />
                    <line x1="2.7" y1="13.3" x2="4.1" y2="11.9" stroke="currentColor" strokeWidth="1.2" />
                    <line x1="11.9" y1="4.1" x2="13.3" y2="2.7" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M14 9.5A6.5 6.5 0 0 1 6.5 2 6.5 6.5 0 1 0 14 9.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
              <button
                onClick={() => setLanguage(language === "es" ? "en" : "es")}
                type="button"
                className="nav-link text-muted-foreground cursor-pointer touch-manipulation text-xs font-medium"
                aria-label={language === "es" ? "Switch to English" : "Cambiar a español"}
                title={language === "es" ? "English" : "Español"}
              >
                {language === "es" ? "EN" : "ES"}
              </button>
            </nav>

            {/* Mobile menu button */}
            <button
              className="tui-button inline-flex sm:!hidden"
              onClick={() => setMobileNavOpen(true)}
              aria-label={t("nav.openMenu")}
              aria-expanded={mobileNavOpen}
              aria-controls="mobile-nav-menu"
              type="button"
            >
              <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor" aria-hidden="true">
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
          <nav
            id="mobile-nav-menu"
            className="fixed top-0 right-0 bottom-0 w-full max-w-xs bg-background border-l border-border p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] z-50"
            aria-modal="true"
            role="dialog"
          >
            <div className="flex justify-between items-center mb-8">
              <span className="text-label">{t("nav.menu")}</span>
              <button
                className="tui-button"
                onClick={() => setMobileNavOpen(false)}
                aria-label={t("nav.closeMenu")}
                type="button"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <button
                className={`block text-heading uppercase text-left cursor-pointer touch-manipulation ${activeSection === "sobre-mi" ? "text-foreground" : "text-muted-foreground"
                  }`}
                onClick={() => {
                  setMobileNavOpen(false)
                  setTimeout(() => goToSection("sobre-mi"), 300)
                }}
                type="button"
              >
                {t("nav.about")}
              </button>
              <button
                className={`block text-heading uppercase text-left cursor-pointer touch-manipulation ${activeSection === "experiencia" ? "text-foreground" : "text-muted-foreground"
                  }`}
                onClick={() => {
                  setMobileNavOpen(false)
                  setTimeout(() => goToSection("experiencia"), 300)
                }}
                type="button"
              >
                {t("nav.experience")}
              </button>
              <button
                className={`block text-heading uppercase text-left cursor-pointer touch-manipulation ${activeSection === "proyectos" ? "text-foreground" : "text-muted-foreground"
                  }`}
                onClick={() => {
                  setMobileNavOpen(false)
                  setTimeout(() => goToSection("proyectos"), 300)
                }}
                type="button"
              >
                {t("nav.projects")}
              </button>
              <button
                className={`block text-heading uppercase text-left cursor-pointer touch-manipulation ${activeSection === "contacto" ? "text-foreground" : "text-muted-foreground"
                  }`}
                onClick={() => {
                  setMobileNavOpen(false)
                  setTimeout(() => goToSection("contacto"), 300)
                }}
                type="button"
              >
                {t("nav.contact")}
              </button>
              <div className="pt-4 border-t border-border space-y-3">
                <button
                  onClick={toggleTheme}
                  type="button"
                  className="flex items-center gap-3 text-muted-foreground cursor-pointer touch-manipulation w-full"
                  aria-label={theme === "dark" ? t("nav.changeLight") : t("nav.changeDark")}
                >
                  {theme === "dark" ? (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <circle cx="8" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.2" />
                      <line x1="8" y1="0.5" x2="8" y2="2.5" stroke="currentColor" strokeWidth="1.2" />
                      <line x1="8" y1="13.5" x2="8" y2="15.5" stroke="currentColor" strokeWidth="1.2" />
                      <line x1="0.5" y1="8" x2="2.5" y2="8" stroke="currentColor" strokeWidth="1.2" />
                      <line x1="13.5" y1="8" x2="15.5" y2="8" stroke="currentColor" strokeWidth="1.2" />
                      <line x1="2.7" y1="2.7" x2="4.1" y2="4.1" stroke="currentColor" strokeWidth="1.2" />
                      <line x1="11.9" y1="11.9" x2="13.3" y2="13.3" stroke="currentColor" strokeWidth="1.2" />
                      <line x1="2.7" y1="13.3" x2="4.1" y2="11.9" stroke="currentColor" strokeWidth="1.2" />
                      <line x1="11.9" y1="4.1" x2="13.3" y2="2.7" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M14 9.5A6.5 6.5 0 0 1 6.5 2 6.5 6.5 0 1 0 14 9.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                    </svg>
                  )}
                  <span className="text-sm">{theme === "dark" ? t("nav.lightTheme") : t("nav.darkTheme")}</span>
                </button>
                <button
                  onClick={() => {
                    setLanguage(language === "es" ? "en" : "es")
                    setMobileNavOpen(false)
                  }}
                  type="button"
                  className="flex items-center gap-3 text-muted-foreground cursor-pointer touch-manipulation w-full"
                  aria-label={language === "es" ? "Switch to English" : "Cambiar a español"}
                >
                  <span className="text-sm font-medium w-4">{language === "es" ? "EN" : "ES"}</span>
                  <span className="text-sm">{language === "es" ? "English" : "Español"}</span>
                </button>
              </div>
            </div>
          </nav>
        </>
      )}

      {/* Main content */}
      <main id="main-content">
        {children}
      </main>
    </div>
  )
}
