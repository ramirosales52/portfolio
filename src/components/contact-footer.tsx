import { useCallback, useRef, useState } from "react"
import { Container } from "@/components/tui-grid"
import { cn } from "@/lib/utils"

interface ContactFooterProps {
  className?: string
}

/** Assemble email from parts to avoid plain-text scraping */
function useObfuscatedEmail() {
  const parts = useRef({ user: "hola", domain: "ramiro", tld: "dev" })
  const getEmail = useCallback(() => {
    const { user, domain, tld } = parts.current
    return `${user}@${domain}.${tld}`
  }, [])
  const getMailto = useCallback(() => `mailto:${getEmail()}`, [getEmail])
  return { getEmail, getMailto }
}

export function ContactFooter({ className }: ContactFooterProps) {
  const { getEmail, getMailto } = useObfuscatedEmail()
  const [emailRevealed, setEmailRevealed] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleRevealEmail = useCallback(() => {
    setEmailRevealed(true)
  }, [])

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(getEmail())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback: open mailto
      window.location.href = getMailto()
    }
  }, [getEmail, getMailto])

  return (
    <div className={cn("flex flex-col h-full w-full", className)}>
      <Container corners={["tl", "tr", "bl", "br"]} className="w-full flex-1">
        <div className="tui-cell h-full flex flex-col justify-center items-center text-center max-w-2xl mx-auto">
          {/* Label */}
          <span className="text-label mb-6">CONTACTO</span>

          {/* Main heading */}
          <h2 className="text-display text-balance">
            Trabajemos juntos
          </h2>

          {/* Subtext */}
          <p className="text-body text-muted-foreground text-pretty mt-4 max-w-md">
            Si tenés un proyecto en mente o querés charlar sobre una idea, escribime.
          </p>

          {/* Email - obfuscated, revealed on interaction */}
          <div className="mt-8">
            {!emailRevealed ? (
              <button
                type="button"
                onClick={handleRevealEmail}
                className="tui-button text-base cursor-pointer"
              >
                <span className="text-accent">→</span>
                Revelar email
              </button>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <a
                  href={getMailto()}
                  className="text-xl sm:text-2xl link-hover"
                >
                  {getEmail()}
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="text-small text-muted-foreground link-hover cursor-pointer"
                >
                  {copied ? "Copiado" : "Copiar email"}
                </button>
              </div>
            )}
          </div>

          {/* Social links */}
          <div className="flex gap-6 mt-8">
            <a
              href="https://github.com/ramiro"
              target="_blank"
              rel="noopener noreferrer"
              className="text-small text-muted-foreground link-hover"
            >
              <span className="text-accent">→</span> Github
            </a>
            <a
              href="https://linkedin.com/in/ramiro"
              target="_blank"
              rel="noopener noreferrer"
              className="text-small text-muted-foreground link-hover"
            >
              <span className="text-accent">→</span> LinkedIn
            </a>
          </div>
        </div>
      </Container>

      {/* Footer bar */}
      <div className="tui-cell flex items-center justify-between text-small text-muted-foreground border-t border-border">
        <span>&copy; 2025 Ramiro</span>
      </div>
    </div>
  )
}
