import { useEffect, useState } from "react"
import { Container } from "@/components/tui-grid"
import { contactMailtoHref, site } from "@/data/site"
import { cn } from "@/lib/utils"

const footerGifModules = import.meta.glob("../assets/footer-gifs/*.gif", {
  eager: false,
  import: "default",
}) as Record<string, () => Promise<string>>

const footerGifEntries = Object.entries(footerGifModules)
const footerGifStorageKey = "footer-gif-index"

interface ContactFooterProps {
  className?: string
}

function isValidEmail(value: string) {
  const trimmed = value.trim()
  if (!trimmed) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
}

export function ContactFooter({ className }: ContactFooterProps) {
  const [emailInput, setEmailInput] = useState("")
  const [gifIndex, setGifIndex] = useState(0)
  const [status, setStatus] = useState<"idle" | "invalid" | "opening">("idle")
  const [isVisible, setIsVisible] = useState(false)
  const [gifUrls, setGifUrls] = useState<string[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some(entry => entry.isIntersecting)) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: "300px" }
    )
    const el = document.getElementById("footer-gif-container")
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible || loaded || footerGifEntries.length === 0) return
    let cancelled = false
    Promise.all(footerGifEntries.slice(0, 4).map(([, loader]) => loader()))
      .then((urls) => {
        if (cancelled) return
        setGifUrls(urls)
        setLoaded(true)
        const lastIndex = Number(window.localStorage.getItem(footerGifStorageKey) ?? -1)
        const nextIndex = Number.isFinite(lastIndex) && lastIndex >= 0 && urls.length > 0
          ? (lastIndex + 1) % urls.length
          : 0
        if (urls.length > 0) {
          window.localStorage.setItem(footerGifStorageKey, String(nextIndex))
          setGifIndex(nextIndex)
        }
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [isVisible, loaded])

  const handleSubmit = () => {
    if (!isValidEmail(emailInput)) {
      setStatus("invalid")
      return
    }

    const subject = "Contacto desde el portfolio"
    const body = `Hola Ramiro,\n\nTe dejo mi email: ${emailInput.trim()}\n\nMensaje:\n`

    setStatus("opening")
    window.location.href = contactMailtoHref(subject, body)
  }

  return (
    <div className={cn("flex flex-col h-full w-full", className)}>
      <Container corners={["tl", "tr", "bl", "br"]} className="w-full flex-1">
        <div className="h-full flex flex-col">
          <div className="flex-[3] flex items-center justify-center text-center py-10">
            <div>
              <h2 className="text-display">trabajemos juntos :)</h2>
              <p className="text-body text-muted-foreground mt-3 mb-8">
                deja aca tu email
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSubmit()
                }}
                className="flex gap-2 max-w-md mx-auto"
                noValidate
              >
                <label htmlFor="contact-email" className="sr-only">
                  Tu email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={emailInput}
                  onChange={e => {
                    setEmailInput(e.target.value)
                    if (status !== "idle") setStatus("idle")
                  }}
                  placeholder="tu@email.com"
                  autoComplete="email"
                  aria-invalid={status === "invalid"}
                  aria-describedby="contact-status"
                  required
                  className="flex-1 min-w-0 bg-transparent border border-border px-3 py-2 text-sm text-foreground outline-none focus:border-accent transition-colors duration-150"
                />
                <button
                  type="submit"
                  className="tui-button shrink-0"
                >
                  <span>→</span>
                  Enviar
                </button>
              </form>

              <div id="contact-status" role="status" aria-live="polite">
                {status === "invalid" && (
                  <p className="text-small text-accent mt-2">Ingresá un email válido.</p>
                )}
                {status === "opening" && (
                  <p className="text-small text-muted-foreground mt-2">
                    Abriendo tu cliente de correo. Si no pasa nada, escribime a{" "}
                    <a href={contactMailtoHref("Contacto desde el portfolio", "")} className="text-accent link-hover">
                      {site.email}
                    </a>
                    .
                  </p>
                )}
              </div>

              <a
                href={contactMailtoHref("Contacto desde el portfolio", "")}
                className="text-small text-muted-foreground link-hover mt-4 inline-block"
              >
                o escribime directo a {site.email}
              </a>
            </div>
          </div>

          <div id="footer-gif-container" className="flex-[7] border-t border-border overflow-hidden">
            {gifUrls.length > 0 && (
              <img
                src={gifUrls[gifIndex]}
                alt="Contacto"
                className="h-full w-full object-cover object-bottom"
                loading="lazy"
                decoding="async"
                width="1200"
                height="600"
              />
            )}
          </div>
        </div>
      </Container>

      {/* Footer bar */}
      <div className="tui-cell flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-small text-muted-foreground border-t border-border">
        <span>&copy; 2026 {site.shortName}</span>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <a href={contactMailtoHref("Contacto desde el portfolio", "")} className="link-hover">
            {site.email}
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="link-hover"
          >
            GitHub
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="link-hover"
          >
            LinkedIn
          </a>
          <a
            href={site.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="link-hover"
          >
            CV
          </a>
        </div>
      </div>
    </div>
  )
}
